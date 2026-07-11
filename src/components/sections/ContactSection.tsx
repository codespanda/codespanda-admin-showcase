import { Mail, Github, Linkedin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/constants";

const LINKS = [
  {
    icon: Mail,
    label: "Email",
    value: SITE.email,
    href: `mailto:${SITE.email}`,
    external: false,
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/codespanda",
    href: SITE.githubOrg,
    external: true,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "Deepak Kumar",
    href: "https://www.linkedin.com/in/deepak-kumar-2b076b109/",
    external: true,
  },
];

export function ContactSection() {
  return (
    <section id="contact" className="py-20 px-4" aria-labelledby="contact-heading">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <span className="mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            Contact
          </span>
          <h2
            id="contact-heading"
            className="text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Get in touch
          </h2>
          <p className="mt-3 text-muted-foreground">
            Have a question, a custom template request, or want to work together? Reach out — typical response within 48 hours.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card shadow-sm divide-y divide-border">
          {LINKS.map(({ icon: Icon, label, value, href, external }) => (
            <a
              key={label}
              href={href}
              {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
              className="flex items-center gap-4 px-6 py-5 transition-colors hover:bg-secondary/50 group"
            >
              <div className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
                <p className="mt-0.5 text-sm font-medium text-foreground truncate">{value}</p>
              </div>
              {external && (
                <ExternalLink className="h-4 w-4 flex-shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              )}
            </a>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Button variant="gradient" size="lg" asChild>
            <a href="https://www.linkedin.com/in/deepak-kumar-2b076b109/" target="_blank" rel="noreferrer noopener">
              Hire Me for Custom Work
            </a>
          </Button>
          <p className="mt-3 text-xs text-muted-foreground">
            Available for freelance React development, dashboard builds, and template customization.
          </p>
        </div>
      </div>
    </section>
  );
}
