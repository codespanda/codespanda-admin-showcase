/**
 * Content for the legal / policy pages, written for India's Digital Personal Data
 * Protection Act, 2023 (DPDP Act) and the DPDP Rules, 2025. Keep it in step with what
 * the site actually does: if a form, tracker or provider changes, update these pages.
 * Have it reviewed by a lawyer before relying on it.
 */

export interface LegalSection {
  heading: string;
  body: string[];
  /** Optional bullet list rendered after the body paragraphs. */
  list?: string[];
}

export interface LegalDoc {
  slug: string;
  title: string;
  eyebrow: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}

const UPDATED = "November 4, 2026";
const CONTACT = "contact@codespanda.com";
const GRIEVANCE = `Grievance Officer: Deepak Kumar, CodesPanda, Mohali, Punjab, India. Email: ${CONTACT} (subject “Privacy request” or “Grievance”).`;

export const LEGAL_DOCS: Record<string, LegalDoc> = {
  privacy: {
    slug: "privacy",
    title: "Privacy Policy",
    eyebrow: "Legal",
    updated: UPDATED,
    intro:
      "CodesPanda (“we”) runs codespanda.com from Mohali, Punjab, India. This notice explains what personal data we process, why, who we share it with, how long we keep it and how you can use your rights under the Digital Personal Data Protection Act, 2023. We are the Data Fiduciary for the data described here.",
    sections: [
      {
        heading: "What we collect and why",
        body: ["We only collect what we need for the purpose stated next to it:"],
        list: [
          "Project and hiring enquiries (the “Start a project” and “Hire us” forms): your name, email, the service you're interested in, timeline, project details and any file you attach (up to 1 MB). We use these only to reply to you, prepare a quote and run the project if you go ahead.",
          "Analytics, only if you click “Accept” in the cookie banner: pages you visit, how you arrived, device and browser type and approximate location derived from your IP address, collected by Google Analytics. We use it to see which pages are useful.",
          "Emails and WhatsApp messages you send us: your contact details and what you write, used to reply to you.",
          "Payments through the “Buy me a coffee” buttons: handled by Razorpay or PayPal. We receive your name, email and the amount, never your card or bank details.",
          "Settings stored in your own browser: your theme and your cookie choice. These never leave your device.",
        ],
      },
      {
        heading: "Consent",
        body: [
          "Each form asks for your consent before it sends anything, and analytics stays off until you accept it. You can withdraw consent at any time, as easily as you gave it: use “Cookie settings” in the footer for analytics, or email us for anything else. Withdrawing doesn't affect processing that happened before, and we will stop processing and delete the data unless the law requires us to keep it.",
        ],
      },
      {
        heading: "Who we share it with",
        body: [
          "We don't sell personal data or use it for advertising. We share it only with the providers that process it for us (Data Processors), under their security and confidentiality terms:",
        ],
        list: [
          "FormSubmit (formsubmit.co, USA): delivers form submissions and attachments to our email inbox.",
          "Google (USA): Google Analytics, only with your consent, and our email provider.",
          "GitHub (USA): hosts this website. Like any web host, it processes your IP address to serve and protect the site.",
          "Meta (WhatsApp): if you choose to chat with us on WhatsApp.",
          "Razorpay (India) and PayPal: if you choose to make a payment.",
        ],
      },
      {
        heading: "Data stored outside India",
        body: [
          "Some of these providers store data outside India, mainly in the USA. We only use countries the Government of India has not restricted under Section 16 of the DPDP Act.",
        ],
      },
      {
        heading: "How long we keep it",
        list: [
          "Enquiries that don't lead to a project: deleted within 12 months of our last message.",
          "Client project records and invoices: for the length of the project and then as long as Indian tax and accounting law requires.",
          "Analytics: deleted automatically after at most 14 months. Analytics cookies expire after up to 2 years, or straight away if you withdraw consent.",
        ],
        body: ["We delete personal data once its purpose is served, unless the law requires us to keep it longer."],
      },
      {
        heading: "Your rights",
        body: [
          "You can ask us for a summary of the personal data we hold about you and how we use it, ask us to correct, complete, update or erase it, withdraw consent, nominate someone to act for you if you die or can't act yourself, and raise a grievance. See “Your data rights” for how to make a request.",
          "If you're not satisfied with our response, you can complain to the Data Protection Board of India.",
        ],
      },
      {
        heading: "Children",
        body: [
          "This site is meant for adults and businesses. We don't knowingly collect personal data from anyone under 18. If you're a parent or guardian and think your child has sent us personal data, email us and we'll delete it.",
        ],
      },
      {
        heading: "Security and breaches",
        body: [
          "The site is served only over HTTPS, uses a Content Security Policy, and access to enquiries is limited to the CodesPanda team. If a personal data breach happens, we will inform the people affected and the Data Protection Board of India as the DPDP Act and Rules require.",
        ],
      },
      {
        heading: "Contact and grievances",
        body: [
          GRIEVANCE,
          "We acknowledge requests within 7 days and resolve them within 30 days. You can ask for this notice in Hindi or any other language listed in the Eighth Schedule of the Constitution.",
        ],
      },
      {
        heading: "Changes to this notice",
        body: ["If we change how we use personal data, we'll update this page and the date at the top. If you've consented to something, we'll ask again before using your data in a new way."],
      },
    ],
  },

  "data-rights": {
    slug: "data-rights",
    title: "Your Data Rights",
    eyebrow: "Legal",
    updated: UPDATED,
    intro:
      "Under the Digital Personal Data Protection Act, 2023 you have rights over the personal data CodesPanda holds about you. Here's how to use them.",
    sections: [
      {
        heading: "What you can ask for",
        list: [
          "Access: a summary of the personal data we hold about you, what we do with it, and who we've shared it with.",
          "Correction and erasure: fix, complete or update your data, or have it deleted.",
          "Withdraw consent: stop analytics from “Cookie settings” in the footer, or ask us to stop using your enquiry data.",
          "Nominate someone: name a person who can use these rights for you if you die or become unable to act.",
          "Grievance: complain to us about how we've handled your data.",
        ],
        body: [],
      },
      {
        heading: "How to make a request",
        body: [
          `Email ${CONTACT} with the subject “Privacy request”. Tell us what you'd like us to do and use the email address you contacted us from, so we can find your data and confirm it's you. We may ask for a little more information to verify your identity, and we'll only use it for that.`,
          "There's no charge. We acknowledge requests within 7 days and complete them within 30 days.",
        ],
      },
      {
        heading: "Grievance Officer",
        body: [GRIEVANCE],
      },
      {
        heading: "If you're not satisfied",
        body: [
          "Please contact our Grievance Officer first. If you're not satisfied with how we resolve your grievance, you can complain to the Data Protection Board of India.",
        ],
      },
      {
        heading: "Your duties",
        body: [
          "The DPDP Act asks that information you give us is accurate, that you don't impersonate anyone and that you don't file false or frivolous complaints.",
        ],
      },
    ],
  },

  cookies: {
    slug: "cookies",
    title: "Cookie Policy",
    eyebrow: "Legal",
    updated: UPDATED,
    intro:
      "This page lists every cookie and browser storage item codespanda.com uses, and how to change your choice.",
    sections: [
      {
        heading: "Analytics cookies (only with your consent)",
        body: [
          "If you click “Accept” in the cookie banner, Google Analytics sets the cookies below. If you click “No thanks”, or never choose, Google Analytics doesn't load at all.",
        ],
        list: [
          "_ga: tells visits from the same browser apart. Expires after up to 2 years.",
          "_ga_8S1SQRNF5Y: keeps the state of your current visit. Expires after up to 2 years.",
        ],
      },
      {
        heading: "Stored in your browser (no consent needed)",
        body: ["These are needed for the site to work the way you set it, and never leave your device:"],
        list: [
          "nexus-theme: your light or dark theme.",
          "cp-analytics-consent: your cookie choice, so we don't ask on every page.",
        ],
      },
      {
        heading: "Payment and chat providers",
        body: [
          "If you use the Razorpay or PayPal payment buttons, or chat with us on WhatsApp, those providers may set their own cookies under their own privacy policies.",
        ],
      },
      {
        heading: "Changing your choice",
        body: [
          "Use “Cookie settings” in the footer of any page to accept or refuse analytics. Refusing deletes the Google Analytics cookies. You can also clear cookies and site data in your browser settings.",
        ],
      },
    ],
  },

  terms: {
    slug: "terms",
    title: "Terms of Service",
    eyebrow: "Legal",
    updated: UPDATED,
    intro:
      "These terms cover your use of codespanda.com, our free templates and the design and development services we offer. By using the site you agree to them.",
    sections: [
      {
        heading: "Free templates",
        body: [
          "Our templates are free and open source. Each one is licensed under the license in its GitHub repository (MIT unless the repository says otherwise), and that license governs how you can use, change and share it.",
        ],
      },
      {
        heading: "Design and development services",
        body: [
          "Projects you hire us for are covered by a separate quote or agreement that sets out the scope, price, timeline and ownership of the work. If that agreement differs from these terms, the agreement applies.",
        ],
      },
      {
        heading: "Using the site",
        body: ["Please don't misuse the site. In particular, don't:"],
        list: [
          "Try to access parts of the site or its systems you're not meant to",
          "Disrupt the site, its forms or anyone else's use of it",
          "Send unlawful, infringing or harmful content through our forms",
        ],
      },
      {
        heading: "Content",
        body: [
          "The site's text, designs, portfolio work and branding belong to CodesPanda or their owners. Template code is covered by its own license, as above.",
        ],
      },
      {
        heading: "Disclaimers",
        body: [
          "Free templates are provided “as is”, without warranties of any kind, to the extent the law allows. We work to keep the site accurate and available but can't promise it will always be error-free.",
        ],
      },
      {
        heading: "Limitation of liability",
        body: [
          "To the extent the law allows, CodesPanda isn't liable for indirect or consequential losses from using the site or the free templates.",
        ],
      },
      {
        heading: "Governing law",
        body: ["These terms are governed by the laws of India, and the courts at Mohali, Punjab have jurisdiction."],
      },
      {
        heading: "Contact",
        body: [`Questions about these terms: ${CONTACT}.`],
      },
    ],
  },

  security: {
    slug: "security",
    title: "Security",
    eyebrow: "Trust",
    updated: UPDATED,
    intro: "How codespanda.com protects visitors and the personal data you send us.",
    sections: [
      {
        heading: "How the site is built",
        body: [
          "codespanda.com is a static website hosted on GitHub Pages. It has no user accounts and no database of its own, so there's no store of visitor data on our servers to breach.",
        ],
      },
      {
        heading: "In the browser",
        list: [
          "Every page is served over HTTPS, and plain HTTP requests are redirected to it.",
          "A Content Security Policy limits which sites can run scripts, load content or receive form data from our pages.",
          "Pages don't pass full addresses to other sites (strict-origin-when-cross-origin referrer policy).",
          "Analytics only loads after you consent, and fonts are served from our own domain.",
        ],
        body: [],
      },
      {
        heading: "Your enquiries",
        body: [
          "Form submissions travel over HTTPS to FormSubmit, which delivers them to our inbox. Only the CodesPanda team can read them, and we delete enquiries that don't become projects within 12 months.",
        ],
      },
      {
        heading: "Payments",
        body: [
          "Payments are handled entirely by Razorpay and PayPal on their own secure pages. We never see or store your card or bank details.",
        ],
      },
      {
        heading: "Reporting a vulnerability",
        body: [
          `Found a security issue? Email ${CONTACT} with the subject “Security”, with enough detail for us to reproduce it. Please give us a reasonable time to fix it before sharing it publicly. We reply to every report.`,
        ],
      },
    ],
  },
};

export const LEGAL_SLUGS = Object.keys(LEGAL_DOCS);
