import CmsHubPage from '../components/CmsHubPage.jsx'

export default function VatPage() {
  return (
    <CmsHubPage
      slug="vat"
      fallback={{
        title: 'VAT registration',
        metaDescription:
          'UK VAT registration packages and add-ons from UK.company. Registration service - not VAT advice.',
        path: '/vat',
        sectionLabel: 'Key product',
        heroTitle: 'VAT registration',
        heroLead:
          'Register a new company for VAT, or add VAT registration to an existing formation order. We provide a registration service, not VAT advice.',
        primaryCtaLabel: 'Formation packages',
        primaryCtaTo: '/formations',
        secondaryCtaLabel: 'Non-UK founders',
        secondaryCtaTo: '/international',
      }}
    />
  )
}
