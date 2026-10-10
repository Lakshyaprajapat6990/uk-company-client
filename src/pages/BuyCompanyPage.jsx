import CmsHubPage from '../components/CmsHubPage.jsx'

export default function BuyCompanyPage() {
  return (
    <CmsHubPage
      slug="buy"
      showContactForm
      contactSubject="Buy / we buy companies"
      fallback={{
        title: 'Buy an Existing Company',
        metaDescription:
          'Buy a ready-made UK company from UK.company, or sell your existing limited company to us.',
        path: '/buy',
        sectionLabel: 'Key product hub · Buy.UK.Company',
        heroTitle: 'Buy an Existing Company',
        heroLead:
          'Two routes, one place: buy a ready-made company from our list, or sell your UK limited company to us.',
        primaryCtaLabel: 'View companies for sale',
        primaryCtaTo: '/companies-for-sale',
        secondaryCtaLabel: 'We buy companies',
        secondaryCtaTo: '#enquiry',
        formAnchor: 'enquiry',
      }}
    />
  )
}
