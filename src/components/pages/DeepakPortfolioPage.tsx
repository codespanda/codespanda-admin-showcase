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
  imgUrl: string;
}

const SHOTS: Shot[] = [
  {
    id: "homefinder",
    title: "HomeFinder – Real Estate App UI",
    category: "Mobile App",
    tags: ["Real Estate", "Mobile", "iOS"],
    dribbbleUrl: "https://dribbble.com/shots/27570937-HomeFinder-Real-Estate-App-UI",
    imgUrl: "https://cdn.dribbble.com/userupload/48428945/file/007a381ab43254d9a40ffde8369916a5.png?format=webp&resize=400x300&vertical=center",
  },
  {
    id: "taxi",
    title: "Taxi Booking App – Modern Ride-Hailing UI",
    category: "Mobile App",
    tags: ["Transport", "Mobile", "Maps"],
    dribbbleUrl: "https://dribbble.com/shots/27570927-Taxi-Booking-App-Modern-Ride-Hailing-UI",
    imgUrl: "https://cdn.dribbble.com/userupload/48428915/file/562e4d15b7907764481ed5a363bd31f5.png?format=webp&resize=400x300&vertical=center",
  },
  {
    id: "music",
    title: "Music Streaming App – Premium Mobile UI",
    category: "Mobile App",
    tags: ["Music", "Streaming", "Mobile"],
    dribbbleUrl: "https://dribbble.com/shots/27570919-Music-Streaming-App-Premium-Mobile-UI-Design",
    imgUrl: "https://cdn.dribbble.com/userupload/48428887/file/32c7e194726aa5f05a714a769d63e5b7.png?format=webp&resize=400x300&vertical=center",
  },
  {
    id: "medicare",
    title: "Medicare Clinic App – Healthcare Mobile UI",
    category: "Mobile App",
    tags: ["Healthcare", "Mobile", "Clinic"],
    dribbbleUrl: "https://dribbble.com/shots/27570916-Medicare-Clinic-App-Healthcare-Mobile-UI",
    imgUrl: "https://cdn.dribbble.com/userupload/48428873/file/08dc80fd09d37bab9005fa432f0b4cbf.png?format=webp&resize=400x300&vertical=center",
  },
  {
    id: "carwash",
    title: "Car Wash App – Premium Mobile UI Design",
    category: "Mobile App",
    tags: ["Automotive", "Mobile", "Services"],
    dribbbleUrl: "https://dribbble.com/shots/27570910-Car-Wash-App-Premium-Mobile-UI-Design",
    imgUrl: "https://cdn.dribbble.com/userupload/48428855/file/38417a4205c335711f45b5d6dadc0906.png?format=webp&resize=400x300&vertical=center",
  },
  {
    id: "kids-learning",
    title: "Kids Learning App – Fun & Interactive Education UI",
    category: "Mobile App",
    tags: ["Education", "Kids", "Mobile"],
    dribbbleUrl: "https://dribbble.com/shots/27570908-Kids-Learning-App-Fun-Interactive-Education-UI",
    imgUrl: "https://cdn.dribbble.com/userupload/48428848/file/ad536a86275f4a7c8e06d9a264795070.png?format=webp&resize=400x300&vertical=center",
  },
  {
    id: "nexora-crm",
    title: "Nexora CRM – Customer Relationship Management Dashboard",
    category: "Web Dashboard",
    tags: ["CRM", "Dashboard", "SaaS"],
    dribbbleUrl: "https://dribbble.com/shots/27570895-Nexora-CRM-Modern-Customer-Relationship-Management-Dashboard",
    imgUrl: "https://cdn.dribbble.com/userupload/48428809/file/dd59ecd16de5b38a04913ae3e3a41d84.png?format=webp&resize=400x300&vertical=center",
  },
  {
    id: "nexora-admin",
    title: "Nexora – Modern Admin Dashboard UI",
    category: "Web Dashboard",
    tags: ["Admin", "Dashboard", "Web"],
    dribbbleUrl: "https://dribbble.com/shots/27570880-Nexora-Modern-Admin-Dashboard-UI",
    imgUrl: "https://cdn.dribbble.com/userupload/48428771/file/b8a48af6185f892a43f98727c988c171.png?format=webp&resize=400x300&vertical=center",
  },
  {
    id: "interior",
    title: "Interior Decoration Mobile App UI",
    category: "Mobile App",
    tags: ["Interior", "Lifestyle", "Mobile"],
    dribbbleUrl: "https://dribbble.com/shots/27561784-Interior-Decoration-Mobile-App-UI",
    imgUrl: "https://cdn.dribbble.com/userupload/48395766/file/ddcadd8b0251dcc24a0c806af4add348.png?format=webp&resize=400x300&vertical=center",
  },
  {
    id: "ebooks",
    title: "eBooks App UI Design",
    category: "Mobile App",
    tags: ["Books", "Reading", "Mobile"],
    dribbbleUrl: "https://dribbble.com/shots/27561762-eBooks-App-UI-Design",
    imgUrl: "https://cdn.dribbble.com/userupload/48395665/file/2280d34aae0d94ad41842ea56195dff6.png?crop=0x0-1448x1086&format=webp&resize=400x300&vertical=center",
  },
  {
    id: "school",
    title: "Modern School Management System UI",
    category: "Web Dashboard",
    tags: ["Education", "ERP", "Dashboard"],
    dribbbleUrl: "https://dribbble.com/shots/27561743-Modern-School-Management-System-UI",
    imgUrl: "https://cdn.dribbble.com/userupload/48395620/file/086413a064eeecc3df96c0de6dce7aeb.png?crop=1x0-1366x1024&format=webp&resize=400x300&vertical=center",
  },
  {
    id: "hairaura",
    title: "HairAura — Hair Salon Mobile App UI",
    category: "Mobile App",
    tags: ["Beauty", "Salon", "Booking"],
    dribbbleUrl: "https://dribbble.com/shots/27558538-HairAura-Hair-Salon-Mobile-App-UI-Design",
    imgUrl: "https://cdn.dribbble.com/userupload/48384064/file/3ea40e0302256ac0e76ddbd4b75ef161.png?format=webp&resize=400x300&vertical=center",
  },
  {
    id: "harmony",
    title: "Harmony — Music Streaming Mobile App UI",
    category: "Mobile App",
    tags: ["Music", "Streaming", "Dark UI"],
    dribbbleUrl: "https://dribbble.com/shots/27558401-Harmony-Music-Streaming-Mobile-App-UI-Design",
    imgUrl: "https://cdn.dribbble.com/userupload/48383665/file/0905ac32058bb8c3b8720d030b0e8793.png?crop=76x25-1364x990&format=webp&resize=400x300&vertical=center",
  },
  {
    id: "foodiego",
    title: "FoodieGo – Food Delivery Mobile App UI",
    category: "Mobile App",
    tags: ["Food", "Delivery", "Mobile"],
    dribbbleUrl: "https://dribbble.com/shots/27558165-FoodieGo-Food-Delivery-Mobile-App-UI",
    imgUrl: "https://cdn.dribbble.com/userupload/48382845/file/5d0fa90b32817e57c87ba0e296221ef7.png?crop=5x0-1371x1024&format=webp&resize=400x300&vertical=center",
  },
  {
    id: "beauty",
    title: "Beauty – Skincare & Cosmetics Mobile App UI",
    category: "Mobile App",
    tags: ["Beauty", "eCommerce", "Mobile"],
    dribbbleUrl: "https://dribbble.com/shots/27558126-Beauty-Skincare-Cosmetics-Mobile-App-UI",
    imgUrl: "https://cdn.dribbble.com/userupload/48382647/file/df8f648a9b58daf5bec3672d81da93ca.png?crop=1x55-1219x969&format=webp&resize=400x300&vertical=center",
  },
  {
    id: "waygo",
    title: "WayGo – Smart Car Travel & Road Trip App UI",
    category: "Mobile App",
    tags: ["Travel", "Maps", "Mobile"],
    dribbbleUrl: "https://dribbble.com/shots/27558077-WayGo-Smart-Car-Travel-Road-Trip-App-UI",
    imgUrl: "https://cdn.dribbble.com/userupload/48382527/file/24e2135e2ef0b106f03dcce61b92e4bb.png?format=webp&resize=400x300&vertical=center",
  },
  {
    id: "lumiere",
    title: "Lumière – Luxury Jewellery Shopping App UI",
    category: "Mobile App",
    tags: ["Luxury", "eCommerce", "Mobile"],
    dribbbleUrl: "https://dribbble.com/shots/27558047-Lumi-re-Luxury-Jewellery-Shopping-App-UI",
    imgUrl: "https://cdn.dribbble.com/userupload/48382450/file/d2d97e5fd0fccbfa83a13006ef8bdadb.png?format=webp&resize=400x300&vertical=center",
  },
  {
    id: "nutrifit",
    title: "NutriFit – Healthy Products Marketplace & Nutrition App",
    category: "Mobile App",
    tags: ["Health", "Marketplace", "Mobile"],
    dribbbleUrl: "https://dribbble.com/shots/27558023-NutriFit-Healthy-Products-Marketplace-Nutrition-App",
    imgUrl: "https://cdn.dribbble.com/userupload/48382383/file/95f4d46958f18967169881d0c35b8f7f.png?crop=0x0-1448x1086&format=webp&resize=400x300&vertical=center",
  },
  {
    id: "cornerstone-concept",
    title: "Cornerstone — Modern SaaS Landing Page Concept",
    category: "Web Design",
    tags: ["SaaS", "Landing Page", "Web"],
    dribbbleUrl: "https://dribbble.com/shots/27555844-Cornerstone-Modern-SaaS-Landing-Page-Concept",
    imgUrl: "https://cdn.dribbble.com/userupload/48374252/file/ab74d5a0b6603db80b317f093d387282.png?crop=4x3-2660x1995&format=webp&resize=400x300&vertical=center",
  },
  {
    id: "jewellery-pos",
    title: "Luxury Jewellery POS System UI",
    category: "Web Dashboard",
    tags: ["POS", "Retail", "Luxury"],
    dribbbleUrl: "https://dribbble.com/shots/27549892-Luxury-Jewellery-POS-System-UI",
    imgUrl: "https://cdn.dribbble.com/userupload/48352741/file/d793edb97b0e4e9f9cdff79e7af38b2d.png?crop=215x48-1280x847&format=webp&resize=400x300&vertical=center",
  },
  {
    id: "cafe-pos",
    title: "Modern Cafe POS Dashboard UI",
    category: "Web Dashboard",
    tags: ["POS", "Cafe", "Dashboard"],
    dribbbleUrl: "https://dribbble.com/shots/27549817-Modern-Cafe-POS-Dashboard-UI",
    imgUrl: "https://cdn.dribbble.com/userupload/48352510/file/80981154068851e0919cf9d4c043c787.png?crop=228x144-1198x872&format=webp&resize=400x300&vertical=center",
  },
  {
    id: "posymart",
    title: "PosyMart – Modern Cafe POS Dashboard UI",
    category: "Web Dashboard",
    tags: ["POS", "Retail", "Dashboard"],
    dribbbleUrl: "https://dribbble.com/shots/27548893-PosyMart-Modern-Cafe-POS-Dashboard-UI",
    imgUrl: "https://cdn.dribbble.com/userupload/48348854/file/1ca69ebd22c0a91c3feca98e7dd5dccf.png?format=webp&resize=400x300&vertical=center",
  },
  {
    id: "ecommerce-admin",
    title: "Modern E-commerce Admin Dashboard UI",
    category: "Web Dashboard",
    tags: ["eCommerce", "Admin", "Dashboard"],
    dribbbleUrl: "https://dribbble.com/shots/27547992-Modern-E-commerce-Admin-Dashboard-UI",
    imgUrl: "https://cdn.dribbble.com/userupload/48345043/file/6cd58e618bd997f5ddd81ee1ed9a1505.png?crop=1x4-1611x1212&format=webp&resize=400x300&vertical=center",
  },
  {
    id: "greenerp",
    title: "GreenERP – Modern ERP Dashboard | Finance & Business Management",
    category: "Web Dashboard",
    tags: ["ERP", "Finance", "Dashboard"],
    dribbbleUrl: "https://dribbble.com/shots/27547980-GreenERP-Modern-ERP-Dashboard-Finance-Business-Management",
    imgUrl: "https://cdn.dribbble.com/userupload/48345009/file/2549f699604211aa243470251f05faa1.png?crop=2x2-1833x1375&format=webp&resize=400x300&vertical=center",
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

const LINKEDIN_URL = "https://www.linkedin.com/company/codespanda";

/* ------------------------------------------------------------------ */
/* Shot card with real Dribbble thumbnail                              */
/* ------------------------------------------------------------------ */
function ShotCard({ shot, index }: { shot: Shot; index: number }) {
  return (
    <a
      href={shot.dribbbleUrl}
      target="_blank"
      rel="noreferrer noopener"
      className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1"
    >
      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden bg-secondary/30">
        <img
          src={shot.imgUrl}
          alt={shot.title}
          loading={index < 8 ? "eager" : "lazy"}
          decoding="async"
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gradient-to-t from-black/50 to-transparent">
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
              LINKEDIN_URL,
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
              <a href={LINKEDIN_URL} target="_blank" rel="noreferrer noopener">
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
