import CmsHubPage from '../components/CmsHubPage.jsx'

export default function BblPage() {
  return (
    <CmsHubPage
      slug="bbl"
      showContactForm
      contactSubject="BBL enquiry"
      fallback={{
        title: 'Bounce Back Loans (BBL)',
        metaDescription:
          'Guidance and contact for UK companies with Bounce Back Loans (BBL). Tell UK.company about your situation.',
        path: '/bbl',
        sectionLabel: 'Specialist page',
        heroTitle: 'Bounce Back Loans (BBL)',
        heroLead:
          'Many UK companies still carry Bounce Back Loan balances. Contact us with clear details about your situation.',
        primaryCtaLabel: 'Contact about BBL',
        primaryCtaTo: '#enquiry',
        secondaryCtaLabel: 'Sell your company',
        secondaryCtaTo: '/sell',
        formAnchor: 'enquiry',
      }}
    />
  )
}
