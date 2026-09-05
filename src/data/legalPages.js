export const legalPages = {
  privacy: {
    slug: 'privacy',
    title: 'Privacy Policy',
    updated: '5 September 2026',
    metaDescription:
      'Privacy Policy for UK.company - how we collect, use and protect personal data for company formation, ready-made company sales and ID verification.',
    sections: [
      {
        heading: 'Who we are',
        paragraphs: [
          'UK.company provides UK company formation, ready-made company transfers, identity verification support and related services. We are Companies House and HMRC regulated (ACSP).',
          'Contact: info@uk.company · 27 Old Gloucester Street, London, WC1N 3AX, UK.',
        ],
      },
      {
        heading: 'What we collect',
        paragraphs: [
          'Depending on the service, we may collect your name, email, phone number, company details, payment references, and identity documents required for AML / Companies House checks.',
          'If you subscribe to our newsletter, we store the email address you provide.',
        ],
      },
      {
        heading: 'How we use your information',
        paragraphs: [
          'We use your information to process enquiries and orders, complete identity checks, communicate about reservations and proforma invoices, and improve our website.',
          'We do not sell your personal data. We may share information with Companies House, HMRC, payment providers or professional advisers where required to deliver the service or meet legal obligations.',
        ],
      },
      {
        heading: 'Retention & your rights',
        paragraphs: [
          'We keep records for as long as needed for the service, regulatory compliance and legitimate business records.',
          'You may ask for access, correction or deletion of personal data where applicable by emailing info@uk.company.',
        ],
      },
    ],
  },
  terms: {
    slug: 'terms',
    title: 'Terms of Use',
    updated: '5 September 2026',
    metaDescription:
      'Terms of Use for UK.company website services including company formation, companies for sale reservations and related ACSP services.',
    sections: [
      {
        heading: 'Using this website',
        paragraphs: [
          'By using UK.company you agree to these terms. Our site describes formation packages, ready-made companies and related services. Prices and availability can change.',
          'Content is for general information. It is not legal, tax or financial advice.',
        ],
      },
      {
        heading: 'Orders & reservations',
        paragraphs: [
          'New company formations are processed after required details and identity checks. Ready-made companies are reserved first - payment is taken via proforma invoice after ID approval, not at reservation.',
          'We may refuse or cancel an order where AML, Companies House rules or incomplete information prevent lawful completion.',
        ],
      },
      {
        heading: 'Liability',
        paragraphs: [
          'We take reasonable care in providing services. We are not liable for delays caused by Companies House, incomplete customer information, or third-party systems outside our control.',
          'Nothing in these terms excludes liability that cannot be excluded by law.',
        ],
      },
      {
        heading: 'Contact',
        paragraphs: [
          'Questions about these terms: info@uk.company or see our Contact page.',
        ],
      },
    ],
  },
  cookies: {
    slug: 'cookies',
    title: 'Cookies Policy',
    updated: '5 September 2026',
    metaDescription:
      'Cookies Policy for UK.company - how we use cookies and similar technologies on our website.',
    sections: [
      {
        heading: 'What are cookies?',
        paragraphs: [
          'Cookies are small files stored on your device that help websites work, remember preferences, or understand how pages are used.',
        ],
      },
      {
        heading: 'How we use cookies',
        paragraphs: [
          'We use essential cookies for core functions such as keeping you signed in to the customer portal and remembering your shopping cart in the browser.',
          'We may use analytics cookies to understand which pages are useful, so we can improve the site. You can control cookies through your browser settings.',
        ],
      },
      {
        heading: 'Managing cookies',
        paragraphs: [
          'Most browsers let you block or delete cookies. Blocking essential cookies may stop login, cart or reservation features from working correctly.',
          'For privacy questions, email info@uk.company or read our Privacy Policy.',
        ],
      },
    ],
  },
}

export function getLegalPage(slug) {
  return legalPages[slug] || null
}
