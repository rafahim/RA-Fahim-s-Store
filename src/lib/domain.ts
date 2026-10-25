export type DomainStatus = "free" | "taken" | "unknown";

const VALID = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*\.[a-z]{2,63}$/;

/** Cleans what the visitor typed (links, www, paths) and adds .com when there is no extension. Returns "" when it is not a valid name. */
export function normalizeDomain(input: string): { d: string; valid: boolean } {
  let d = input.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/[/?#].*$/, "");
  if (!d) return { d: "", valid: false };
  if (!d.includes(".")) d += ".com";
  return { d, valid: d.length <= 253 && VALID.test(d) };
}

const TIMEOUT = 8000;
const getJson = async (url: string, accept: string) => {
  const res = await fetch(url, { headers: { accept }, signal: AbortSignal.timeout(TIMEOUT) });
  return { status: res.status, ok: res.ok, json: await res.json().catch(() => null) as any };
};

// Which extensions have a public RDAP registry (IANA's list). Without one, the registry cannot confirm that a name is free.
let rdapTlds: Promise<Set<string> | null> | undefined;
function rdapSupported(tld: string): Promise<boolean | null> {
  rdapTlds ??= getJson("https://data.iana.org/rdap/dns.json", "application/json")
    .then((r) => (r.ok && Array.isArray(r.json?.services) ? new Set<string>(r.json.services.flatMap((x: [string[], string[]]) => x[0].map((t) => t.toLowerCase()))) : null))
    .catch(() => null);
  return rdapTlds.then((set) => (set ? set.has(tld) : null));
}

type Registry = "registered" | "unregistered" | "unsupported" | "error";
/** Step 1: ask the registry (RDAP). 200 = registered, 404 from a real registry = not registered. */
async function registryCheck(d: string): Promise<Registry> {
  const tld = d.slice(d.lastIndexOf(".") + 1);
  if ((await rdapSupported(tld)) === false) return "unsupported";
  for (let i = 0; i < 2; i++) {
    try {
      const res = await fetch(`https://rdap.org/domain/${encodeURIComponent(d)}`, { headers: { accept: "application/rdap+json, application/json" }, signal: AbortSignal.timeout(TIMEOUT) });
      if (res.ok) return "registered";
      if (res.status === 404) return "unregistered";
    } catch { /* try once more */ }
  }
  return "error";
}

type Dns = "delegated" | "nxdomain" | "error";
/** Step 2: ask public DNS (two independent resolvers). A name that has name servers is in use; NXDOMAIN means nothing is published for it. */
async function dnsCheck(d: string): Promise<Dns> {
  const urls = [`https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(d)}&type=NS`, `https://dns.google/resolve?name=${encodeURIComponent(d)}&type=NS`];
  const answers = await Promise.all(urls.map((u) => getJson(u, "application/dns-json").then((r): Dns => {
    if (!r.ok || typeof r.json?.Status !== "number") return "error";
    if (r.json.Status === 3) return "nxdomain";
    return r.json.Status === 0 ? "delegated" : "error";
  }).catch((): Dns => "error")));
  if (answers.includes("delegated")) return "delegated";
  return answers.every((a) => a === "nxdomain") ? "nxdomain" : "error";
}

/**
 * Strict live check. A name is only called "free" when BOTH agree: the registry says it is not registered
 * AND public DNS has nothing for it. If either says it is in use it is "taken". Anything else (a registry
 * that is down, an extension without a public registry such as .bd, resolvers that disagree) is "unknown",
 * so the visitor is never told a name is free on a guess.
 */
export async function checkDomain(d: string): Promise<DomainStatus> {
  const [registry, dns] = await Promise.all([registryCheck(d), dnsCheck(d)]);
  if (registry === "registered" || dns === "delegated") return "taken";
  if (registry === "unregistered" && dns === "nxdomain") return "free";
  return "unknown";
}

export const altExtensions = [".net", ".org", ".co", ".xyz", ".online", ".store"];

export const popularExtensions = [".com", ".net", ".org", ".co", ".xyz", ".online"];

/** Names worth checking next to the one the visitor searched: other extensions first, then a few common variations. */
export function suggestionNames(d: string): string[] {
  const dot = d.indexOf(".");
  const base = dot > 0 ? d.slice(0, dot) : d;
  const tld = dot > 0 ? d.slice(dot) : "";
  const tlds = [".com", ".net", ".org", ".co", ".xyz", ".online", ".store"].filter((x) => x !== tld).slice(0, 5).map((x) => base + x);
  const variants = [
    !base.startsWith("get") && `get${base}.com`,
    !base.endsWith("bd") && `${base}bd.com`,
    !base.startsWith("my") && `my${base}.com`,
    !base.endsWith("online") && `${base}online.com`,
  ].filter((x): x is string => !!x && x.length <= 70).slice(0, 3);
  return [...new Set([...tlds, ...variants])].filter((x) => x !== d);
}
