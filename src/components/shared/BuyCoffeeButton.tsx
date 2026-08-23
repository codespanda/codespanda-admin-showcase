import { Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";

// Same destination Razorpay's payment-button.js embed renders — linking
// straight to it lets this button match the site's own design system
// exactly, instead of Razorpay's un-themeable default widget styling.
const PAYMENT_URL =
  "https://razorpay.com/payment-button/pl_TT7ErTw1FQZEdx/view/?utm_source=payment_button&utm_medium=button&utm_campaign=payment_button";

export function BuyCoffeeButton() {
  return (
    <Button variant="gradient" size="lg" className="group" asChild>
      <a href={PAYMENT_URL} target="_blank" rel="noreferrer noopener">
        Buy Me a Coffee
        <Coffee className="transition-transform group-hover:-rotate-12" />
      </a>
    </Button>
  );
}
