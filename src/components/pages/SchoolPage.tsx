import { Helmet } from "react-helmet-async";
import { TemplateDetail } from "@/components/site/TemplateDetail";
import { faqJsonLd, type FaqItem } from "@/components/site/FaqSection";

const SCREENS: { src: string; label: string }[] = [];

const INSIDE = [
  {
    "label": "Header & Top Bar",
    "desc": "Admissions announcement bar, sticky nav with active-link highlighting, mobile menu."
  },
  {
    "label": "Hero",
    "desc": "Two-column hero with trust badges, CTA pair, and a live stat counter band."
  },
  {
    "label": "About / Welcome",
    "desc": "Mission copy paired with a four-value icon grid."
  },
  {
    "label": "Academics",
    "desc": "Five program cards — Early Years through Senior School and Co-Curricular."
  },
  {
    "label": "Campus & Facilities",
    "desc": "Six-item facility grid — labs, library, sports, transport, and more."
  },
  {
    "label": "Why Parents Choose Us",
    "desc": "Icon-led value list paired with imagery."
  },
  {
    "label": "Testimonials",
    "desc": "Embla-powered parent & student quote carousel."
  },
  {
    "label": "News & Events",
    "desc": "Dated card grid for school announcements and highlights."
  },
  {
    "label": "Admissions CTA",
    "desc": "Closing enquiry band with a clear call to action."
  },
  {
    "label": "Footer",
    "desc": "Sitemap columns, contact details, and social links."
  }
];

const FAQ: FaqItem[] = [
  {
    "q": "Can I use this for a commercial website?",
    "a": "Yes — it's MIT licensed. Use it for client work, your own school's site, or any commercial project, no attribution required."
  },
  {
    "q": "Does it only work for K-12 schools?",
    "a": "Easily adapts to colleges, coaching institutes, and training academies too — the content is data-driven, so swap the copy, program list and facilities grid to match your institution."
  },
  {
    "q": "Is there a real backend or admissions system?",
    "a": "No — it's a UI-only template. The enquiry and admissions CTAs are presentational; wiring them to a real form handler or CRM is left to you."
  },
  {
    "q": "Why Tailwind CSS v4?",
    "a": "The template is built on Tailwind v4's CSS-first configuration and Vite. For v3, a find-and-replace on the CSS-variable tokens in index.css will get you most of the way there."
  }
];

export function SchoolPage() {
  return (
    <>
      <Helmet>
        <title>Gouri International School — Free School Website Template | CodesPanda</title>
        <meta name="description" content="A free React template for schools and educational institutions — academics, campus facilities, admissions, testimonials, and news, in a navy-and-gold design built for trust." />
        <meta name="keywords" content="react school website template, free school landing page, education website react, tailwind css v4 template, shadcn ui react template, school admissions website" />
        <link rel="canonical" href="https://codespanda.com/templates/school" />
        <meta property="og:title" content="Gouri International School — Free School Website Template | CodesPanda" />
        <meta property="og:description" content="A free React template for schools and educational institutions — academics, campus facilities, admissions, testimonials, and news, in a navy-and-gold design." />
        <meta property="og:url" content="https://codespanda.com/templates/school" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://codespanda.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Gouri International School — Free School Website Template | CodesPanda" />
        <meta name="twitter:description" content="A free React template for schools and educational institutions — academics, campus facilities, admissions, testimonials, and news." />
        <meta name="twitter:image" content="https://codespanda.com/og-image.png" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "Gouri International School",
          "description": "A free React template for schools and educational institutions — academics, campus facilities, admissions, testimonials, and news.",
          "url": "https://codespanda.com/templates/school",
          "image": "https://codespanda.com/og-image.png",
          "brand": { "@type": "Brand", "name": "CodesPanda" },
          "category": "Software > Templates > Landing Page",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/InStock" },
        })}</script>
        <script type="application/ld+json">{faqJsonLd(FAQ)}</script>
      </Helmet>

      <TemplateDetail
        id="school"
        githubUrl="https://github.com/codespanda/gouri-international-school"
        updated="September 2026"
        screens={SCREENS}
        inside={INSIDE}
        faq={FAQ}
      />
    </>
  );
}
