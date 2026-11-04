import { Link } from "react-router-dom";

/**
 * Notice and consent for the enquiry forms (DPDP Act, Sections 5 and 6): what is collected,
 * why, where it goes, and how to withdraw. The checkbox is required, so nothing is sent
 * without an explicit "yes".
 */
export function FormConsent({ id, checked, onChange }: { id: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex flex-col gap-2.5 rounded-xl bg-secondary px-4 py-3.5">
      <p className="text-[13px] leading-[1.55] text-muted-foreground">
        We'll use your name, email and the details you write only to reply and prepare a quote. They're sent through
        Web3Forms to our inbox, and deleted within 12 months if we don't work together. You can ask us to see, correct or delete
        them, or withdraw consent, any time.{" "}
        <Link to="/legal/privacy" className="font-semibold text-link underline underline-offset-2 hover:text-blue-ink">
          Privacy policy
        </Link>
      </p>
      <label htmlFor={id} className="flex cursor-pointer items-start gap-2.5 text-[14px] font-semibold text-foreground">
        <input id={id} type="checkbox" required checked={checked} onChange={(e) => onChange(e.target.checked)} className="mt-0.5 h-[18px] w-[18px] shrink-0 accent-[hsl(var(--primary))]" />
        I agree to CodesPanda using these details to respond to my enquiry.
      </label>
    </div>
  );
}

/** Recorded with the submission, as a record of the consent given. */
export const consentRecord = () => `Agreed to the privacy notice on ${new Date().toISOString()} (codespanda.com/legal/privacy, November 2026 version)`;
