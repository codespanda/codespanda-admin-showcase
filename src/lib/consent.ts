/**
 * Analytics consent. Google Analytics only loads after the visitor accepts it in the
 * cookie banner (DPDP Act: personal data is processed on consent, which can be withdrawn).
 * The choice is kept in this browser; "Cookie settings" in the footer reopens the banner.
 */
const KEY = "cp-analytics-consent";
const GA_ID = "G-8S1SQRNF5Y";
/** Fired on window when the banner should open again. */
export const OPEN_CONSENT_EVENT = "cp:open-consent";

export type Consent = "granted" | "denied";

export function readConsent(): Consent | undefined {
  try {
    const v = localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : undefined;
  } catch {
    return undefined;
  }
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let loaded = false;

/** Loads gtag.js once. Only called after consent. */
function loadAnalytics() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // gtag.js reads the arguments object itself, so push it as-is.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_ID, { anonymize_ip: true });
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);
}

/** Removes Google Analytics cookies when consent is withdrawn. */
function clearAnalyticsCookies() {
  const host = location.hostname.replace(/^www\./, "");
  for (const name of document.cookie.split(";").map((c) => c.split("=")[0].trim())) {
    if (!/^_ga/.test(name)) continue;
    for (const domain of ["", `; domain=${host}`, `; domain=.${host}`]) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain}`;
    }
  }
}

export function saveConsent(value: Consent) {
  try {
    localStorage.setItem(KEY, value);
  } catch {
    /* storage blocked: the choice lasts for this page view only */
  }
  if (value === "granted") loadAnalytics();
  else {
    clearAnalyticsCookies();
    // gtag.js can't be unloaded; a reload makes sure it stops collecting.
    if (loaded) location.reload();
  }
}

/** Starts analytics on page load when the visitor has already agreed. */
export function startAnalyticsIfAllowed() {
  if (readConsent() === "granted") loadAnalytics();
}

export function openConsentSettings() {
  window.dispatchEvent(new Event(OPEN_CONSENT_EVENT));
}
