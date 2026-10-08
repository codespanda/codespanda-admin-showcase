import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { AppWindow, Check, Layers, LayoutDashboard, Smartphone } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { TypeTabs } from "@/components/site/TypeTabs";
import { ShotCard, groupOf } from "@/components/site/ShotCard";
import { SHOTS, getShotById } from "@/lib/portfolio-data";
import { SITE } from "@/lib/constants";
import { StartProjectDialog } from "@/components/site/StartProjectDialog";

const LINKEDIN_URL = "https://www.linkedin.com/company/codespanda";
const PAGE_SIZE = 12;

type Filter = "all" | "mobile" | "web" | "dashboard";
const TABS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "mobile", label: "Mobile apps" },
  { id: "web", label: "Web apps" },
  { id: "dashboard", label: "Dashboards" },
];

const SERVICES = [
  { icon: Smartphone, title: "Mobile apps", body: "Fitness, food delivery, healthcare, shopping and messaging apps.", short: "Fitness, food delivery, healthcare, shopping and messaging." },
  { icon: AppWindow, title: "Web apps", body: "Sign-in and onboarding flows, booking and event platforms.", short: "Sign-in and onboarding flows, booking and event platforms." },
  { icon: LayoutDashboard, title: "Dashboards", body: "SaaS, logistics, e-learning and business management panels.", short: "SaaS, logistics, e-learning and business management." },
  { icon: Layers, title: "UI systems", body: "Components, empty states and feedback patterns that scale.", short: "Components, empty states and feedback patterns." },
];

const FITFLOW_POINTS = ["Daily workout focus", "Streak tracking", "Water intake", "Mindful minutes", "Weekly progress", "Dark & light themes"];

