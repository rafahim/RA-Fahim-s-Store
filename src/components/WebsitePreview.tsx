"use client";
import { useCallback, useMemo, useState } from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

function hostOf(input: string) {
  try { return new URL(input).hostname; } catch { return ""; }
}

/** Live screenshot of the site's homepage, loaded straight from the screenshot service (same service the portfolio uses). */
function liveScreenshotUrl(target: string) {
  const api = new URL("https://api.microlink.io/");
  api.searchParams.set("url", target);
  api.searchParams.set("screenshot", "true");
  api.searchParams.set("meta", "false");
  api.searchParams.set("embed", "screenshot.url");
  api.searchParams.set("screenshot.type", "jpeg");
  api.searchParams.set("viewport.width", "1100");
  api.searchParams.set("viewport.height", "525");
  api.searchParams.set("viewport.deviceScaleFactor", "2");
  api.searchParams.set("waitForTimeout", "3000");
  return api.toString();
}

/** Backup screenshot service, tried when the first one is rate limited or fails. */
function backupScreenshotUrl(target: string) {
  return `https://image.thum.io/get/width/1100/crop/525/noanimate/${target}`;
}

/**
 * Project thumbnail, same behaviour as the portfolio's project cards: a saved homepage image
 * (when there is one) shows instantly and the live screenshot fades in over it once it has
 * loaded. If the live screenshot fails, the saved image simply stays; with neither, a neutral
 * card with the site's icon and address is shown.
 */
export default function WebsitePreview({ url, name, fallbackImage }: { url: string; name: string; fallbackImage?: string }) {
  const [attempt, setAttempt] = useState(0); // 0 = main service, 1 = backup service
  const liveFailed = attempt >= 2;
  const failLive = useCallback(() => { setLiveLoaded(false); setAttempt((a) => a + 1); }, []);
  const [liveLoaded, setLiveLoaded] = useState(false);
  // The server-rendered <img> can finish loading before React attaches onLoad/onError (hydration).
  const liveRef = useCallback((img: HTMLImageElement | null) => {
    if (img && img.complete) { if (img.naturalWidth > 0) setLiveLoaded(true); else failLive(); }
  }, [failLive]);
  const host = hostOf(url);
  const favicon = useMemo(() => host ? `https://www.google.com/s2/favicons?domain=${encodeURIComponent(host)}&sz=128` : null, [host]);
  const saved = fallbackImage ? `${basePath}${fallbackImage}` : null;

  return <div className="project-thumb">
    {saved
      ? <img src={saved} alt={`${name} website screenshot`} width={1600} height={764} loading="lazy" decoding="async" />
      : <div className="project-thumb-empty">
          <span>{favicon && <img src={favicon} alt="" width={28} height={28} referrerPolicy="no-referrer" />}</span>
          <b>{name}</b><small>{host}</small>
        </div>}
    {!liveFailed && <img key={attempt} ref={liveRef} className={`project-thumb-live${liveLoaded ? " is-loaded" : ""}`} src={attempt === 0 ? liveScreenshotUrl(url) : backupScreenshotUrl(url)} alt={`${name} live website screenshot`} width={2200} height={1050} loading="lazy" decoding="async" referrerPolicy="no-referrer" onLoad={(e) => (e.currentTarget.naturalWidth > 50 ? setLiveLoaded(true) : failLive())} onError={failLive} />}
    <div className="project-thumb-bar">
      <span>{favicon && <img src={favicon} alt="" width={16} height={16} referrerPolicy="no-referrer" />}{liveLoaded ? "Homepage preview" : saved ? "Saved homepage preview" : "Homepage"}</span>
      <a href={url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${name} (opens in a new tab)`}>↗</a>
    </div>
  </div>;
}
