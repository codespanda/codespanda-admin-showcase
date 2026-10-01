import { Coffee } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RazorpayCoffeeButton } from "@/components/shared/RazorpayCoffeeButton";
import { PayPalCoffeeButton } from "@/components/shared/PayPalCoffeeButton";
import { cn } from "@/lib/utils";

/** "Buy Me a Coffee" link that opens the Razorpay / PayPal tip dialog. */
export function BuyMeCoffee({ className }: { className?: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button" className={cn("inline-flex items-center gap-1.5 text-left", className)}>
          <Coffee className="h-4 w-4" aria-hidden />
          Buy Me a Coffee
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Buy Me a Coffee</DialogTitle>
          <DialogDescription>
            Enjoying the templates? A small tip keeps them free and helps fund new ones.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4 py-2">
          {/* Mirrors the item set on PayPal hosted button VHZUWQ6H7QZTQ; PayPal's own copy is hidden in index.css. */}
          <div className="w-full max-w-[16rem] font-display">
            <p className="text-lg font-bold">Website Consultancy</p>
            <p className="mt-1 text-lg font-bold">$5.00 USD</p>
          </div>
          <RazorpayCoffeeButton size="lg" />
          <div className="flex w-full items-center gap-3 text-xs text-muted-foreground">
            <div className="h-px flex-1 bg-border" />
            or
            <div className="h-px flex-1 bg-border" />
          </div>
          <PayPalCoffeeButton />
        </div>
      </DialogContent>
    </Dialog>
  );
}
