import { useEffect, useRef } from "react";

const HOSTED_BUTTON_ID = "VHZUWQ6H7QZTQ";
const SDK_URL =
  "https://www.paypal.com/sdk/js?client-id=BAAddcIHPZnTZW67aHyPV7GifBehq31nIkzmN6xbl6dF96oEdhRyQUBpEG2RuWbtQvY0SSdqB0NdUo2yVI&components=hosted-buttons&disable-funding=venmo&currency=USD";

/** Adds the PayPal SDK once, the first time a coffee popup needs it. Loading it
 *  site-wide blocked rendering and set PayPal's third-party cookies on every page. */
function loadPayPalSdk() {
  if (window.paypal || document.querySelector(`script[src="${SDK_URL}"]`)) return;
  const script = document.createElement("script");
  script.src = SDK_URL;
  script.async = true;
  document.head.appendChild(script);
}

declare global {
  interface Window {
    paypal?: {
      HostedButtons: (opts: { hostedButtonId: string }) => {
        render: (container: HTMLElement) => void;
      };
    };
  }
}

/**
 * Renders PayPal's hosted "Buy Me a Coffee" button via their official SDK
 * (loaded on demand by loadPayPalSdk). The SDK exposes itself as
 * `window.paypal` asynchronously, so this polls briefly for it rather than
 * assuming it's already loaded the first time the popup opens, and renders
 * into a ref'd container instead of PayPal's usual id-selector so multiple
 * mounts (e.g. React StrictMode's double-invoke in dev) never race to
 * render into the same DOM node twice.
 */
export function PayPalCoffeeButton() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;
    let pollId: ReturnType<typeof setInterval> | undefined;

    const render = () => {
      if (cancelled || !container || container.childElementCount > 0) return;
      window.paypal?.HostedButtons({ hostedButtonId: HOSTED_BUTTON_ID }).render(container);
    };

    if (window.paypal) {
      render();
    } else {
      loadPayPalSdk();
      pollId = setInterval(() => {
        if (window.paypal) {
          clearInterval(pollId);
          render();
        }
      }, 200);
    }

    return () => {
      cancelled = true;
      if (pollId) clearInterval(pollId);
    };
  }, []);

  return <div ref={containerRef} className="paypal-coffee-btn" />;
}
