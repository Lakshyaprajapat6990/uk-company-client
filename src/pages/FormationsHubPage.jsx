import CmsHubPage from '../components/CmsHubPage.jsx'

export default function FormationsHubPage() {
  return (
    <CmsHubPage
      slug="formations"
      fallback={{
        title: 'UK Company Formations',
        metaDescription:
          'Form a new UK limited company online with UK.company. ACSP-supported formations, non-UK resident packs, VAT options and clear pricing from £107.',
        path: '/formations',
        sectionLabel: 'Key product hub',
        heroTitle: 'UK Company Formations',
        heroLead:
          'Form a new UK company online. We are an Authorised Corporate Service Provider (ACSP) - you provide details and ID, we handle the Companies House filing.',
        primaryCtaLabel: 'Start LTD formation',
        primaryCtaTo: '/formation/ltd-or-private-limited-company-formation-in-uk',
        secondaryCtaLabel: 'Non-UK / International',
        secondaryCtaTo: '/international',
      }}
    />
  )
}
