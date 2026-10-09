import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { AppWindow, Check, Code2, Layers, LayoutDashboard, PenTool, Smartphone } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { TechLogo } from "@/components/site/TechLogo";
import { HireUsDialog } from "@/components/site/HireUsDialog";
import { SITE } from "@/lib/constants";

const SERVICES = [
  {
    icon: PenTool,
    title: "UI/UX design",
    body: "Interfaces designed in Figma, from first wireframe to hand-off-ready screens.",
    points: ["Mobile apps and web apps", "Dashboards and admin panels", "Design systems and UI kits"],
    link: { label: "See our design work", to: "/portfolio" },
  },
  {
    icon: AppWindow,
    title: "Web pages",
    body: "Landing pages and business websites that load fast and work on every screen.",
    points: ["Responsive React + Tailwind builds", "SEO-ready pages and metadata", "Forms, galleries and content sections"],
    link: { label: "Browse web page templates", to: "/templates?type=web" },
  },
  {
    icon: LayoutDashboard,
    title: "Admin panels",
    body: "Back offices your team can run a business from, not just a single dashboard page.",
    points: ["Tables, charts and reports", "Roles, settings and auth screens", "Light and dark themes"],
    link: { label: "Browse admin panels", to: "/templates?type=admin" },
  },
  {
    icon: Layers,
    title: "SaaS products",
    body: "Software-as-a-service products taken from idea to launch. We build and run our own, like AI Invoice.",
    points: ["Sign-up, onboarding and settings", "Dashboards built around your users' work", "AI features where they save real time"],
    link: { label: "See our live products", to: "/projects" },
  },
  {
    icon: Smartphone,
    title: "Mobile apps",
    body: "Mobile app interfaces for iOS and Android, designed around how people use their phones.",
    points: ["Onboarding, booking and checkout flows", "Light and dark themes", "Screens ready to hand off for development"],
    link: { label: "See mobile app designs", to: "/portfolio" },
  },
  {
    icon: Code2,
    title: "Custom web applications",
    body: "Production-ready applications built around your workflow and wired to your backend.",
    points: ["React, Vite and TypeScript", "REST or GraphQL integration", "Clean, documented source code"],
    link: { label: "See live projects", to: "/projects" },
  },
];

const STEPS = [
  { title: "Discover", body: "We learn what you're building, who uses it and what it has to do." },
  { title: "Design", body: "We shape the flows and screens in Figma and refine them with you." },
  { title: "Build", body: "We develop it in React, Vite and Tailwind CSS with clean, typed code." },
  { title: "Launch", body: "We ship it and hand over the source code and documentation." },
];

const STACK = ["React", "Vite", "Tailwind CSS", "JavaScript", "TypeScript", "Next.js"];

