import CmsHubPage from '../components/CmsHubPage.jsx'

export default function SellCompanyPage() {
  return (
    <CmsHubPage
      slug="sell"
      showContactForm
      contactSubject="Sell company enquiry"
      fallback={{
        title: 'Sell your Existing Company to us',
        metaDescription:
          'Sell your existing UK limited company to UK.company. Tell us about your company and we may make an offer.',
        path: '/sell',
        sectionLabel: 'Key product',
        heroTitle: 'Sell your Existing Company to us',
        heroLead:
          'Thinking of selling your UK limited company? Tell us about the company and we will review whether we can make an offer.',
        primaryCtaLabel: 'Start an enquiry',
        primaryCtaTo: '#enquiry',
        secondaryCtaLabel: 'Buy a company instead',
        secondaryCtaTo: '/companies-for-sale',
        formAnchor: 'enquiry',
      }}
    />
  )
}
