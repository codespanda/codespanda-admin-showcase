import { Helmet } from "react-helmet-async";
import { TemplateDetail } from "@/components/site/TemplateDetail";
import { faqJsonLd, type FaqItem } from "@/components/site/FaqSection";

const SCREENS = [
  {
    "src": "/images/hamarabharat/hero.webp",
    "label": "Hero — Cinematic Slideshow"
  },
  {
    "src": "/images/hamarabharat/trip-planner.webp",
    "label": "Trip Planner"
  },
  {
    "src": "/images/hamarabharat/india-map.webp",
    "label": "Interactive India Map"
  },
  {
    "src": "/images/hamarabharat/experiences.webp",
    "label": "Experiences"
  },
  {
    "src": "/images/hamarabharat/unesco.webp",
    "label": "UNESCO Heritage Sites"
  },
  {
    "src": "/images/hamarabharat/itinerary-builder.webp",
    "label": "Itinerary Builder"
  },
  {
    "src": "/images/hamarabharat/festivals.webp",
    "label": "Festivals & Culture"
  },
  {
    "src": "/images/hamarabharat/hotels.webp",
    "label": "Hotels"
  },
  {
    "src": "/images/hamarabharat/food-trails.webp",
    "label": "Food Trails"
  },
  {
    "src": "/images/hamarabharat/cinematic-videos.webp",
    "label": "Cinematic Videos"
  },
  {
    "src": "/images/hamarabharat/gallery.webp",
    "label": "Photo Gallery"
  },
  {
    "src": "/images/hamarabharat/best-time.webp",
    "label": "Best Time to Visit"
  },
  {
    "src": "/images/hamarabharat/visa-info.webp",
    "label": "Visa & Travel Info"
  }
];

const INSIDE = [
  {
    "label": "Cinematic Hero",
    "desc": "Full-viewport auto-advancing slideshow of India's iconic destinations with Ken Burns parallax."
  },
  {
    "label": "Trip Planner",
    "desc": "Interactive wizard — pick budget, duration and interests to generate a personalised itinerary."
  },
  {
    "label": "Interactive India Map",
    "desc": "SVG clickable state map: hover reveals state highlights; click opens a destination detail card."
  },
  {
    "label": "Experiences",
    "desc": "Curated grid of travel categories — Adventure, Culture, Beaches, Wildlife, Spiritual, Food, Luxury."
  },
  {
    "label": "UNESCO Heritage",
    "desc": "Cards for India's UNESCO World Heritage Sites with imagery, description and location tags."
  },
  {
    "label": "Itinerary Builder",
    "desc": "Day-by-day planner with draggable timeline, activity cards and exportable schedule."
  },
  {
    "label": "Festivals & Culture",
    "desc": "Seasonal festival showcase with date, region and cultural significance for each celebration."
  },
  {
    "label": "Hotels",
    "desc": "Curated property cards with amenities, price tier, rating and quick-book CTA."
  },
  {
    "label": "Food Trails",
    "desc": "Regional cuisine explorer — dishes, flavour profiles and where to find them across India."
  },
  {
    "label": "Cinematic Videos",
    "desc": "Embedded highlight reels arranged in a responsive masonry-style video wall."
  },
  {
    "label": "Photo Gallery",
    "desc": "Masonry photo grid with lightbox and category filters — landscapes, monuments, people, food."
  },
  {
    "label": "Best Time to Visit",
    "desc": "Month-by-month weather and event calendar to help travellers pick the ideal window."
  },
  {
    "label": "Visa & Travel Info",
    "desc": "e-Visa eligibility, entry requirements and helpful travel tips for international visitors."
  }
];

const FAQ: FaqItem[] = [
  {
    "q": "Can I use Hamara Bharat for a commercial travel website?",
    "a": "Yes — it's MIT licensed. Use it for client work, white-labelled travel portals, SaaS products, or any commercial project with no attribution required."
  },
  {
    "q": "Does it work for destinations outside India?",
    "a": "Absolutely. The sections (hero, trip planner, experiences, gallery, food trails, hotels) are all data-driven. Swap the destination data files and it adapts to any country or region."
  },
  {
    "q": "Is there a real backend or API?",
    "a": "No — it's a UI-only template. All data lives in static TypeScript fixture files under src/data/. The trip planner generates mock itineraries client-side. Wiring in a real API is left to you."
  },
  {
    "q": "Why Tailwind CSS v4?",
    "a": "Hamara Bharat is built on Tailwind v4 (CSS-first config) and Vite — both bleeding-edge. If you need v3 compatibility, a quick find-replace on the CSS custom properties will get you there."
  }
];

export function HamaraBharatPage() {
  return (
    <>
      <Helmet>
        <title>Hamara Bharat — Travel Landing Page Template | CodesPanda</title>
        <meta name="description" content="Hamara Bharat is a free React travel landing page template for India tourism — cinematic hero, interactive map, trip planner, festivals and food trails." />
        <meta name="keywords" content="react travel landing page template, free react tourism website, india travel template, tailwind css travel template, framer motion react template, vite travel website" />
        <link rel="canonical" href="https://codespanda.com/templates/hamara-bharat" />
        <meta property="og:title" content="Hamara Bharat — Travel Landing Page Template | CodesPanda" />
        <meta property="og:description" content="A cinematic React travel landing page for India tourism — interactive map, trip planner, festivals, food trails, photo gallery and 13 rich sections." />
        <meta property="og:url" content="https://codespanda.com/templates/hamara-bharat" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://codespanda.com/images/hamarabharat/hero.webp" />
        <meta property="og:image:width" content="1440" />
        <meta property="og:image:height" content="900" />
        <meta property="og:image:alt" content="Hamara Bharat cinematic hero — free React travel landing page template" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hamara Bharat — Travel Landing Page Template | CodesPanda" />
        <meta name="twitter:description" content="A cinematic React travel landing page for India tourism — interactive map, trip planner, festivals, food trails, photo gallery and 13 rich sections." />
        <meta name="twitter:image" content="https://codespanda.com/images/hamarabharat/hero.webp" />
        <meta name="twitter:image:alt" content="Hamara Bharat cinematic hero — free React travel landing page template" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "Hamara Bharat",
          "description": "A free React travel landing page template for India tourism with cinematic hero, interactive SVG map, trip planner, festivals, food trails and photo gallery.",
          "url": "https://codespanda.com/templates/hamara-bharat",
          "image": "https://codespanda.com/images/hamarabharat/hero.webp",
          "brand": { "@type": "Brand", "name": "CodesPanda" },
          "category": "Software > Templates > Landing Page",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/InStock" },
        })}</script>
        <script type="application/ld+json">{faqJsonLd(FAQ)}</script>
      </Helmet>

      <TemplateDetail
        id="hamara-bharat"
        githubUrl="https://github.com/codespanda/hamara-bharat"
        updated="July 2026"
        screens={SCREENS}
        inside={INSIDE}
        faq={FAQ}
      />
    </>
  );
}
