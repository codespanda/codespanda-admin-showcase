import { useEffect, useRef } from "react";

const PAYMENT_BUTTON_ID = "pl_TT7ErTw1FQZEdx";

/**
 * Renders Razorpay's hosted "Buy Me a Coffee" payment button.
 * Razorpay's script replaces the <form> contents with its own button UI
 * once it loads, so this just mounts the <script> imperatively (React
 * doesn't execute <script> tags written directly in JSX) and guards
 * against double-injection under StrictMode's double-effect in dev.
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

  return <form ref={formRef} />;
}
