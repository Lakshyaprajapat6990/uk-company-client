import CmsHubPage from '../components/CmsHubPage.jsx'

export default function ContactPage() {
  return (
    <CmsHubPage
      slug="contact"
      showContactForm
      contactSubject="Website contact"
      fallback={{
        title: 'Contact us',
        metaDescription:
          'Contact UK.company by phone or email. Local 0333-444-2222, international +44 333-444-2222, or info@uk.company.',
        path: '/contact',
        sectionLabel: 'Get in touch',
        heroTitle: 'Contact us',
        heroLead:
          'Questions about formations, ready-made companies, ID verification or VAT? Call, email, or send the form below.',
        phoneLocal: '0333-444-2222',
        phoneIntl: '+44 333-444-2222',
        email: 'info@uk.company',
        officeAddress: '27 Old Gloucester Street\nLondon, WC1N 3AX\nUnited Kingdom',
        formTitle: 'Enquiry form',
        formLead: 'Fill in your details and we will reply as soon as we can.',
        formAnchor: 'contact-form',
      }}
    />
  )
}
