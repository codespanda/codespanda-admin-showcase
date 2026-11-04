import { useId, useState, type FormEvent, type ReactNode } from "react";
import { FormConsent, consentRecord } from "@/components/site/FormConsent";
import { Check, CircleCheck, Copy, Linkedin, Loader2, Mail, TriangleAlert } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { sendEnquiry } from "@/lib/web3forms";

const HIRE_URL = "https://www.linkedin.com/company/codespanda";

export const PROJECT_TYPES = ["Web page", "Admin panel", "SaaS product", "Mobile app", "Custom web app", "UI/UX design", "Something else"] as const;
export type ProjectType = (typeof PROJECT_TYPES)[number];

const TIMELINES = ["As soon as possible", "Within 1 month", "1–3 months", "3+ months", "Not sure yet"];

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "h-12 w-full rounded-xl border-[1.5px] border-input bg-card px-3.5 text-[15px] text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-link disabled:opacity-60";
const label = "text-sm font-semibold text-foreground";

/** "Start a project" popup that sends the enquiry to SITE.email through Web3Forms. */
export function StartProjectDialog({ children, defaultType = "Custom web app" }: { children: ReactNode; defaultType?: ProjectType }) {
  const uid = useId();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState<ProjectType>(defaultType);
  const [timeline, setTimeline] = useState(TIMELINES[4]);
  const [details, setDetails] = useState("");
  const [honey, setHoney] = useState("");
  const [consent, setConsent] = useState(false);

  const subject = `New project: ${type} — ${name}`;
  const body = [`Name: ${name}`, `Email: ${email}`, `Project type: ${type}`, `Timeline: ${timeline}`, "", details].join("\n");
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(SITE.email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const mailtoUrl = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  const onOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) {
      if (status === "sent") {
        setConsent(false);
        setName("");
        setEmail("");
        setDetails("");
        setType(defaultType);
        setTimeline(TIMELINES[4]);
      }
      setStatus("idle");
      setCopied(false);
    }
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (honey) return; // filled only by bots
    if (!consent) return;
    setStatus("sending");
    try {
      const sent = await sendEnquiry({
        subject,
        name,
        email,
        "Project type": type,
        Timeline: timeline,
        message: details,
        Consent: consentRecord(),
      });
      setStatus(sent ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const heading =
    status === "sent" ? "Thanks — we've got your project details" : status === "error" ? "We couldn't send your message" : "Tell us about your project";
  const intro =
    status === "sent"
      ? `We'll reply to ${email} soon.`
      : status === "error"
        ? "The message didn't go through. Your details are still here, so try again or send them another way below."
        : "A few details help us reply with something useful. We usually reply by email.";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[calc(100dvh-2rem)] max-w-[480px] gap-0 overflow-y-auto p-0">
        <div className="flex flex-col gap-2 border-b border-border px-6 pb-5 pt-6 lg:px-8 lg:pt-7">
          <span className="text-[13px] font-bold uppercase tracking-[0.08em] text-link">Start a project</span>
          <DialogTitle className="flex items-start gap-2.5 font-display text-[26px] font-bold leading-[1.15] tracking-[-0.02em] lg:text-[30px]">
            {status === "sent" && <CircleCheck className="mt-1 h-7 w-7 shrink-0 text-[#05603F] dark:text-[#6EE7B7]" aria-hidden />}
            {heading}
          </DialogTitle>
          <DialogDescription className="text-[15px] leading-[1.55] text-muted-foreground">{intro}</DialogDescription>
        </div>

        {status === "sent" ? (
          <div className="flex flex-col gap-4 px-6 py-6 lg:px-8">
            <dl className="flex flex-col rounded-xl bg-secondary px-4 py-1 text-[15px]">
              {[
                ["Project type", type],
                ["Timeline", timeline],
              ].map(([k, v], i) => (
                <div key={k} className={cn("flex justify-between gap-4 py-2.5", i > 0 && "border-t border-border")}>
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
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
                    Email us at <strong className="select-all">{SITE.email}</strong> — these open a message with your details already filled in:
                  </span>
                </p>
                <div className="flex flex-wrap gap-2">
                  <a href={gmailUrl} target="_blank" rel="noreferrer noopener" className="flex h-10 items-center rounded-[10px] bg-white px-3.5 text-sm font-semibold text-[#0E1726] hover:bg-white/80">
                    Open in Gmail
                  </a>
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
            </div>

            <fieldset className="flex flex-col gap-2">
              <legend className={cn(label, "mb-2")}>What do you need?</legend>
              <div className="flex flex-wrap gap-2">
                {PROJECT_TYPES.map((t) => {
                  const on = t === type;
                  return (
                    <button
                      key={t}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setType(t)}
                      className={cn(
                        "flex h-10 items-center gap-1.5 rounded-[10px] border-[1.5px] px-3.5 text-sm font-semibold transition-colors",
                        on ? "border-link bg-blue-soft text-blue-ink" : "border-border bg-card text-foreground hover:bg-secondary"
                      )}
                    >
                      {on && <Check className="h-4 w-4" aria-hidden />}
                      {t}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className="flex flex-col gap-1.5">
              <label htmlFor={`${uid}-timeline`} className={label}>Timeline</label>
              <select id={`${uid}-timeline`} value={timeline} onChange={(e) => setTimeline(e.target.value)} className={field}>
                {TIMELINES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor={`${uid}-details`} className={label}>Project details</label>
              <textarea
                id={`${uid}-details`}
                required
                rows={4}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className={cn(field, "h-auto resize-y py-3 leading-[1.5]")}
                placeholder="What are you building, who is it for, and what should it do?"
              />
            </div>

            <p className="-mt-2 text-[13px] leading-[1.5] text-muted-foreground">
              Have a brief, sketch or screenshots? Email them to <strong className="font-semibold text-foreground">{SITE.email}</strong> after sending this.
            </p>

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

            <FormConsent id={`${uid}-consent`} checked={consent} onChange={setConsent} />

            <div className="flex flex-col gap-3 border-t border-line-2 pt-5">
              <button
                type="submit"
                disabled={status === "sending"}
                className="flex h-[52px] items-center justify-center gap-2 rounded-xl bg-brand text-base font-bold text-white hover:opacity-90 disabled:cursor-wait disabled:opacity-70"
              >
                {status === "sending" ? <Loader2 className="h-[18px] w-[18px] animate-spin" aria-hidden /> : <Mail className="h-[18px] w-[18px]" aria-hidden />}
                {status === "sending" ? "Sending…" : status === "error" ? "Try again" : "Send project details"}
              </button>
              <p className="text-center text-sm text-muted-foreground">
                Prefer LinkedIn?{" "}
                <a href={HIRE_URL} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-1 font-semibold text-link hover:text-blue-ink">
                  <Linkedin className="h-3.5 w-3.5" aria-hidden /> Message us there
                </a>
              </p>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
