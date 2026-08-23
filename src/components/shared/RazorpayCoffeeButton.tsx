import { useEffect, useRef } from "react";

const PAYMENT_BUTTON_ID = "pl_TT7ErTw1FQZEdx";

/**
 * Renders Razorpay's hosted "Buy Me a Coffee" payment button via their
 * official embed (payment-button.js). Razorpay's script replaces the
 * <form> contents with its own <a class="PaymentButton"> once it loads —
 * React doesn't execute <script> tags written directly in JSX, so this
 * mounts it imperatively (with a StrictMode double-invoke guard).
 *
 * The rendered button is restyled to match the site's own "Browse
 * Templates" button via the ".razorpay-coffee-btn" overrides in
 * index.css, since Razorpay's default widget CSS can't be themed from
 * their dashboard alone.
 */
export function RazorpayCoffeeButton() {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const form = formRef.current;
    if (!form || form.querySelector("script")) return;

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/payment-button.js";
    script.async = true;
    script.setAttribute("data-payment_button_id", PAYMENT_BUTTON_ID);
    form.appendChild(script);
  }, []);

  return <form ref={formRef} className="razorpay-coffee-btn" />;
}
