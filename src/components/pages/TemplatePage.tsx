import { Helmet } from "react-helmet-async";
import { Navigate, useParams } from "react-router-dom";
import { TemplateDetail } from "@/components/site/TemplateDetail";
import { faqJsonLd } from "@/components/site/FaqSection";
import { findTemplatePage } from "@/lib/template-pages";

const BASE = "https://codespanda.com";

/** /templates/<slug>: a template's detail page, built from src/content/template-pages.json. */
export function TemplatePage() {
  const { slug = "" } = useParams<{ slug: string }>();
  const found = findTemplatePage(slug);
  if (!found) return <Navigate to="/templates" replace />;

  const { template: t, page } = found;
  const { seo } = page;
  const url = `${BASE}/templates/${page.slug}`;
  const image = `${BASE}${seo.image}`;
  const ogTitle = seo.ogTitle ?? seo.title;
  const ogDescription = seo.ogDescription ?? seo.description;

  return (
    <>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={ogDescription} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={image} />
        {seo.imageWidth && <meta property="og:image:width" content={String(seo.imageWidth)} />}
        {seo.imageHeight && <meta property="og:image:height" content={String(seo.imageHeight)} />}
        {seo.imageAlt && <meta property="og:image:alt" content={seo.imageAlt} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.twitterTitle ?? ogTitle} />
        <meta name="twitter:description" content={seo.twitterDescription ?? ogDescription} />
        <meta name="twitter:image" content={image} />
        {(seo.twitterImageAlt ?? seo.imageAlt) && <meta name="twitter:image:alt" content={seo.twitterImageAlt ?? seo.imageAlt} />}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: seo.schemaName,
            description: seo.schemaDescription,
            url,
            image: seo.schemaImage ? `${BASE}${seo.schemaImage}` : image,
            brand: { "@type": "Brand", name: "CodesPanda" },
            category: seo.schemaCategory,
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
              ...(seo.offerUrl ? { url } : {}),
            },
          })}
        </script>
        {page.faq.length > 0 && <script type="application/ld+json">{faqJsonLd(page.faq)}</script>}
      </Helmet>

      <TemplateDetail id={t.id} githubUrl={page.githubUrl} updated={page.updated} screens={page.screens} inside={page.inside} faq={page.faq} />
    </>
  );
}
