export const additionalServicePages = [
  {
    slug: 'uk-company-restoration-service',
    title: 'UK Company Restoration Service',
    subtitle: 'Administrative Restoration Service',
    priceDisplay: '£110 +VAT',
    shortDescription:
      'If your company or LLP has been dissolved (struck off), we can help restore it to the Companies House Register.',
    contentSections: [
      {
        title: 'What is administrative restoration?',
        paragraphs: [
          'When a Limited Company or Limited Liability Partnership is dissolved, its remaining assets pass to the Crown. A dissolved company’s assets or goods become ownerless (bona vacantia). Unplanned dissolution can mean valuable assets are lost this way.',
          'A company’s assets can include tangible and intangible items such as tax losses, domain names, trading names and trademarks, copyright material, bank accounts, leases and property, insurance claims and debtors.',
          'A company that is restored is deemed to have continued in existence as if it had never been dissolved.',
        ],
      },
      {
        title: 'When administrative restoration applies',
        paragraphs: [
          'Administrative restorations are only applicable to companies that have been struck off or dissolved by the Registrar of Companies.',
          'If a company has been liquidated or struck off at the application of the directors or a liquidator, the appropriate procedure is typically a court order restoration.',
          'Companies House will strike off a company if it fails to submit accounts or Confirmation Statements on time, or if it has failed to pay fines for late filings.',
        ],
      },
      {
        title: 'Benefits of administrative restoration',
        bullets: [
          'The process is relatively quick because there is no need to obtain a court order.',
          'However, outstanding Annual Returns and Accounts must still be filed and any fines or penalties paid before restoration can be completed.',
        ],
      },
      {
        title: 'Conditions that apply',
        paragraphs: ['The following conditions apply for an administrative restoration:'],
        bullets: [
          'The Company or LLP must have been in business at the time it was struck off.',
          'The application must be made within 6 years of the date the company or LLP was struck off.',
          'The application must be made by a director, shareholder, guarantor or partner at the time the company was dissolved.',
        ],
      },
      {
        title: 'Charges and disbursements',
        paragraphs: [
          'Compared to a court order restoration, this is not an expensive process. However, all outstanding Annual Returns and Accounts must be filed and associated fines and penalties paid.',
          'Treasury Solicitors Fee: £64 (or £295 if the registered office is in one of the Duchy estates)',
          'Companies House fee: £341',
          'Our fee: £110 + VAT',
        ],
      },
      {
        title: 'Court order restorations',
        paragraphs: [
          'Companies can also be restored via a court order (for example, where a company was dissolved by the directors or a liquidator).',
          'We no longer provide a court order restoration service.',
        ],
      },
    ],
  },
  {
    slug: 'registered-office-services',
    title: 'Registered Office Services',
    subtitle: 'UK Registered Office Address',
    priceDisplay: '£39/Yr.',
    shortDescription:
      'Maintain your privacy with a professional UK registered office address for your company and service addresses for officers.',
    contentSections: [
      {
        title: 'Why you need a registered office',
        paragraphs: [
          'All UK companies and LLPs registered at Companies House need a registered office in the UK.',
          'Your registered office is the company’s official address and all official communications will be sent there.',
          'The registered office must be a physical address with a street address and post code (it cannot be a PO Box).',
        ],
      },
      {
        title: 'Privacy and professional appearance',
        paragraphs: [
          'Using our address helps keep personal addresses off public records and separates personal and professional life.',
        ],
      },
    ],
  },
  {
    slug: 'sole-traders-address-service',
    title: 'Sole Traders Address Service',
    subtitle: 'Professional Trading Address',
    priceDisplay: '£75/Yr.',
    shortDescription:
      'A service address for businesses that are not registered at Companies House (sole traders, partnerships, trusts and associations).',
    contentSections: [
      {
        title: 'Who this service is for',
        paragraphs: [
          'This service is available for businesses that are not registered at Companies House.',
          'It can be utilised by sole traders, partnerships, trusts and associations.',
        ],
      },
    ],
  },
  {
    slug: 'digital-id-verification-service',
    title: 'Digital ID Verification Service',
    subtitle: 'Identity checks to support your application',
    priceDisplay: 'From £0 (quote)',
    shortDescription:
      'Support for identity verification requirements so your application can be processed smoothly.',
    contentSections: [
      {
        title: 'What we do',
        paragraphs: [
          'We help coordinate digital identity checks as part of your company formation or related service workflow.',
          'Exact pricing depends on the checks required for your application.',
        ],
      },
    ],
  },
]

export const additionalServiceNavItems = additionalServicePages.map(({ slug, title }) => ({
  slug,
  title,
}))

export function getAdditionalServicePage(slug) {
  return additionalServicePages.find((p) => p.slug === slug)
}

