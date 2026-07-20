import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import { ExternalLink, MapPin, Briefcase, Palette, Layout } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Button } from "@/components/ui/button";

const Footer = lazy(() =>
  import("@/components/sections/Footer").then((m) => ({ default: m.Footer }))
);

/* ------------------------------------------------------------------ */
/* Data                                                                 */
/* ------------------------------------------------------------------ */

interface Shot {
  id: string;
  title: string;
  category: string;
  tags: string[];
  dribbbleUrl: string;
  color: string;
}

const SHOTS: Shot[] = [
  {
    id: "homefinder",
    title: "HomeFinder – Real Estate App UI",
    category: "Mobile App",
    tags: ["Real Estate", "Mobile", "iOS"],
    dribbbleUrl: "https://dribbble.com/deepak1605",
    color: "from-blue-500/20 to-indigo-500/10",
  },
  {
    id: "taxi",
    title: "Taxi Booking App – Modern Ride-Hailing UI",
    category: "Mobile App",
    tags: ["Transport", "Mobile", "Maps"],
    dribbbleUrl: "https://dribbble.com/deepak1605",
    color: "from-amber-500/20 to-yellow-500/10",
  },
  {
    id: "music",
    title: "Music Streaming App – Premium Mobile UI",
    category: "Mobile App",
    tags: ["Music", "Streaming", "Mobile"],
    dribbbleUrl: "https://dribbble.com/deepak1605",
    color: "from-purple-500/20 to-violet-500/10",
  },
  {
    id: "medicare",
    title: "Medicare Clinic App – Healthcare Mobile UI",
    category: "Mobile App",
    tags: ["Healthcare", "Mobile", "Clinic"],
    dribbbleUrl: "https://dribbble.com/deepak1605",
    color: "from-emerald-500/20 to-teal-500/10",
  },
  {
    id: "carwash",
    title: "Car Wash App – Premium Mobile UI Design",
    category: "Mobile App",
    tags: ["Automotive", "Mobile", "Services"],
    dribbbleUrl: "https://dribbble.com/deepak1605",
    color: "from-cyan-500/20 to-sky-500/10",
  },
  {
    id: "kids-learning",
    title: "Kids Learning App – Fun & Interactive Education UI",
    category: "Mobile App",
    tags: ["Education", "Kids", "Mobile"],
    dribbbleUrl: "https://dribbble.com/deepak1605",
    color: "from-orange-500/20 to-rose-500/10",
  },
  {
    id: "nexora-crm",
    title: "Nexora CRM – Customer Relationship Management Dashboard",
    category: "Web Dashboard",
    tags: ["CRM", "Dashboard", "SaaS"],
    dribbbleUrl: "https://dribbble.com/deepak1605",
    color: "from-indigo-500/20 to-purple-500/10",
  },
  {
    id: "nexora-admin",
    title: "Nexora – Modern Admin Dashboard UI",
    category: "Web Dashboard",
    tags: ["Admin", "Dashboard", "Web"],
    dribbbleUrl: "https://dribbble.com/deepak1605",
    color: "from-violet-500/20 to-indigo-500/10",
  },
  {
    id: "interior",
    title: "Interior Decoration Mobile App UI",
    category: "Mobile App",
    tags: ["Interior", "Lifestyle", "Mobile"],
    dribbbleUrl: "https://dribbble.com/deepak1605",
    color: "from-stone-500/20 to-amber-500/10",
  },
  {
    id: "ebooks",
    title: "eBooks App UI Design",
    category: "Mobile App",
    tags: ["Books", "Reading", "Mobile"],
    dribbbleUrl: "https://dribbble.com/deepak1605",
    color: "from-rose-500/20 to-pink-500/10",
  },
  {
    id: "school",
    title: "Modern School Management System UI",
    category: "Web Dashboard",
    tags: ["Education", "ERP", "Dashboard"],
    dribbbleUrl: "https://dribbble.com/deepak1605",
    color: "from-blue-500/20 to-sky-500/10",
  },
  {
    id: "hairaura",
    title: "HairAura — Hair Salon Mobile App UI",
    category: "Mobile App",
    tags: ["Beauty", "Salon", "Booking"],
    dribbbleUrl: "https://dribbble.com/deepak1605",
    color: "from-pink-500/20 to-rose-500/10",
  },
  {
    id: "harmony",
    title: "Harmony — Music Streaming Mobile App UI",
    category: "Mobile App",
    tags: ["Music", "Streaming", "Dark UI"],
    dribbbleUrl: "https://dribbble.com/deepak1605",
    color: "from-fuchsia-500/20 to-purple-500/10",
  },
  {
    id: "foodiego",
    title: "FoodieGo – Food Delivery Mobile App UI",
    category: "Mobile App",
    tags: ["Food", "Delivery", "Mobile"],
    dribbbleUrl: "https://dribbble.com/deepak1605",
    color: "from-orange-500/20 to-amber-500/10",
  },
  {
    id: "beauty",
    title: "Beauty – Skincare & Cosmetics Mobile App UI",
    category: "Mobile App",
    tags: ["Beauty", "eCommerce", "Mobile"],
    dribbbleUrl: "https://dribbble.com/deepak1605",
    color: "from-rose-500/20 to-red-500/10",
  },
  {
    id: "waygo",
    title: "WayGo – Smart Car Travel & Road Trip App UI",
    category: "Mobile App",
    tags: ["Travel", "Maps", "Mobile"],
    dribbbleUrl: "https://dribbble.com/deepak1605",
    color: "from-teal-500/20 to-emerald-500/10",
  },
  {
    id: "lumiere",
    title: "Lumière – Luxury Jewellery Shopping App UI",
    category: "Mobile App",
    tags: ["Luxury", "eCommerce", "Mobile"],
    dribbbleUrl: "https://dribbble.com/deepak1605",
    color: "from-yellow-500/20 to-amber-500/10",
  },
  {
    id: "nutrifit",
    title: "NutriFit – Healthy Products Marketplace & Nutrition App",
    category: "Mobile App",
    tags: ["Health", "Marketplace", "Mobile"],
    dribbbleUrl: "https://dribbble.com/deepak1605",
    color: "from-lime-500/20 to-green-500/10",
  },
  {
    id: "cornerstone-concept",
    title: "Cornerstone — Modern SaaS Landing Page Concept",
    category: "Web Design",
    tags: ["SaaS", "Landing Page", "Web"],
    dribbbleUrl: "https://dribbble.com/deepak1605",
    color: "from-emerald-500/20 to-teal-500/10",
  },
  {
    id: "jewellery-pos",
    title: "Luxury Jewellery POS System UI",
    category: "Web Dashboard",
    tags: ["POS", "Retail", "Luxury"],
    dribbbleUrl: "https://dribbble.com/deepak1605",
    color: "from-amber-500/20 to-yellow-500/10",
  },
  {
    id: "cafe-pos",
    title: "Modern Cafe POS Dashboard UI",
    category: "Web Dashboard",
    tags: ["POS", "Cafe", "Dashboard"],
    dribbbleUrl: "https://dribbble.com/deepak1605",
    color: "from-brown-500/20 to-orange-500/10",
  },
  {
    id: "posymart",
    title: "PosyMart – Modern Cafe POS Dashboard UI",
    category: "Web Dashboard",
    tags: ["POS", "Retail", "Dashboard"],
    dribbbleUrl: "https://dribbble.com/deepak1605",
    color: "from-orange-500/20 to-red-500/10",
  },
  {
    id: "ecommerce-admin",
    title: "Modern E-commerce Admin Dashboard UI",
    category: "Web Dashboard",
    tags: ["eCommerce", "Admin", "Dashboard"],
    dribbbleUrl: "https://dribbble.com/deepak1605",
    color: "from-sky-500/20 to-blue-500/10",
  },
  {
    id: "greenerp",
    title: "GreenERP – Modern ERP Dashboard | Finance & Business Management",
    category: "Web Dashboard",
    tags: ["ERP", "Finance", "Dashboard"],
    dribbbleUrl: "https://dribbble.com/deepak1605",
    color: "from-green-500/20 to-emerald-500/10",
  },
];

