import { useEffect, useState } from "react";

// Free, no-signup hit-counter API (https://jasoncameron.dev/abacus/).
// CORS-enabled, rate-limited to ~30 req/10s — fine for one call per page
// visit, NOT for fetching every shot on the /portfolio grid at once.
const API = "https://abacus.jasoncameron.dev";
const NAMESPACE = "codespanda-portfolio";

function storageKey(shotId: string) {
  return `pv:${shotId}`;
}

/**
 * Live, cross-visitor view count for a single portfolio shot page.
 *
 * - The first time a given browser opens this shot, calls the "hit"
 *   endpoint (increments the shared counter for everyone) and remembers
 *   it in localStorage so repeat visits from the same browser don't
 *   keep inflating the count.
 * - Repeat visits just read the current count without incrementing.
 * - Always returns at least `staticViews` (our curated baseline) — if
 *   the request fails, times out, or hasn't resolved yet, the baseline
 *   is shown instead, and the count never appears to jump backward once
 *   the live value does load.
 */
export function useViewCount(shotId: string, staticViews: number): number {
  const [liveCount, setLiveCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    const key = storageKey(shotId);
    const alreadyCounted = localStorage.getItem(key) === "1";
    const endpoint = alreadyCounted
      ? `${API}/get/${NAMESPACE}/${shotId}`
      : `${API}/hit/${NAMESPACE}/${shotId}`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);

    fetch(endpoint, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (cancelled || !data || typeof data.value !== "number") return;
        if (!alreadyCounted) localStorage.setItem(key, "1");
        setLiveCount(data.value);
      })
      .catch(() => {
        // Offline / API down / rate-limited — silently keep the static fallback.
      })
      .finally(() => clearTimeout(timeout));

    return () => {
      cancelled = true;
      controller.abort();
      clearTimeout(timeout);
    };
  }, [shotId]);

  return liveCount === null ? staticViews : Math.max(staticViews, liveCount);
}
