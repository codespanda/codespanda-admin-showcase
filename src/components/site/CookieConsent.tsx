import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { OPEN_CONSENT_EVENT, readConsent, saveConsent, startAnalyticsIfAllowed, type Consent } from "@/lib/consent";

/** Asks before any analytics runs; reopened from "Cookie settings" in the footer. */
export function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // The build-time pre-renderer drives a headless browser: keep the banner out of the saved HTML.
    if (navigator.webdriver) return;
    startAnalyticsIfAllowed();
    if (!readConsent()) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, []);

  if (!open) return null;

  const choose = (value: Consent) => {
    saveConsent(value);
    setOpen(false);
  };

  return (
    <section
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-consent-title"
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto flex max-w-[920px] flex-col gap-4 rounded-2xl border border-border bg-card p-5 text-foreground shadow-[0_20px_50px_rgba(14,23,38,0.18)] sm:inset-x-6 sm:bottom-6 md:flex-row md:items-center md:gap-6"
    >
      <div className="flex flex-col gap-1.5">
        <h2 id="cookie-consent-title" className="text-[16px] font-bold">
          Can we use analytics cookies?
        </h2>
        <p className="text-[14px] leading-[1.55] text-muted-foreground">
          With your consent we use Google Analytics to see which pages are useful. It sets cookies and sends your IP address and
          device details to Google. Saying no doesn't affect the site. You can change your choice any time from “Cookie settings” in
          the footer.{" "}
          <Link to="/legal/cookies" className="font-semibold text-link underline underline-offset-2 hover:text-blue-ink">
            Cookie policy
          </Link>
        </p>
      </div>
      <div className="flex shrink-0 gap-2.5">
        <button
          type="button"
          onClick={() => choose("denied")}
          className="h-11 flex-1 rounded-xl border-[1.5px] border-input px-5 text-[15px] font-semibold hover:bg-secondary md:flex-none"
        >
          No thanks
        </button>
        <button
          type="button"
          onClick={() => choose("granted")}
          className="h-11 flex-1 rounded-xl bg-brand px-5 text-[15px] font-bold text-white hover:opacity-90 md:flex-none"
        >
          Accept
        </button>
      </div>
    </section>
  );
}
