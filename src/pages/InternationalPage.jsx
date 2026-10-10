import CmsHubPage from '../components/CmsHubPage.jsx'

export default function InternationalPage() {
  return (
    <CmsHubPage
      slug="international"
      fallback={{
        title: 'International & Non-UK Company Formation',
        metaDescription:
          'Form a UK company as a non-UK resident. London registered office included, ACSP support, ID verification, and clear packages for overseas founders.',
        path: '/international',
        sectionLabel: 'Key Products',
        heroTitle: 'International & Non-UK formation',
        heroLead:
          'Form a UK company as a non-UK resident. London registered office options, ACSP support, and identity checks before filing.',
        primaryCtaLabel: 'Non-UK LTD pack',
        primaryCtaTo: '/formation/ltd-companies-for-non-uk-residents',
        secondaryCtaLabel: 'All formations',
        secondaryCtaTo: '/formations',
      }}
    />
  )
}
