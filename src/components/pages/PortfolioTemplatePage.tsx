import { Helmet } from "react-helmet-async";
import { TemplateDetail } from "@/components/site/TemplateDetail";
import { faqJsonLd, type FaqItem } from "@/components/site/FaqSection";

const SCREENS = [
  {
    "src": "/images/portfolio/portfolio.webp",
    "label": "Hero Section"
  },
  {
    "src": "/images/portfolio/about.webp",
    "label": "About Me"
  },
  {
    "src": "/images/portfolio/projects.webp",
    "label": "Projects Showcase"
  },
  {
    "src": "/images/portfolio/skills.webp",
    "label": "Skills & Tech Stack"
  },
  {
    "src": "/images/portfolio/contact.webp",
    "label": "Contact Form"
  },
  {
    "src": "/images/portfolio/footer.webp",
    "label": "Footer"
  }
];

const INSIDE = [
  {
    "label": "Hero",
    "desc": "Animated greeting, tagline, and call-to-action buttons with a profile image."
  },
  {
    "label": "About",
    "desc": "Personal bio, experience timeline, and a downloadable resume link."
  },
  {
    "label": "Projects",
    "desc": "Project cards with tech tags, live demo, and GitHub links."
  },
  {
    "label": "Skills",
    "desc": "Tech stack grid showcasing languages, frameworks, and tools."
  },
  {
    "label": "Contact",
    "desc": "Functional contact form with validation and social media links."
  },
  {
    "label": "Footer",
    "desc": "Clean footer with social links and copyright info."
  }
];

const FAQ: FaqItem[] = [
  {
    "q": "Can I use this template for client work or commercial sites?",
    "a": "Yes. The MIT License covers commercial use. Build your own portfolio, a client's personal site, or a freelancer's landing page — no restrictions."
  },
  {
    "q": "Do I need to know React to customise it?",
    "a": "Basic React familiarity helps for structural changes, but all personalizable content — your name, projects, skills, and social links — lives in a single file: src/data/portfolio.js. If you can edit a JavaScript object, you can make it your own."
  },
  {
    "q": "How do I deploy it?",
    "a": "Run `npm run build` to produce a static dist/ folder, then upload it to GitHub Pages, Vercel, or Netlify. A GitHub Actions workflow for automated Pages deployment is included in the repo."
  },
  {
    "q": "Can I add more sections?",
    "a": "Yes. Each section is a standalone React component in src/components/. Add a new component, import it in App.jsx, and add your content to portfolio.js. The scroll-reveal animations will pick it up automatically."
  }
];

export function PortfolioTemplatePage() {
  return (
    <>
      <Helmet>
        <title>Portfolio Template — Free React Portfolio | CodesPanda</title>
        <meta name="description" content="Portfolio Template is a free React developer portfolio built with Vite &amp; Tailwind CSS. Showcase your work, experience &amp; projects — fully customizable." />
        <meta name="keywords" content="free react portfolio template, react portfolio website, vite portfolio template, tailwind css portfolio, react developer portfolio, free portfolio template" />
        <link rel="canonical" href="https://codespanda.com/templates/portfolio-template" />
        <meta property="og:title" content="Portfolio Template — Free React Portfolio | CodesPanda" />
        <meta property="og:description" content="A clean, fast-loading React portfolio template built with Vite and Tailwind CSS. Showcase your work and experience — free to download and customize." />
        <meta property="og:url" content="https://codespanda.com/templates/portfolio-template" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://codespanda.com/images/portfolio/portfolio.webp" />
        <meta property="og:image:width" content="1440" />
        <meta property="og:image:height" content="900" />
        <meta property="og:image:alt" content="React portfolio template hero section — free developer portfolio" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Portfolio Template — Free React Portfolio | CodesPanda" />
        <meta name="twitter:description" content="A clean, fast-loading React portfolio template built with Vite and Tailwind CSS. Showcase your work and experience — free to download and customize." />
        <meta name="twitter:image" content="https://codespanda.com/images/portfolio/portfolio.webp" />
        <meta name="twitter:image:alt" content="React portfolio template hero section — free developer portfolio" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "Portfolio Template",
          "description": "A clean, fast-loading React portfolio template built with Vite and Tailwind CSS. Showcase your work and experience — free to download and customize.",
          "url": "https://codespanda.com/templates/portfolio-template",
          "image": "https://codespanda.com/images/portfolio/portfolio.webp",
          "brand": { "@type": "Brand", "name": "CodesPanda" },
          "category": "Software > Templates > Portfolio",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "url": "https://codespanda.com/templates/portfolio-template"
          }
        })}</script>
        <script type="application/ld+json">{faqJsonLd(FAQ)}</script>
      </Helmet>

      <TemplateDetail
        id="portfolio"
        githubUrl="https://github.com/codespanda/portfolio"
        updated="July 2025"
        screens={SCREENS}
        inside={INSIDE}
        faq={FAQ}
      />
    </>
  );
}
