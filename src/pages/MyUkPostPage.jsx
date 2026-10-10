import CmsHubPage from '../components/CmsHubPage.jsx'

export default function MyUkPostPage() {
  return (
    <CmsHubPage
      slug="myukpost"
      fallback={{
        title: 'MyUKPost mail services',
        metaDescription: 'UK registered office and mail handling via MyUKPost, linked from UK.company.',
        path: '/myukpost',
        sectionLabel: 'Address & mail',
        heroTitle: 'MyUKPost',
        heroLead:
          'Registered office, officer service addresses and mail handling are provided through MyUKPost.',
        primaryCtaLabel: 'Open MyUKPost',
        primaryCtaTo: 'https://myukpost.com',
        secondaryCtaLabel: 'Formations',
        secondaryCtaTo: '/formations',
      }}
    />
  )
}