const SKILLS = [
  { label: "UI Design", icon: Palette },
  { label: "Dashboard Design", icon: Layout },
  { label: "Mobile App UI", icon: Briefcase },
  { label: "Web Design", icon: ExternalLink },
];

const STATS = [
  { value: "24+", label: "Design shots" },
  { value: "5+", label: "React templates" },
  { value: "3+", label: "Years experience" },
  { value: "10+", label: "Categories" },
];

/* ------------------------------------------------------------------ */
/* Initials avatar for each shot (no external images)                  */
/* ------------------------------------------------------------------ */
function ShotCard({ shot, index }: { shot: Shot; index: number }) {
  const initials = shot.title
    .split(/[\s–—]+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <a
      href={shot.dribbbleUrl}
      target="_blank"
      rel="noreferrer noopener"
      className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1"
      style={{ animationDelay: `${index * 30}ms` }}
    >
      {/* Thumbnail placeholder */}
      <div
        className={`relative flex items-center justify-center bg-gradient-to-br ${shot.color} h-48 overflow-hidden`}
      >
        <span className="text-5xl font-black text-foreground/10 select-none">{initials}</span>
        <div className="absolute inset-0 flex items-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gradient-to-t from-black/40 to-transparent">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-black">
            <ExternalLink className="h-3 w-3" />
            View on Dribbble
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-primary">
          {shot.category}
        </span>
        <h3 className="text-sm font-semibold leading-snug line-clamp-2">{shot.title}</h3>
        <div className="mt-auto flex flex-wrap gap-1 pt-2">
          {shot.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-border bg-secondary px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                 */
/* ------------------------------------------------------------------ */
export function DeepakPortfolioPage() {
  return (
    <>
      <Helmet>
        <title>Deepak Kumar — UI/UX Designer & React Developer | Portfolio</title>
        <meta
          name="description"
          content="Portfolio of Deepak Kumar — UI/UX designer and React developer from Mohali, India. 24+ design shots on Dribbble covering mobile apps, dashboards, and web design."
        />
        <link rel="canonical" href="https://codespanda.com/portfolio" />
        <meta property="og:title" content="Deepak Kumar — UI/UX Designer & React Developer" />
        <meta
          property="og:description"
          content="Portfolio of Deepak Kumar — UI/UX designer and React developer. 24+ Dribbble shots across mobile app UI, dashboards, SaaS, and POS design."
        />
        <meta property="og:url" content="https://codespanda.com/portfolio" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          "name": "Deepak Kumar – Portfolio",
          "url": "https://codespanda.com/portfolio",
          "mainEntity": {
            "@type": "Person",
            "name": "Deepak Kumar",
            "jobTitle": "UI/UX Designer & React Developer",
            "address": { "@type": "PostalAddress", "addressLocality": "Mohali", "addressCountry": "IN" },
            "sameAs": [
              "https://dribbble.com/deepak1605",
              "https://www.linkedin.com/in/deepak-kumar-2b076b109/",
            ],
          },
        })}</script>
      </Helmet>

      <Navbar />

      <main className="min-h-screen pt-24 pb-20">
        {/* Hero */}
        <section className="mx-auto max-w-5xl px-4 pt-12 pb-16 text-center">
          <span className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            Portfolio
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Deepak Kumar
          </h1>
          <p className="mt-3 text-lg font-medium text-muted-foreground">
            UI / UX Designer &amp; React Developer
          </p>
          <div className="mt-2 flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            Mohali, India &nbsp;·&nbsp; Web Design, UI / Visual Design, Brand / Graphic Design
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button variant="gradient" asChild>
              <a href="https://dribbble.com/deepak1605" target="_blank" rel="noreferrer noopener">
                <ExternalLink className="h-4 w-4" />
                View on Dribbble
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="https://www.linkedin.com/in/deepak-kumar-2b076b109/" target="_blank" rel="noreferrer noopener">
                LinkedIn
              </a>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="rounded-2xl border border-border bg-card p-5">
                <div className="text-3xl font-black text-primary">{s.value}</div>
                <div className="mt-1 text-xs font-medium text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="mx-auto max-w-5xl px-4 pb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {SKILLS.map((s) => (
              <span
                key={s.label}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-2 text-sm font-medium"
              >
                <s.icon className="h-4 w-4 text-primary" />
                {s.label}
              </span>
            ))}
          </div>
        </section>

        {/* Design work */}
        <section className="mx-auto max-w-6xl px-4">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Design Work</h2>
            <a
              href="https://dribbble.com/deepak1605"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              View all on Dribbble
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {SHOTS.map((shot, i) => (
              <ShotCard key={shot.id} shot={shot} index={i} />
            ))}
          </div>
        </section>

        {/* CodeSpanda templates CTA */}
        <section className="mx-auto mt-20 max-w-3xl px-4 text-center">
          <div className="rounded-3xl border border-border bg-card p-10 shadow-sm">
            <h2 className="text-2xl font-bold">React Templates by Deepak</h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
              Designs brought to life as free, production-ready React templates. Browse all CodeSpanda templates built from these UI concepts.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button variant="gradient" asChild>
                <a href="/templates">Browse Templates</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="mailto:contact@codespanda.com">Get in Touch</a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Suspense fallback={<div className="h-72 animate-pulse bg-secondary/30" />}>
        <Footer />
      </Suspense>
    </>
  );
}
