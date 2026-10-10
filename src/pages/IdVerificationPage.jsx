import CmsHubPage from '../components/CmsHubPage.jsx'

export default function IdVerificationPage() {
  return (
    <CmsHubPage
      slug="id-verification"
      fallback={{
        title: 'ID Verification',
        metaDescription:
          'Identity verification for UK company formation and ready-made company transfers with UK.company (ACSP).',
        path: '/id-verification',
        sectionLabel: 'Compliance',
        heroTitle: 'ID Verification',
        heroLead:
          'We verify identity for directors, shareholders and persons of significant control before Companies House filing or company transfer.',
        primaryCtaLabel: 'Contact us',
        primaryCtaTo: '/contact',
        secondaryCtaLabel: 'Start formation',
        secondaryCtaTo: '/formations',
      }}
    />
  )
}
