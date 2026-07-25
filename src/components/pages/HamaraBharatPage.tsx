import { lazy, Suspense, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Reveal, StaggerItem, Stagger } from "@/components/shared/Reveal";
import {
  ExternalLink, ArrowLeft, Star, Github, Monitor,
  CheckCircle2, Palette, Smartphone, Zap, Layers, MapPin,
  CalendarDays, Utensils, Hotel, Landmark, Map, Film, Image,
  Clock, Tag, Sun, Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/sections/Navbar";

const Footer = lazy(() =>
  import("@/components/sections/Footer").then((m) => ({ default: m.Footer }))
);

const GITHUB_URL  = "https://github.com/codespanda/hamara-bharat";
const PREVIEW_URL = "https://hamarabharat.codespanda.com/";

const GALLERY = [
  { src: "/images/hamarabharat/hero.png",              label: "Hero — Cinematic Slideshow" },
  { src: "/images/hamarabharat/trip-planner.png",      label: "Trip Planner" },
  { src: "/images/hamarabharat/india-map.png",         label: "Interactive India Map" },
  { src: "/images/hamarabharat/experiences.png",       label: "Experiences" },
  { src: "/images/hamarabharat/unesco.png",            label: "UNESCO Heritage Sites" },
  { src: "/images/hamarabharat/itinerary-builder.png", label: "Itinerary Builder" },
  { src: "/images/hamarabharat/festivals.png",         label: "Festivals & Culture" },
  { src: "/images/hamarabharat/hotels.png",            label: "Hotels" },
  { src: "/images/hamarabharat/food-trails.png",       label: "Food Trails" },
  { src: "/images/hamarabharat/cinematic-videos.png",  label: "Cinematic Videos" },
  { src: "/images/hamarabharat/gallery.png",           label: "Photo Gallery" },
  { src: "/images/hamarabharat/best-time.png",         label: "Best Time to Visit" },
  { src: "/images/hamarabharat/visa-info.png",         label: "Visa & Travel Info" },
];

const SECTIONS = [
  { icon: Film,         label: "Cinematic Hero",        desc: "Full-viewport auto-advancing slideshow of India's iconic destinations with Ken Burns parallax.",           status: "Live" },
  { icon: Zap,          label: "Trip Planner",           desc: "Interactive wizard — pick budget, duration and interests to generate a personalised itinerary.",           status: "Live" },
  { icon: Map,          label: "Interactive India Map",  desc: "SVG clickable state map: hover reveals state highlights; click opens a destination detail card.",          status: "Live" },
  { icon: Globe,        label: "Experiences",            desc: "Curated grid of travel categories — Adventure, Culture, Beaches, Wildlife, Spiritual, Food, Luxury.",       status: "Live" },
  { icon: Landmark,     label: "UNESCO Heritage",        desc: "Cards for India's UNESCO World Heritage Sites with imagery, description and location tags.",                status: "Live" },
  { icon: CalendarDays, label: "Itinerary Builder",      desc: "Day-by-day planner with draggable timeline, activity cards and exportable schedule.",                      status: "Live" },
  { icon: Star,         label: "Festivals & Culture",    desc: "Seasonal festival showcase with date, region and cultural significance for each celebration.",              status: "Live" },
  { icon: Hotel,        label: "Hotels",                 desc: "Curated property cards with amenities, price tier, rating and quick-book CTA.",                            status: "Live" },
  { icon: Utensils,     label: "Food Trails",            desc: "Regional cuisine explorer — dishes, flavour profiles and where to find them across India.",                 status: "Live" },
  { icon: Film,         label: "Cinematic Videos",       desc: "Embedded highlight reels arranged in a responsive masonry-style video wall.",                              status: "Live" },
  { icon: Image,        label: "Photo Gallery",          desc: "Masonry photo grid with lightbox and category filters — landscapes, monuments, people, food.",              status: "Live" },
  { icon: Sun,          label: "Best Time to Visit",     desc: "Month-by-month weather and event calendar to help travellers pick the ideal window.",                      status: "Live" },
  { icon: MapPin,       label: "Visa & Travel Info",     desc: "e-Visa eligibility, entry requirements and helpful travel tips for international visitors.",                status: "Live" },
];

const FEATURES = [
  { icon: Film,      title: "Cinematic Animations",  desc: "Framer Motion throughout — parallax hero, staggered reveals, smooth page transitions and micro-interactions." },
  { icon: Map,       title: "Interactive SVG Map",   desc: "A hand-crafted clickable SVG map of India — each state is individually selectable with hover states." },
  { icon: Zap,       title: "Trip Planner Widget",   desc: "Budget, duration and interest selectors generate a tailored itinerary on the fly." },
  { icon: Palette,   title: "Saffron Design System", desc: "Warm saffron, violet and amber palette with custom CSS tokens and a display font — deeply culturally rooted." },
  { icon: Smartphone, title: "Mobile-First Layout",  desc: "Every section adapts gracefully from 320 px to 4K — hero, map, galleries and video walls all responsive." },
  { icon: Layers,    title: "13 Rich Sections",      desc: "A complete travel-landing experience: hero, planner, map, experiences, UNESCO, festivals, food, hotels, gallery and more." },
];

const STATUS_STYLES: Record<string, string> = {
  Live: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  Soon: "bg-amber-500/10  text-amber-600  dark:text-amber-400  border-amber-500/20",
};

const TECH = [
  { name: "React",          color: "bg-cyan-500/10    text-cyan-600    dark:text-cyan-400"    },
  { name: "Vite",           color: "bg-violet-500/10  text-violet-600  dark:text-violet-400"  },
  { name: "TypeScript",     color: "bg-blue-500/10    text-blue-600    dark:text-blue-400"    },
  { name: "Tailwind CSS v4", color: "bg-sky-500/10    text-sky-600     dark:text-sky-400"    },
  { name: "Framer Motion",  color: "bg-pink-500/10    text-pink-600    dark:text-pink-400"    },
  { name: "radix-ui",       color: "bg-orange-500/10  text-orange-600  dark:text-orange-400"  },
];

const FAQ = [
  {
    q: "Can I use Hamara Bharat for a commercial travel website?",
    a: "Yes — it's MIT licensed. Use it for client work, white-labelled travel portals, SaaS products, or any commercial project with no attribution required.",
  },
  {
    q: "Does it work for destinations outside India?",
    a: "Absolutely. The sections (hero, trip planner, experiences, gallery, food trails, hotels) are all data-driven. Swap the destination data files and it adapts to any country or region.",
  },
  {
    q: "Is there a real backend or API?",
    a: "No — it's a UI-only template. All data lives in static TypeScript fixture files under src/data/. The trip planner generates mock itineraries client-side. Wiring in a real API is left to you.",
  },
  {
    q: "Why Tailwind CSS v4?",
    a: "Hamara Bharat is built on Tailwind v4 (CSS-first config) and Vite — both bleeding-edge. If you need v3 compatibility, a quick find-replace on the CSS custom properties will get you there.",
  },
];

const STEPS = [
  { step: "01", title: "Clone the repo",       code: "git clone https://github.com/codespanda/hamara-bharat.git" },
  { step: "02", title: "Install dependencies", code: "npm install" },
  { step: "03", title: "Start the dev server", code: "npm run dev" },
  { step: "04", title: "Open in browser",      code: "http://localhost:5173/" },
];

function GalleryImage({ src, label }: { src: string; label: string }) {
  return (
    <Reveal className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-md hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300">
      <div className="relative overflow-hidden" style={{ paddingBottom: "62.5%" }}>
        <img
          src={src}
          alt={`Hamara Bharat — ${label}`}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className="absolute bottom-3 left-3 text-sm font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {label}
        </span>
      </div>
      <p className="px-4 py-3 text-sm font-medium text-muted-foreground">{label}</p>
    </Reveal>
  );
}

export function HamaraBharatPage() {
  useEffect(() => {
    document.documentElement.dataset.template = "hamarabharat";
    return () => { delete document.documentElement.dataset.template; };
  }, []);

  return (
    <>
      <Helmet>
        <title>Hamara Bharat — Free React Travel Template | CodeSpanda</title>
        <meta name="description" content="Hamara Bharat is a free React travel landing page template for India tourism — cinematic hero, interactive map, trip planner, festivals and food trails." />
        <meta name="keywords" content="react travel landing page template, free react tourism website, india travel template, tailwind css travel template, framer motion react template, vite travel website" />
        <link rel="canonical" href="https://codespanda.com/templates/hamara-bharat" />
        <meta property="og:title" content="Hamara Bharat — Free React Travel Landing Page Template | CodeSpanda" />
        <meta property="og:description" content="A cinematic React travel landing page for India tourism — interactive map, trip planner, festivals, food trails, photo gallery and 13 rich sections." />
        <meta property="og:url" content="https://codespanda.com/templates/hamara-bharat" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://codespanda.com/images/hamarabharat/hero.png" />
        <meta property="og:image:width" content="1440" />
        <meta property="og:image:height" content="900" />
        <meta property="og:image:alt" content="Hamara Bharat cinematic hero — free React travel landing page template" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hamara Bharat — Free React Travel Landing Page Template | CodeSpanda" />
        <meta name="twitter:description" content="A cinematic React travel landing page for India tourism — interactive map, trip planner, festivals, food trails, photo gallery and 13 rich sections." />
        <meta name="twitter:image" content="https://codespanda.com/images/hamarabharat/hero.png" />
        <meta name="twitter:image:alt" content="Hamara Bharat cinematic hero — free React travel landing page template" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "Hamara Bharat",
          "description": "A free React travel landing page template for India tourism with cinematic hero, interactive SVG map, trip planner, festivals, food trails and photo gallery.",
          "url": "https://codespanda.com/templates/hamara-bharat",
          "image": "https://codespanda.com/images/hamarabharat/hero.png",
          "brand": { "@type": "Brand", "name": "CodeSpanda" },
          "category": "Software > Templates > Landing Page",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/InStock" },
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": FAQ.map((item) => ({
            "@type": "Question",
            "name": item.q,
            "acceptedAnswer": { "@type": "Answer", "text": item.a },
          })),
        })}</script>
      </Helmet>

      <Navbar />

      <main className="pt-24">
        {/* Breadcrumb */}
        <div className="mx-auto max-w-6xl px-4 pb-2">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to templates
          </Link>
        </div>

        {/* Hero */}
        <section className="mx-auto max-w-6xl px-4 py-10">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
            <div className="flex-1">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-3 py-1 text-xs font-semibold text-white shadow">
                  New
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
                  Travel / Tourism Landing Page
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-3 w-3" /> Free
                </span>
              </div>

              <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                Hamara{" "}
                <span className="bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">
                  Bharat
                </span>
                <span className="block text-base font-medium text-muted-foreground mt-1.5">Free React Travel Landing Page Template</span>
              </h1>

              <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
                A <strong className="font-semibold text-foreground">cinematic travel landing page</strong> for India tourism — featuring an animated hero slideshow, clickable SVG state map, trip planner wizard, UNESCO heritage showcase, festival calendar, food trails, hotel cards and a masonry photo gallery across <strong className="font-semibold text-foreground">13 production-ready sections</strong>.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="ml-1 font-medium">5.0</span>
                </div>
                <span className="text-muted-foreground">·</span>
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Tag className="h-3.5 w-3.5" /> MIT License
                </span>
                <span className="text-muted-foreground">·</span>
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" /> Updated July 2026
                </span>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button variant="gradient" size="lg" asChild>
                  <a href={PREVIEW_URL} target="_blank" rel="noreferrer noopener">
                    <ExternalLink className="h-4 w-4" /> Live Preview
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href={GITHUB_URL} target="_blank" rel="noreferrer noopener">
                    <Github className="h-4 w-4" /> View on GitHub
                  </a>
                </Button>
              </div>
            </div>

            {/* Hero image */}
            <Reveal className="relative flex-1 lg:max-w-xl">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-orange-500/20 to-amber-400/10 blur-2xl" />
              <div className="relative overflow-hidden rounded-2xl border border-border shadow-2xl shadow-orange-500/10 ring-1 ring-orange-500/10">
                <img
                  src="/images/hamarabharat/hero.png"
                  alt="Hamara Bharat — cinematic hero preview"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="w-full object-cover object-top"
                />
                <div className="absolute top-0 left-0 right-0 flex items-center gap-1.5 bg-black/40 px-3 py-2 backdrop-blur-sm">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                  <span className="ml-3 flex-1 rounded bg-white/10 px-2 py-0.5 text-[10px] text-white/60">
                    hamarabharat.codespanda.com
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Overview */}
        <section className="border-y border-border bg-secondary/20 px-4 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <h2 className="text-2xl font-bold">What is Hamara Bharat?</h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  Hamara Bharat is a free, open-source <strong className="font-medium text-foreground">React travel landing page template</strong> built around India's extraordinary diversity — snowy Himalayan peaks, golden desert dunes, sacred river ghats and tropical backwaters. It packs 13 beautifully animated sections into a single-page experience: an auto-advancing cinematic hero, interactive SVG map of every Indian state, a trip planner wizard, UNESCO site showcase, seasonal festival calendar, regional food trails, hotel cards, a video wall and a masonry photo gallery.
                </p>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  Built with Tailwind CSS v4 and Framer Motion, every section transitions with cinematic polish. It's a complete foundation for any travel, tourism or destination marketing website — adaptable to any country by swapping the data files.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-bold">Who is it for?</h2>
                <ul className="mt-4 space-y-3">
                  {[
                    "Developers building travel or tourism websites for clients",
                    "Agencies creating destination marketing portals",
                    "Startups launching a travel booking or trip-planning SaaS",
                    "Freelancers wanting a polished, animated free starter",
                    "Teams building regional tourism or cultural heritage platforms",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="px-4 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 text-center">
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-orange-500">Gallery</p>
              <h2 className="text-3xl font-bold">See it in action</h2>
              <p className="mt-3 text-muted-foreground">A tour through all 13 sections — each one production-ready and fully responsive.</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {GALLERY.map((img) => (
                <GalleryImage key={img.label} src={img.src} label={img.label} />
              ))}
            </div>
            <div className="mt-8 text-center">
              <Button className="border border-orange-500/40 bg-orange-500/10 text-orange-600 hover:bg-orange-500/20 dark:text-orange-400" asChild>
                <a href={PREVIEW_URL} target="_blank" rel="noreferrer noopener">
                  <Monitor className="h-4 w-4" /> Explore live
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="border-y border-border bg-secondary/20 px-4 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-orange-500">Why Hamara Bharat</p>
              <h2 className="text-3xl font-bold">Built for cinematic travel experiences</h2>
            </div>
            <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((f) => (
                <StaggerItem key={f.title} className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10">
                    <f.icon className="h-5 w-5 text-orange-500" />
                  </div>
                  <h3 className="font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* Sections / Modules */}
        <section className="px-4 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-orange-500">What's included</p>
              <h2 className="text-3xl font-bold">{SECTIONS.length} fully built sections</h2>
              <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
                Every section ships with working layouts, rich mock content, and smooth Framer Motion animations.
              </p>
            </div>
            <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {SECTIONS.map((s) => (
                <StaggerItem key={s.label} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/10">
                    <s.icon className="h-5 w-5 text-orange-500" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{s.label}</span>
                      <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold ${STATUS_STYLES[s.status]}`}>
                        {s.status}
                      </span>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="border-y border-border bg-secondary/20 px-4 py-20">
          <div className="mx-auto max-w-6xl text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-orange-500">Tech Stack</p>
            <h2 className="text-3xl font-bold">Built with modern tools</h2>
            <Stagger className="mt-10 flex flex-wrap justify-center gap-3">
              {TECH.map((t) => (
                <StaggerItem key={t.name}>
                  <span className={`inline-flex items-center rounded-full border px-4 py-2 text-sm font-semibold ${t.color}`}>
                    {t.name}
                  </span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* Quick Start */}
        <section className="px-4 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-orange-500">Get Started</p>
              <h2 className="text-3xl font-bold">Running in 2 minutes</h2>
              <p className="mt-3 text-muted-foreground">Node.js 18+ required. No paid tools, no account sign-ups.</p>
            </div>
            <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((s) => (
                <StaggerItem key={s.step} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <span className="text-sm font-bold text-orange-500">{s.step}</span>
                  <p className="mt-2 font-semibold">{s.title}</p>
                  <code className="mt-3 block overflow-x-auto rounded-lg bg-secondary px-3 py-2 text-xs text-muted-foreground">
                    {s.code}
                  </code>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-y border-border bg-secondary/20 px-4 py-20">
          <div className="mx-auto max-w-3xl">
            <div className="mb-12 text-center">
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-orange-500">FAQ</p>
              <h2 className="text-3xl font-bold">Common questions</h2>
            </div>
            <div className="divide-y divide-border">
              {FAQ.map((item) => (
                <div key={item.q} className="py-6">
                  <h3 className="font-semibold text-foreground">{item.q}</h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 pb-24">
          <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 to-amber-400 p-12 text-center text-white shadow-2xl shadow-orange-500/30">
            <h2 className="text-3xl font-extrabold">Ready to explore?</h2>
            <p className="mt-3 text-orange-100">
              Hamara Bharat is completely free and open-source. Clone it, make it yours, and ship it.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50" asChild>
                <a href={PREVIEW_URL} target="_blank" rel="noreferrer noopener">
                  <ExternalLink className="h-4 w-4" /> Live Preview
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                <a href={GITHUB_URL} target="_blank" rel="noreferrer noopener">
                  <Github className="h-4 w-4" /> Star on GitHub
                </a>
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
