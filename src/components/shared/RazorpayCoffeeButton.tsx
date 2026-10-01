import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const PAYMENT_BUTTON_ID = "pl_TT7ErTw1FQZEdx";

interface RazorpayCoffeeButtonProps {
  /** Matches the site's Button size scale — "sm" mirrors the navbar's "Hire Me" button. */
  size?: "sm" | "lg";
  /** Replaces the label Razorpay's widget renders (set in their dashboard as "Buy A Coffee"). */
  label?: string;
}

/**
 * Renders Razorpay's hosted "Buy Me a Coffee" payment button via their
 * official embed (payment-button.js). Razorpay's script replaces the
 * <form> contents with its own <a class="PaymentButton"> once it loads —
 * React doesn't execute <script> tags written directly in JSX, so this
 * mounts it imperatively (with a StrictMode double-invoke guard).
 *
 * The rendered button is restyled to match the site's own Button
 * component via the ".razorpay-coffee-btn" overrides in index.css,
 * since Razorpay's default widget CSS can't be themed from their
 * dashboard. Pass size="sm" to match a compact context like the navbar.
 */
export function RazorpayCoffeeButton({ size = "lg", label = "Pay with Razorpay" }: RazorpayCoffeeButtonProps) {
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

  // Razorpay renders its button after the script loads (and may re-render it),
  // so swap the label whenever its text node appears or changes.
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    const relabel = () => {
      const text = form.querySelector<HTMLElement>(".PaymentButton-text");
      if (text && text.textContent !== label) text.textContent = label;
    };
    relabel();
    const observer = new MutationObserver(relabel);
    observer.observe(form, { childList: true, subtree: true, characterData: true });
    return () => observer.disconnect();
  }, [label]);

  return (
    <form
      ref={formRef}
      className={cn("razorpay-coffee-btn", size === "sm" && "razorpay-coffee-btn--sm")}
    />
  );
}