export function ServicesPage() {
  return (
    <>
      <Helmet>
        <title>Services — UI/UX Design &amp; React Development | CodesPanda</title>
        <meta
          name="description"
          content="CodesPanda designs and builds web pages, admin panels and custom web applications — UI/UX design in Figma and development in React, Vite and Tailwind CSS."
        />
        <link rel="canonical" href="https://codespanda.com/services" />
        <meta property="og:title" content="Services — UI/UX Design & React Development | CodesPanda" />
        <meta property="og:description" content="UI/UX design, web pages, admin panels and custom web applications, built with React, Vite and Tailwind CSS." />
        <meta property="og:url" content="https://codespanda.com/services" />
        <meta property="og:image" content="https://codespanda.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Services — UI/UX Design & React Development | CodesPanda" />
        <meta name="twitter:description" content="UI/UX design, web pages, admin panels and custom web applications, built with React, Vite and Tailwind CSS." />
        <meta name="twitter:image" content="https://codespanda.com/og-image.png" />
      </Helmet>

      <div className="flex min-h-screen flex-col bg-background">
        <Navbar />

        <main className="flex flex-1 flex-col pt-16 lg:pt-20">
          {/* Hero */}
          <section className="flex flex-col gap-[18px] border-b border-border bg-card px-4 pb-10 pt-9 lg:flex-row lg:items-end lg:justify-between lg:gap-16 lg:px-page lg:pb-20 lg:pt-[88px]">
            <div className="flex flex-col gap-[18px] lg:max-w-[820px] lg:gap-[22px]">
              <span className="text-[13px] font-bold uppercase tracking-[0.08em] text-link lg:text-sm">Services</span>
              <h1 className="text-balance text-[40px] font-extrabold leading-[1.04] tracking-[-0.035em] lg:text-[64px] lg:leading-[1.02]">
                Design and development for web apps and admin panels.
              </h1>
              <p className="text-base leading-[1.6] text-muted-foreground lg:text-xl">
                One team from wireframe to production: we design the screens, build them in React and hand you code you can maintain.
              </p>
            </div>
            <div className="flex flex-col gap-3 lg:w-[300px] lg:shrink-0">
              <a
                href={SITE.whatsappUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="flex h-[54px] items-center justify-center rounded-xl bg-brand text-base font-bold text-white hover:opacity-90 lg:h-14 lg:text-[17px]"
              >
                Chat with Us
              </a>
              <HireUsDialog>
                <button
                  type="button"
                  className="flex h-[54px] items-center justify-center rounded-xl border-[1.5px] border-input text-base font-semibold text-foreground hover:bg-secondary lg:h-14 lg:text-[17px]"
                >
                  Hire us
                </button>
              </HireUsDialog>
            </div>
          </section>

          {/* What we do */}
          <section className="flex flex-col gap-6 px-4 py-12 lg:gap-10 lg:px-page lg:py-[104px]">
            <div className="flex flex-col gap-2.5 lg:max-w-[720px] lg:gap-3">
              <span className="text-[13px] font-bold uppercase tracking-[0.08em] text-link lg:text-sm">What we do</span>
              <h2 className="text-[30px] font-bold leading-[1.12] tracking-[-0.025em] lg:text-[44px] lg:leading-[1.1] lg:tracking-[-0.03em]">
                Six ways we can help.
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:gap-6 xl:grid-cols-3">
              {SERVICES.map(({ icon: Icon, title, body, points, link }) => (
                <div key={title} className="flex flex-col gap-4 rounded-[20px] border border-border bg-card p-6 lg:gap-5 lg:p-9">
                  <span className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-blue-soft">
                    <Icon className="h-6 w-6 text-link" strokeWidth={1.8} aria-hidden />
                  </span>
                  <h3 className="text-[24px] font-bold tracking-[-0.02em] lg:text-[28px]">{title}</h3>
                  <p className="text-[15px] leading-[1.6] text-muted-foreground lg:text-base">{body}</p>
                  <ul className="flex flex-col gap-2.5">
                    {points.map((p) => (
                      <li key={p} className="flex items-center gap-2.5 text-[15px]">
                        <Check className="h-[18px] w-[18px] shrink-0 text-link" strokeWidth={2.4} aria-hidden />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <Link to={link.to} className="mt-auto pt-1 text-[15px] font-semibold text-link hover:text-blue-ink">
                    {link.label} →
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* How we work */}
          <section className="flex flex-col gap-6 bg-band px-4 py-12 text-white lg:gap-10 lg:px-page lg:py-[104px]">
            <div className="flex flex-col gap-2.5 lg:max-w-[720px] lg:gap-3">
              <span className="text-[13px] font-bold uppercase tracking-[0.08em] text-[#7CC4F2] lg:text-sm">How we work</span>
              <h2 className="text-[30px] font-bold leading-[1.12] tracking-[-0.025em] lg:text-[44px] lg:leading-[1.1] lg:tracking-[-0.03em]">
                From first call to launch.
              </h2>
            </div>
            <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
              {STEPS.map((s, i) => (
                <li key={s.title} className="flex flex-col gap-3 rounded-[18px] border border-[#22344D] bg-[#121E30] p-6">
                  <span className="font-display text-[15px] font-bold text-[#7CC4F2]">Step {i + 1}</span>
                  <h3 className="text-[22px] font-bold">{s.title}</h3>
                  <p className="text-[15px] leading-[1.6] text-[#B7C3D1]">{s.body}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* Stack */}
          <section className="px-4 py-12 lg:px-page lg:py-[104px]">
            <div className="flex flex-col gap-5 rounded-[20px] border border-border bg-card p-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:px-11 lg:py-9">
              <div className="flex flex-col gap-1.5">
                <span className="text-xl font-bold">Built on a stack you already know</span>
                <span className="text-[15px] text-muted-foreground">So your team can pick it up and keep going.</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 lg:gap-2.5">
                {STACK.map((s) => (
                  <span key={s} className="flex items-center gap-2 rounded-[10px] bg-secondary px-3.5 py-2.5 text-sm font-semibold lg:py-3 lg:text-[15px]">
                    <TechLogo name={s} />
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="px-4 pb-12 lg:px-page lg:pb-[104px]">
            <div className="flex flex-col gap-4 rounded-[22px] bg-brand px-6 py-9 text-white lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:rounded-[28px] lg:px-20 lg:py-[72px]">
              <div className="flex flex-col gap-4 lg:w-[700px]">
                <h2 className="text-[30px] font-bold leading-[1.12] tracking-[-0.025em] lg:text-[46px] lg:leading-[1.08] lg:tracking-[-0.03em]">
                  Let's build your next product.
                </h2>
                <p className="text-base leading-[1.6] text-white lg:text-lg">
                  Start from one of our templates or from a blank page. Tell us what you need and we'll take it from there.
                </p>
              </div>
              <div className="flex flex-col gap-3 lg:flex-row">
                <a href={SITE.whatsappUrl} target="_blank" rel="noreferrer noopener" className="flex h-[54px] items-center justify-center rounded-xl bg-white px-7 text-[17px] font-bold text-[#005A94] hover:opacity-90 lg:h-14">
                  Chat with Us
                </a>
                <Link
                  to="/projects"
                  className="flex h-[54px] items-center justify-center rounded-xl border-[1.5px] border-[#7CC4F2] px-[26px] text-[17px] font-semibold text-white hover:bg-white/10 lg:h-14"
                >
                  See our projects
                </Link>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
