export type DomainStatus = "free" | "taken" | "unknown";

const VALID = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*\.[a-z]{2,63}$/;

/** Cleans what the visitor typed (links, www, paths) and adds .com when there is no extension. Returns "" when it is not a valid name. */
export function normalizeDomain(input: string): { d: string; valid: boolean } {
  let d = input.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/[/?#].*$/, "");
  if (!d) return { d: "", valid: false };
  if (!d.includes(".")) d += ".com";
  return { d, valid: d.length <= 253 && VALID.test(d) };
}

/** Asks the public RDAP registry whether the name is registered. 404 means it is not. */
export async function checkDomain(d: string): Promise<DomainStatus> {
  try {
    const res = await fetch(`https://rdap.org/domain/${encodeURIComponent(d)}`, { signal: AbortSignal.timeout(8000) });
    return res.status === 404 ? "free" : res.ok ? "taken" : "unknown";
  } catch {
    return "unknown";
  }
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
