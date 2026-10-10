import CmsHubPage from '../components/CmsHubPage.jsx'

export default function EcosystemPage() {
  return (
    <CmsHubPage
      slug="ecosystem"
      fallback={{
        title: 'UK.company ecosystem',
        metaDescription: 'Related UK.company products and partner services.',
        path: '/ecosystem',
        sectionLabel: 'Network',
        heroTitle: 'Our ecosystem',
        heroLead:
          'Formation, ready-made companies, ID verification, VAT support and mail products work together.',
        primaryCtaLabel: 'Explore formations',
        primaryCtaTo: '/formations',
        secondaryCtaLabel: 'Contact',
        secondaryCtaTo: '/contact',
      }}
    />
  )
}
