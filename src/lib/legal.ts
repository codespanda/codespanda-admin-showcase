/**
 * Content for the legal / policy pages. This is generic template copy intended
 * as a starting point — replace it with your own counsel-reviewed text before
 * going to production.
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

const UPDATED = "June 27, 2026";

export const LEGAL_DOCS: Record<string, LegalDoc> = {
  privacy: {
    slug: "privacy",
    title: "Privacy Policy",
    eyebrow: "Legal",
    updated: UPDATED,
    intro:
      "This Privacy Policy explains what information CodesPanda collects, how we use it, and the choices you have. We are committed to handling your data responsibly and transparently.",
    sections: [
      {
        heading: "Information we collect",
        body: [
          "We collect information you provide directly to us, such as your name, email address, and company details when you create an account or contact us.",
          "We also collect certain information automatically when you use the product, including device, browser, and usage data, to keep the service secure and reliable.",
        ],
        list: [
          "Account information (name, email, organization)",
          "Usage and diagnostic data",
          "Cookies and similar technologies",
        ],
      },
      {
        heading: "How we use information",
        body: [
          "We use the information we collect to provide, maintain, and improve the service, to communicate with you, and to protect against fraud and abuse.",
          "We do not sell your personal information to third parties.",
        ],
      },
      {
        heading: "Data sharing",
        body: [
          "We share information only with service providers who process data on our behalf under appropriate confidentiality and security obligations, or when required by law.",
        ],
      },
      {
        heading: "Data retention",
        body: [
          "We retain personal information for as long as your account is active or as needed to provide the service, comply with legal obligations, resolve disputes, and enforce agreements.",
        ],
      },
      {
        heading: "Your rights",
        body: [
          "Depending on your location, you may have the right to access, correct, export, or delete your personal data. To exercise these rights, contact us at privacy@codespanda.com.",
        ],
      },
      {
        heading: "Contact us",
        body: [
          "If you have questions about this Privacy Policy, reach out to privacy@codespanda.com.",
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
      "These Terms of Service govern your access to and use of CodesPanda. By using the service, you agree to these terms.",
    sections: [
      {
        heading: "Using the service",
        body: [
          "You may use the service only in compliance with these terms and all applicable laws. You are responsible for your account and for any activity that occurs under it.",
        ],
      },
      {
        heading: "License",
        body: [
          "Subject to these terms, we grant you a limited, non-exclusive, non-transferable license to access and use the service for your internal business purposes.",
        ],
      },
      {
        heading: "Acceptable use",
        body: [
          "You agree not to misuse the service. The following are not permitted:",
        ],
        list: [
          "Reverse engineering or attempting to access the service in an unauthorized way",
          "Disrupting the integrity or performance of the service",
          "Using the service to store or transmit unlawful or infringing content",
        ],
      },
      {
        heading: "Termination",
        body: [
          "We may suspend or terminate your access if you violate these terms. You may stop using the service at any time.",
        ],
      },
      {
        heading: "Disclaimers",
        body: [
          'The service is provided "as is" without warranties of any kind, to the maximum extent permitted by law.',
        ],
      },
      {
        heading: "Limitation of liability",
        body: [
          "To the fullest extent permitted by law, CodesPanda will not be liable for any indirect, incidental, or consequential damages arising from your use of the service.",
        ],
      },
    ],
  },

  security: {
    slug: "security",
    title: "Security",
    eyebrow: "Trust",
    updated: UPDATED,
    intro:
      "Security is foundational to how we build and operate. This page outlines the measures we take to protect your data.",
    sections: [
      {
        heading: "Encryption",
        body: [
          "Data is encrypted in transit using TLS 1.3 and at rest using AES-256. Secrets and keys are managed through a dedicated key management service.",
        ],
      },
      {
        heading: "Access control",
        body: [
          "We enforce role-based access control and the principle of least privilege. Administrative access requires multi-factor authentication and is logged for auditing.",
        ],
      },
      {
        heading: "Infrastructure",
        body: [
          "Our infrastructure runs on hardened cloud providers with network isolation, automated patching, and continuous monitoring for anomalies.",
        ],
      },
      {
        heading: "Compliance",
        body: [
          "We align our controls with recognized industry frameworks and undergo periodic third-party assessments.",
        ],
        list: ["SOC 2 Type II aligned", "Annual penetration testing", "Continuous vulnerability scanning"],
      },
      {
        heading: "Reporting a vulnerability",
        body: [
          "If you believe you've found a security issue, please report it responsibly to security@codespanda.com. We investigate every report promptly.",
        ],
      },
    ],
  },

  gdpr: {
    slug: "gdpr",
    title: "GDPR Compliance",
    eyebrow: "Legal",
    updated: UPDATED,
    intro:
      "CodesPanda supports compliance with the EU General Data Protection Regulation (GDPR). This page describes how we help you meet your obligations.",
    sections: [
      {
        heading: "Lawful basis",
        body: [
          "We process personal data on lawful bases including the performance of a contract, our legitimate interests, and your consent where required.",
        ],
      },
      {
        heading: "Data subject rights",
        body: [
          "We provide tools and processes to help you respond to data subject requests, including:",
        ],
        list: [
          "Right of access and data portability",
          "Right to rectification and erasure",
          "Right to restrict or object to processing",
        ],
      },
      {
        heading: "Data processing agreement",
        body: [
          "We offer a Data Processing Agreement (DPA) that reflects GDPR requirements. Contact privacy@codespanda.com to request a copy.",
        ],
      },
      {
        heading: "International transfers",
        body: [
          "Where personal data is transferred outside the EEA, we rely on appropriate safeguards such as Standard Contractual Clauses.",
        ],
      },
      {
        heading: "Sub-processors",
        body: [
          "We maintain a list of sub-processors and provide notice of material changes so you can stay informed about who processes data on our behalf.",
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
      "This Cookie Policy explains how CodesPanda uses cookies and similar technologies, and how you can control them.",
    sections: [
      {
        heading: "What are cookies",
        body: [
          "Cookies are small text files stored on your device that help websites function and remember your preferences.",
        ],
      },
      {
        heading: "How we use cookies",
        body: ["We use cookies for the following purposes:"],
        list: [
          "Essential cookies required for the service to work",
          "Preference cookies that remember settings such as your theme",
          "Analytics cookies that help us understand usage and improve the product",
        ],
      },
      {
        heading: "Managing cookies",
        body: [
          "You can control and delete cookies through your browser settings. Disabling some cookies may affect how the service functions.",
        ],
      },
    ],
  },
};

export const LEGAL_SLUGS = Object.keys(LEGAL_DOCS);
