import { useEffect, useRef } from "react";

const HOSTED_BUTTON_ID = "VHZUWQ6H7QZTQ";

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
 * (the SDK script itself is loaded once, site-wide, from index.html so it's
 * ready before any popup that might need it). The SDK exposes itself as
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