export function DeepakPortfolioPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const filtered = SHOTS.filter((s) => filter === "all" || groupOf(s) === filter);
  const shots = filtered.slice(0, visible);
  const fitflow = getShotById("fitflow");

  const pickFilter = (f: Filter) => {
    setFilter(f);
    setVisible(PAGE_SIZE);
  };

  return (
    <>
      <Helmet>
        <title>UI/UX Portfolio — Dashboard &amp; Product Design | CodesPanda</title>
        <meta
          name="description"
          content="Case studies in admin dashboard UI and product design, from SaaS admin panels to mobile app UX: the design thinking behind CodesPanda templates."
        />
        <link rel="canonical" href="https://codespanda.com/portfolio" />
        <meta property="og:title" content="UI/UX Portfolio — Dashboard &amp; Product Design | CodesPanda" />
        <meta
          property="og:description"
          content="Case studies in admin dashboard UI and product design, from SaaS admin panels to mobile app UX: the design thinking behind CodesPanda templates."
        />
        <meta property="og:url" content="https://codespanda.com/portfolio" />
        <meta property="og:image" content="https://cdn.dribbble.com/userupload/48428945/file/007a381ab43254d9a40ffde8369916a5.png?format=webp&resize=400x300&vertical=center" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="UI/UX Portfolio — Dashboard &amp; Product Design | CodesPanda" />
        <meta name="twitter:description" content="Case studies in dashboard design, admin dashboard UI, and product design — from SaaS admin panels to mobile app UX." />
        <meta name="twitter:image" content="https://cdn.dribbble.com/userupload/48428945/file/007a381ab43254d9a40ffde8369916a5.png?format=webp&resize=400x300&vertical=center" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          "name": "CodesPanda – Portfolio",
          "url": "https://codespanda.com/portfolio",
          "mainEntity": {
            "@type": "Person",
            "name": "Deepak Kumar",
            "jobTitle": "UI/UX Designer & React Developer",
            "address": { "@type": "PostalAddress", "addressLocality": "Mohali", "addressCountry": "IN" },
            "sameAs": [
              "https://dribbble.com/deepak1605",
              LINKEDIN_URL,
            ],
          },
        })}</script>
      </Helmet>

      <div className="flex min-h-screen flex-col bg-background">
        <Navbar />

        <main className="pt-16 lg:pt-20">
          {/* Hero */}
          <section className="flex flex-col gap-[18px] border-b border-border bg-card px-4 pb-10 pt-9 lg:flex-row lg:items-end lg:justify-between lg:gap-16 lg:px-page lg:pb-20 lg:pt-[88px]">
            <div className="flex flex-col gap-[18px] lg:w-[820px] lg:gap-[22px]">
              <span className="text-[13px] font-bold uppercase tracking-[0.08em] text-link lg:text-sm">UI/UX design portfolio</span>
              <h1 className="text-[40px] font-extrabold leading-[1.04] tracking-[-0.035em] lg:text-[68px] lg:leading-[1.02]">
                Apps, web apps and dashboards we've designed.
              </h1>
              <p className="text-base leading-[1.55] text-muted-foreground lg:text-xl">
                Mobile apps, sign-in flows, SaaS dashboards and design systems — <span className="hidden lg:inline">each explored </span>from
                first wireframe to<span className="hidden lg:inline"> polished,</span> hand-off-ready screens.
              </p>
            </div>
            <div className="flex flex-col gap-3 lg:w-[300px]">
              <StartProjectDialog defaultType="UI/UX design">
                <button type="button" className="flex h-[54px] items-center justify-center rounded-xl bg-brand text-base font-bold text-white hover:opacity-90 lg:h-14 lg:text-[17px]">
                  Start a design project
                </button>
              </StartProjectDialog>
              <a
                href="#work"
                className="hidden h-14 items-center justify-center rounded-xl border-[1.5px] border-input text-[17px] font-semibold text-foreground hover:bg-secondary lg:flex"
              >
                See the work
              </a>
            </div>
          </section>

          {/* Featured case */}
          {fitflow && (
            <section className="flex flex-col gap-[18px] bg-band px-4 py-11 text-white lg:flex-row lg:items-center lg:gap-[72px] lg:px-page lg:py-24">
              <div className="flex flex-col gap-[18px] lg:w-[460px] lg:shrink-0 lg:gap-[22px]">
                <div className="flex gap-2">
                  <span className="rounded-[7px] bg-[#16283F] px-2.5 py-[5px] text-xs font-bold text-[#7CC4F2] lg:text-[13px]">Featured</span>
                  <span className="rounded-[7px] bg-[#16283F] px-2.5 py-[5px] text-xs font-semibold text-[#E3E9F0] lg:text-[13px]">Mobile app</span>
                </div>
                <h2 className="text-[30px] font-bold leading-[1.1] tracking-[-0.025em] lg:text-5xl lg:leading-[1.05] lg:tracking-[-0.03em]">
                  FitFlow — a fitness app that makes progress feel motivating.
                </h2>
                <p className="hidden text-lg leading-[1.6] text-[#B7C3D1] lg:block">
                  A dual-theme fitness dashboard balancing strong visual hierarchy with calm, wellness-focused interactions.
                </p>
                <ul className="hidden grid-cols-2 gap-x-5 gap-y-3 text-[15px] text-[#E3E9F0] lg:grid">
                  {FITFLOW_POINTS.map((p) => (
                    <li key={p} className="flex items-center gap-2.5">
                      <Check className="h-[18px] w-[18px] text-[#7CC4F2]" strokeWidth={2.2} aria-hidden />
                      {p}
                    </li>
                  ))}
                </ul>
                <a
                  href={fitflow.dribbbleUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hidden h-[52px] items-center self-start rounded-xl bg-white px-6 text-base font-bold text-[#0B1320] hover:opacity-90 lg:flex"
                >
                  View on Dribbble
                </a>
              </div>
              <Link to="/portfolio/fitflow" className="block min-w-0 lg:flex-1">
                <img
                  src={fitflow.fullImgUrl ?? fitflow.imgUrl}
                  alt="FitFlow fitness app — light and dark screens"
                  className="block aspect-[3/2] w-full rounded-[20px] bg-[#FDEEE3] object-cover lg:aspect-auto lg:h-[540px] lg:rounded-3xl"
                />
              </Link>
              <p className="text-base leading-[1.6] text-[#B7C3D1] lg:hidden">
                A dual-theme fitness dashboard: daily workout focus, streaks, water intake, mindful minutes and weekly progress.
              </p>
              <a
                href={fitflow.dribbbleUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="flex h-[52px] items-center justify-center rounded-xl bg-white text-base font-bold text-[#0B1320] lg:hidden"
              >
                View on Dribbble
              </a>
            </section>
          )}

          {/* Shots */}
          <section id="work" className="flex flex-col gap-[18px] px-4 py-11 lg:gap-9 lg:px-page lg:py-[104px]">
            <div className="flex flex-col gap-[18px] lg:flex-row lg:items-end lg:justify-between">
              <div className="flex flex-col gap-3">
                <span className="hidden text-sm font-bold uppercase tracking-[0.08em] text-link lg:block">Selected work</span>
                <h2 className="text-[28px] font-bold tracking-[-0.025em] lg:text-[44px] lg:tracking-[-0.03em]">Recent shots</h2>
              </div>
              <TypeTabs tabs={TABS} value={filter} onChange={pickFilter} label="Project type" className="grid grid-cols-2 lg:flex" />
            </div>
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-7">
              {shots.map((s, i) => (
                <ShotCard key={s.id} shot={s} index={i} />
              ))}
            </div>
            {visible < filtered.length && (
              <button
                type="button"
                onClick={() => setVisible((v) => v + PAGE_SIZE)}
                className="flex h-[52px] items-center justify-center self-stretch rounded-xl border-[1.5px] border-input bg-card px-[26px] text-base font-semibold text-foreground hover:bg-secondary lg:self-center"
              >
                Show more shots
              </button>
            )}
          </section>

          {/* Services */}
          <section className="flex flex-col gap-4 px-4 pb-11 lg:gap-10 lg:px-page lg:pb-[104px]">
            <div className="flex flex-col gap-3 lg:w-[720px]">
              <span className="hidden text-sm font-bold uppercase tracking-[0.08em] text-link lg:block">What we design</span>
              <h2 className="text-[28px] font-bold leading-[1.12] tracking-[-0.025em] lg:text-[44px] lg:leading-[1.1] lg:tracking-[-0.03em]">
                <span className="lg:hidden">What we design</span>
                <span className="hidden lg:inline">From first wireframe to code-ready screens.</span>
              </h2>
            </div>
            <div className="flex flex-col gap-4 lg:grid lg:grid-cols-4 lg:gap-5">
              {SERVICES.map(({ icon: Icon, title, body, short }) => (
                <div key={title} className="flex flex-col gap-1.5 rounded-[14px] border border-border bg-card p-[18px] lg:gap-3 lg:rounded-2xl lg:p-7">
                  <Icon className="hidden h-[26px] w-[26px] text-link lg:block" strokeWidth={1.9} aria-hidden />
                  <h3 className="text-[17px] font-bold lg:text-[19px]">{title}</h3>
                  <p className="text-[15px] leading-[1.5] text-muted-foreground lg:leading-[1.55]">
                    <span className="lg:hidden">{short}</span>
                    <span className="hidden lg:inline">{body}</span>
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section id="contact" className="px-4 pb-12 lg:px-page lg:pb-[104px]">
            <div className="flex flex-col gap-3.5 rounded-[22px] bg-brand px-[22px] py-8 text-white lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:rounded-[28px] lg:px-page lg:py-[72px]">
              <div className="flex flex-col gap-3.5 lg:w-[700px] lg:gap-4">
                <h2 className="text-[28px] font-bold leading-[1.12] tracking-[-0.025em] lg:text-[46px] lg:leading-[1.08] lg:tracking-[-0.03em]">
                  Have a product that needs design?
                </h2>
                <p className="text-base leading-[1.6] text-white lg:text-lg">
                  We design it in Figma and can build it in React too<span className="hidden lg:inline"> — one team from wireframe to production</span>.
                </p>
              </div>
              <a
                href={`mailto:${SITE.email}`}
                className="flex h-[54px] items-center justify-center rounded-xl bg-white px-7 text-[17px] font-bold text-[#005A94] hover:opacity-90 lg:h-14"
              >
                Chat with Us
              </a>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
