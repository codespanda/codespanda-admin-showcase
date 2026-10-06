import { useId, useState, type FormEvent, type ReactNode } from "react";
import { Check, CircleCheck, Copy, Loader2, Send, TriangleAlert } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

/** Hire Us enquiries go to the official inbox (already activated on FormSubmit). */
export const HIRE_EMAIL = SITE.email;
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${HIRE_EMAIL}`;

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "h-12 w-full rounded-xl border-[1.5px] border-input bg-card px-3.5 text-[15px] text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-link disabled:opacity-60";
const label = "text-sm font-semibold text-foreground";

/** "Hire Us" contact popup that emails the enquiry to HIRE_EMAIL through FormSubmit. */
export function HireUsDialog({ children }: { children: ReactNode }) {
  const uid = useId();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [honey, setHoney] = useState("");

  const subject = `Hire Us enquiry — ${name}`;
  const body = [`Name: ${name}`, `Email: ${email}`, phone && `Phone: ${phone}`, company && `Company: ${company}`, "", message]
    .filter((l) => l !== "")
    .join("\n");
  const mailtoUrl = `mailto:${HIRE_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  const onOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) {
      if (status === "sent") {
        setName("");
        setEmail("");
        setPhone("");
        setCompany("");
        setMessage("");
      }
      setStatus("idle");
      setCopied(false);
    }
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (honey) return; // filled only by bots
    setStatus("sending");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name,
          email,
          ...(phone ? { phone } : {}),
          ...(company ? { company } : {}),
          message,
          _subject: subject,
          _replyto: email,
          _template: "table",
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { success?: string | boolean };
      setStatus(res.ok && String(data.success) === "true" ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(HIRE_EMAIL);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const heading = status === "sent" ? "Successfully sent" : status === "error" ? "We couldn't send your message" : "Hire us";
  const intro =
    status === "sent"
      ? "Thank you for reaching out. We will revert to you shortly on your email."
      : status === "error"
        ? "The message didn't go through. Your details are still here, so try again or email us directly."
        : "Tell us a little about what you need and we'll get back to you by email.";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[calc(100dvh-2rem)] max-w-[480px] gap-0 overflow-y-auto p-0">
        <div className="flex flex-col gap-2 border-b border-border px-6 pb-5 pt-6 lg:px-8 lg:pt-7">
          <span className="text-[13px] font-bold uppercase tracking-[0.08em] text-link">Contact</span>
          <DialogTitle className="flex items-start gap-2.5 font-display text-[26px] font-bold leading-[1.15] tracking-[-0.02em] lg:text-[30px]">
            {status === "sent" && <CircleCheck className="mt-1 h-7 w-7 shrink-0 text-[#05603F] dark:text-[#6EE7B7]" aria-hidden />}
            {heading}
          </DialogTitle>
          <DialogDescription className="text-[15px] leading-[1.55] text-muted-foreground">{intro}</DialogDescription>
        </div>

        {status === "sent" ? (
          <div className="flex flex-col gap-4 px-6 py-6 lg:px-8">
            <p className="rounded-xl bg-secondary px-4 py-3.5 text-[15px]">
              We'll reply to <strong className="font-semibold">{email}</strong>.
            </p>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="flex h-12 items-center justify-center rounded-xl bg-brand text-[15px] font-bold text-white hover:opacity-90"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="flex flex-col gap-5 px-6 py-6 lg:px-8">
            {status === "error" && (
              <div className="flex flex-col gap-3 rounded-xl border border-[#F5C26B] bg-[#FFF8E6] p-4 text-[15px] text-[#7A4A00] dark:border-[#7A5A1E] dark:bg-[#2A2110] dark:text-[#FCD34D]">
                <p className="flex items-start gap-2.5">
                  <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
                  <span>
                    Email us at <strong className="select-all">{HIRE_EMAIL}</strong>.
                  </span>
                </p>
                <div className="flex flex-wrap gap-2">
                  <a href={mailtoUrl} className="flex h-10 items-center rounded-[10px] bg-white px-3.5 text-sm font-semibold text-[#0E1726] hover:bg-white/80">
                    Open email app
                  </a>
                  <button type="button" onClick={copyEmail} className="flex h-10 items-center gap-1.5 rounded-[10px] bg-white px-3.5 text-sm font-semibold text-[#0E1726] hover:bg-white/80">
                    {copied ? <Check className="h-4 w-4" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
                    {copied ? "Copied" : "Copy address"}
                  </button>
                </div>
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label htmlFor={`${uid}-name`} className={label}>Your name</label>
                <input id={`${uid}-name`} required autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} className={field} placeholder="Jane Smith" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor={`${uid}-email`} className={label}>Email</label>
                <input id={`${uid}-email`} type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={field} placeholder="jane@company.com" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor={`${uid}-phone`} className={label}>
                  Phone <span className="font-normal text-muted-foreground">(optional)</span>
                </label>
                <input id={`${uid}-phone`} type="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={field} placeholder="+1 555 000 0000" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor={`${uid}-company`} className={label}>
                  Company <span className="font-normal text-muted-foreground">(optional)</span>
                </label>
                <input id={`${uid}-company`} autoComplete="organization" value={company} onChange={(e) => setCompany(e.target.value)} className={field} placeholder="Acme Inc." />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor={`${uid}-message`} className={label}>How can we help?</label>
              <textarea
                id={`${uid}-message`}
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={cn(field, "h-auto resize-y py-3 leading-[1.5]")}
                placeholder="Tell us what you need, your budget and when you'd like to start."
              />
            </div>

            {/* Spam trap: hidden from people, often filled in by bots. */}
            <input
              type="text"
              name="_honey"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              value={honey}
              onChange={(e) => setHoney(e.target.value)}
              className="absolute -left-[9999px] h-px w-px opacity-0"
            />

            <button
              type="submit"
              disabled={status === "sending"}
              className="flex h-[52px] items-center justify-center gap-2 rounded-xl bg-brand text-base font-bold text-white hover:opacity-90 disabled:cursor-wait disabled:opacity-70"
            >
              {status === "sending" ? <Loader2 className="h-[18px] w-[18px] animate-spin" aria-hidden /> : <Send className="h-[18px] w-[18px]" aria-hidden />}
              {status === "sending" ? "Sending…" : status === "error" ? "Try again" : "Send message"}
            </button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
