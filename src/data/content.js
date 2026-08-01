export const informationGuides = [
  {
    id: 'why-use-agent',
    title: 'Why Use Any Company Formation Agent',
    text: 'The simple reason for choosing a company formation agent is the additional support you receive. Agents provide services Companies House cannot offer — bank referrals, registered office and mail handling, company administration portals, accountant referrals and VAT registration.',
  },
  {
    id: 'choosing-name',
    title: 'Choosing a Company Name',
    text: 'Your company name must be approved by Companies House. Names cannot be the “same as” an existing company, include sensitive words without permission, suggest a government connection, constitute an offence, or be offensive. Always check availability before you order.',
  },
  {
    id: 'shares-capital',
    title: 'Shares and the Statement of Capital',
    text: 'Most private limited companies are limited by shares. The statement of capital records the number of shares, share classes and the amount paid up. Alphabet (multi-class) shares can carry different voting and dividend rights when you need a more flexible structure.',
  },
  {
    id: 'money-laundering',
    title: 'Money Laundering Regulations',
    text: 'UK company formation agents must comply with anti-money laundering rules. We verify identity for directors, shareholders and persons of significant control before submitting your application to Companies House.',
  },
  {
    id: 'company-secretaries',
    title: 'Company Secretaries',
    text: 'Private limited companies are not required to appoint a company secretary, but many still do for governance and filing support. Public companies must have a qualified company secretary.',
  },
  {
    id: 'sic-code',
    title: 'Company SIC Code',
    text: 'A Standard Industrial Classification (SIC) code describes your company’s main business activity. You choose one or more SIC codes when you form the company so Companies House and HMRC understand what you do.',
  },
  {
    id: 'before-you-start',
    title: 'Before You Start',
    text: 'Before ordering, decide your company type, proposed name, directors, shareholders (or guarantors/members), share structure, registered office address and SIC codes. Have ID documents ready for verification.',
  },
  {
    id: 'directors-shareholders',
    title: 'Company Directors + Shareholders',
    text: 'A private limited company can be formed with one person acting as both sole director and sole shareholder. There is no upper limit on the number of directors or shareholders. Directors manage the company; shareholders own it.',
  },
  {
    id: 'bank-non-uk',
    title: 'Bank Options For Non-UK Residents',
    text: 'Non-UK residents can form a UK company. Opening a traditional UK high-street bank account can be harder from overseas, so many founders use fintech or specialist banks that accept non-resident applications.',
  },
  {
    id: 'banking-referrals',
    title: 'Banking Referrals',
    text: 'UK residents can be referred to high-street and fintech banks through our partners. We also offer merchant account referrals if you need to accept card payments.',
  },
  {
    id: 'admin-portal',
    title: 'Free Company Admin Portal',
    text: 'Every formation includes a free online administration portal linked to Companies House so you can update officers, file changes and manage your company records for the life of the company — with free lifetime support.',
  },
]

export const nav = {
  topLinks: [
    { label: 'Account login', href: '#' },
    { label: 'Post Login', href: '#' },
    { label: 'Contact us', href: '#contact' },
  ],
  companyFormations: [
    'Limited Company Formation',
    'LTD Company With Registered Office',
    'LTD Company With VAT Registration',
    'LTD Companies for Non UK Residents',
    'LLP Companies for Non UK Residents',
    'Limited Liability Partnerships',
    'LBG Company with "ltd"/"limited"',
    'LBG Company "ltd" / "limited" Exemption',
    'Community Interest Company (CIC) – LBG',
    'Community Interest Company (CIC) – LTD',
    'Companies with more than 1 class of share',
    'Companies with owner supplied A Of A',
  ],
  additionalServices: [
    'Company Restoration Service',
    'Registered Office Services',
    'Sole Traders Address Service',
    'Digital Id Verification Service',
  ],
  information: informationGuides.map((g) => g.title),
}

export const trustPoints = [
  {
    title: 'Excellent Service',
    text: 'More than 2200 clients have reviewed our services',
  },
  {
    title: 'Fully Authorised',
    text: 'We are approved Companies House Agents',
  },
  {
    title: 'No Hidden Charges',
    text: 'Transparent pricing',
  },
  {
    title: 'Pick & Mix Service',
    text: 'No bundles, with inflated prices. Pick the services you need',
  },
]

export const serviceTabs = [
  { id: 'ltd', label: 'Limited Company' },
  { id: 'llp', label: 'LLP Company' },
  { id: 'lbg', label: 'LBG + Charity' },
  { id: 'cic', label: 'CIC Company' },
  { id: 'nonuk', label: 'Non-UK Residents' },
  { id: 'other', label: 'Other Services' },
  { id: 'address', label: 'Address Service' },
  { id: 'restoration', label: 'Company Restoration' },
]

export const products = {
  ltd: [
    {
      title: 'Limited Companies (LTD)',
      price: '£107',
      text: 'Limited companies are the most common form of registration at Companies House. They are suitable for Medium, Small and Micro Businesses. Simple to set up. Only one individual is required for a company to be registered. However, there are no limits to the number of directors and shareholders you can have. Your limited company will be registered and ready to trade within one working day, subject to the workload of Companies House. Clients, suppliers and banks will be able to see your company’s official details on the Companies House website within one working day of its registration.',
    },
    {
      title: 'LTD Company With Registered Office',
      price: '£114',
      text: 'Maintain your privacy with this package. We provide a Central London registered office address for your company and free service addresses for all your officers and shareholders. Official post will be securely processed for you. There are no charges for using our service to make officer resignations and appointments.',
    },
    {
      title: 'LTD Company With VAT Registration',
      price: '£133',
      text: 'This package provides a ready to trade limited liability company with an application to register it for VAT. If your company will be supplying goods and services in the UK and your expected sales will exceed £90,000, you will be required to register for VAT. You can still register for VAT if you expect sales to be below the £90000 threshold when it is beneficial to do so. Please note that we do not offer VAT advice, merely a registration service.',
    },
  ],
  llp: [
    {
      title: 'Limited Liability Partnerships',
      price: '£119',
      text: 'Limited Liability Partnerships tend to be used by large professional partnerships such as accountants, solicitors, engineering companies and surveyors. They do not require articles of association. They can be set up online and without the need for paperwork or signatures. There must be at least two “designated” partners (also known as members) to form an LLP. Designated partners perform statutory functions such as filing documents with Companies House. In some Partnership Agreements where there are a small number of members it is not uncommon for all members to be designated members. There can be more (the Companies Acts do not provide for a maximum number) but they need not be designated. Your limited liability partnership (LLP) will be formed and ready to trade within 1 working day (24hrs), subject to the work load of Companies House.',
    },
    {
      title: 'LLP Company With Registered Office',
      price: '£133',
      text: "Maintain your and your partners' privacy with this package. We provide a Central London registered office address for your company and free service addresses for all your partners. Official post will be securely processed for you. There are no charges for using our service to make changes to update information about partners when Companies House need to be notified.",
    },
  ],
  lbg: [
    {
      title: 'LBG Company with "ltd"/"limited"',
      price: '£119',
      text: 'This type of company is ideal for sports clubs, trade associations and social clubs. Donors, your fellow guarantors and grant providers will be able to look up your company\'s details at Companies House within one working day of registration. To show that the guarantors are not personally liable for their debts, this type of guarantee company is obliged to add the suffix "LTD" or "limited by guarantee" at the end of its name. A guarantor\'s liability is limited to their contribution, usually £1.',
    },
    {
      title: 'LBG Company "ltd"/"limited" Exemption',
      price: '£133',
      text: 'Use this service to form a guarantee company exempt from the requirement to display the "LTD" suffix after its name. To qualify for the suffix exemption, a company\'s objects should be promoting or regulating commerce, art, science, education, religion, charity, or any profession. We will supply the appropriate Articles of association to the Registrar of Companies. When you make your order, you will be prompted to provide the key objects of your company.',
    },
    {
      title: 'Registered Charity/CIO Application',
      price: '£720',
      text: 'We can now offer the services of our affiliated accountants to register your charity with the Charity Commission. Our affiliates have worked with many charities, and one of their team has served as a trustee of several registered charities.',
    },
  ],
  cic: [
    {
      title: 'CIC-Limited by Guarantee Structure',
      price: '£205',
      text: 'Form a Community Interest Company (CIC) that is limited by guarantee. The inability to distribute profits via dividends makes CICs limited by guarantee more attractive to grant providers. A company can only be registered if the CIC Regulator at Companies House approves the documentation and objects of the company. Our service includes the company\'s formation with the correct paperwork and the application to the CIC Registrar for approval. Companies House have two systems for approving a CIC. If the company has five or fewer officers (guarantors and directors) and those officers are individuals and not corporate bodies, the process can be completed in 3 or 4 days. If there are more than five officers, the entire process may take three or four weeks.',
    },
    {
      title: 'CIC- Limited by Shares Structure',
      price: '£205',
      text: 'Form a Community Interest Company (CIC) that is limited by shares. The conventional share structure and ability to issue dividends makes this type of company attractive to social entrepreneurs. This type of company can attract investors more easily than a company that is limited by guarantee, and directors can be paid market rate salaries. Our service includes the company\'s formation with the correct paperwork and the application to the CIC Registrar for approval. Completion time is as set out above.',
    },
  ],
  nonuk: [
    {
      title: 'Limited Companies for non UK residents',
      price: '£163',
      text: 'This pack is for clients who are not resident in the UK but wish to have a UK company. A UK company does not require any UK nationals or residents. It can be registered by one person only, who will be the sole shareholder and director. The only requirement is a UK address. This pack includes our central London address.',
    },
    {
      title: 'LLP Companies for non UK residents',
      price: '£163',
      text: 'This pack is for clients who are not resident in the UK but wish to have a UK registered partnership with limited liability (LLP). A UK LLP does not require any UK nationals or residents. Two or more overseas residents or companies can register a UK LLP. The only requirement is a UK address. This pack includes our central London address.',
    },
  ],
  other: [
    {
      title: 'Companies with more than 1 class of share',
      price: '£122',
      text: 'This pack enables you to register a company with multiple share classes. Often known as "alphabet shares", each share class can have different voting rights and dividend rights. You will have to enter the various rights attached to each share class during the ordering process.',
    },
    {
      title: 'Formation with own Articles of Association',
      price: '£123',
      text: 'This service allows you to incorporate a company using your own or bespoke Articles of Association. There can be significant consequences to the running of a company when varying the standard Articles of Association as with any legal agreement. This pack is intended for the use of our professional clients or clients that have consulted professional advisers. We are not able to advise you on the drafting of Articles of association.',
    },
  ],
  address: [
    {
      title: 'Registered Office Service',
      price: '£39/Yr.',
      text: 'Maintain your privacy by using our registered office service. All UK companies and limited liability partnerships (LLPs) registered at Companies House need a registered office in the UK. All registered office addresses are shown on the Companies House website, making them public information accessible to anyone, including customers and creditors. The registered office is the company’s official address, and all official communications will be sent to that address. The registered office address must be a physical address that has a street address and a post code. It cannot be a PO Box address. The address must be capable of having official documents served on the directors, which means that a document can be signed for and bought to the attention of a director. A company’s registered office can be the home address of the company’s owners.',
    },
    {
      title: 'Sole Traders Address Service',
      price: '£75/Yr.',
      text: 'This service is available for businesses that are not registered at Companies House. So it can be utilised by Sole traders, Partnerships, Trusts and Associations.',
    },
  ],
  restoration: [
    {
      title: 'Company Restoration Service',
      price: '£110',
      text: 'If your company has been dissolved (struck off) then we can help with the restoration of your company. We specialise in the Administrative Restoration of UK companies (excluding Scotland and Northern Ireland). We can help have your company restored to the register if your company was struck off due to non compliance at Companies House (ie late or non filing of required documents).',
    },
  ],
}

export const included = {
  standard: [
    {
      title: 'New Ready To Trade Company',
      text: 'Start trading as soon as your company is formed. Companies House takes three hours to one working day to process our orders and create a company. The time taken is subject to their workload and opening hours. Once your company is incorporated (registered) at Companies House, it can start trading because it has the legal capacity to enter into contracts, employ staff, make sales and open bank accounts.',
    },
    {
      title: 'Companies House Filing Fee Paid By Us',
      text: 'Companies House charge a fee of £50 for forming a company. They charge formation agents less. Our prices include the Companies House fee, and you will not have to pay extra.',
    },
    {
      title: 'Digital (PDF) Company Documents',
      text: "Our service includes emailed pdf copies of your Certificate of Incorporation, Memorandum and Articles of Association (your company's constitution), Share certificates, statutory books, PSC register etc.",
    },
    {
      title: 'Free Company Administration Portal',
      text: 'All clients receive a free online administration portal linked to Companies House to make changes to their companies.',
    },
    {
      title: 'PSC Register',
      text: 'Your register of Persons of Significant Control is included with your company documents. All companies require this register.',
    },
    {
      title: 'Free Lifetime Support',
      text: 'Email, chatbox and telephone support to assist you with maintaining your Companies House records via your company portal.',
    },
    {
      title: 'Web Authentication Code',
      text: "The web authentication code is a six digit alphanumeric code issued to each company. The code is used to authorise information filed online and is the equivalent of a company officer's signature.",
    },
  ],
  optional: [
    {
      title: 'UK residents can be referred to a High Street Bank',
      text: 'Choose from several banks to open a business bank account. Various options are available to UK residents, including high street banks, the latest fintech banks and banks offering non-status accounts.',
    },
    {
      title: 'Merchant Account Referral',
      text: 'If you intend to accept payment by debit and credit cards, you will need a merchant account. We have several affiliates offering merchant account services.',
    },
    {
      title: 'Free Referral To a Payroll Bureau',
      text: 'If you intend to employ staff or pay yourself as a director a salary over £183 per week, you will need to register for PAYE operate a payroll scheme. Free up your time by letting our affiliate payroll company operate your payroll.',
    },
    {
      title: 'Accountant Referral With Free Initial Consultation',
      text: 'Our affiliate accountants offer a free one-hour consultation to our new clients. Get ahead of your compliance obligations with an online or face to face meeting.',
    },
  ],
  address: [
    {
      title: 'Free Service Address',
      text: 'Included with our registered office service is a free service address for all your company officers and shareholders to maintain their privacy. This service is available no matter how many officers you have, and there are no charges for the second and subsequent years.',
    },
    {
      title: 'Prestigious Central London Address',
      text: 'Use our registered office service, and your address will appear as YOUR COMPANY NAME LTD, 27 Old Gloucester Street, London WC1N 3AX. Our address is in London\'s prestigious business district.',
    },
    {
      title: 'Free Scanned Post Service',
      text: 'Unless you opt for one of our other services, we will scan your official post and place it in our secure docustore system for you to access and download.',
    },
    {
      title: 'Text and Email Notification of Post',
      text: 'Whenever you receive an item of official post, you will be notified so that you can log in to your docustore account to retrieve it.',
    },
    {
      title: 'Safe & Secure Smart Doc Facility',
      text: 'Our document storage system allows you to keep your correspondence safe and secure, and accessible whenever you need it and, providing you have access to the internet, wherever you are. There is no need to search your email box for post; simply log into your docustore account, and it will be there.',
    },
  ],
  restoration: [
    {
      title: 'Companies House status enquiry',
      text: 'If you have been struck off involuntarily by Companies House, it is usually because you have failed to comply with their filing requirements. We will get a list of the missing documents and any penalties outstanding resulting from the missing paperwork.',
    },
    {
      title: 'The preparation of the restoration application form',
      text: 'We will complete the application to Companies House to restore your company on your behalf.',
    },
    {
      title: 'Obtaining the waiver letter from the Treasury Solicitor',
      text: 'We will apply to the Treasury Solicitor to obtain consent to return assets to the restored company. When a company is struck off, its assets become the property of the Crown.',
    },
    {
      title: 'Liaising with CH RE any Late Filing Penalties',
      text: 'There will probably be some filing fees and penalties owing to Companies House, which will need paying before your company can be restored. There will also be some forms that need submitting to make the company compliant with the Companies Acts. We can assist you with these and submit them on your behalf.',
    },
  ],
}

export const steps = [
  {
    title: 'Select Your Company Name',
    text: 'Check your company name with Companies House',
  },
  {
    title: 'Select Services',
    text: 'Pick & Mix the business services you need',
  },
  {
    title: 'Enter Your Company Details',
    text: 'Enter your company & director details.',
  },
  {
    title: 'Make Payment',
    text: 'Add any additional services you need and make secure payment',
  },
]

export const blogs = [
  {
    title: 'UK Companies Limited by Shares vs UK Limited Liability Partnerships: Understanding the Differences',
    excerpt:
      'When establishing a business in the United Kingdom, one of the most critical decisions entrepreneurs face is choosing the appropriate legal structure.',
  },
  {
    title: 'Embracing the Digital Nomad Lifestyle: The Advantages of a UK Registered Company.',
    excerpt:
      'In today’s digital age, the concept of traditional office spaces is rapidly evolving. With the rise of remote work, individuals are embracing the freedom to travel the globe without sacrificing their careers.',
  },
  {
    title: 'What is a Certified B Corporation?',
    excerpt:
      'Certified B corporations can be defined as businesses that adhere to the topmost criteria of verified environmental and social performance, transparency, and legal answerability to keep a balance between purpose and profits.',
  },
]

export const agentBenefits = [
  'Automated referrals to banks',
  'Registered office services and mail handling to maintain confidentiality',
  'Company administration portals.',
  'Free referrals to accountants',
  'Vat registration',
]

export const whyChoose = [
  {
    title: 'Experienced staff',
    text: 'Our team have been supplying address and company formation services since 2011. We signed up with Trustpilot in 2013 when we received our first 5 star review, so our history is clear to see.',
  },
  {
    title: 'Address service and mail handling',
    text: "Most of our company formation clients prefer to buy our registered office service when they apply to register a company. The key to providing an address service is how client post is handled. Our basic address service comes with several upgrades that clients find particularly useful. Our service has evolved over time to suit all our clients' needs. Clients who travel a lot or are based outside the UK are particularly well catered for. Our various address services are detailed on other pages of our website.",
  },
  {
    title: 'Prestigious address',
    text: "Our office is located in the heart of London's medical and professional services district. Choose our address service with your company formation to give your clients confidence in you.",
  },
  {
    title: 'Pricing',
    text: 'We have made a considerable effort over the years to keep our prices amongst the lowest of any company formation agent in London.',
  },
  {
    title: 'Specialised services',
    text: 'In addition to company formation, we have become specialists in the following:',
    bullets: [
      'Community Interest Companies (CICs). We currently form between 120 and 150 CICs each year',
      'Administrative company restorations. We currently restore over 150 companies each year that the Registrar of Companies has struck off the Companies House Register.',
    ],
  },
  {
    title: 'Companies House Authorisation',
    text: 'We are authorised by Companies House to provide company formation services.',
  },
  {
    title: 'Life Time Support',
    text: 'Like most company formation agents, we provide each client with a free portal with which they can administer all their companies for the life of those companies.',
  },
]

export const faqs = [
  {
    q: 'Why do I need a company?',
    a: 'You will need a limited company to protect yourself and your personal assets from debts that can arise from being in business. There are many advantages to using limited companies for your trading activities, but debt protection is one of the main ones.',
  },
  {
    q: 'How long does it take to form a company?',
    a: 'It can take as little as 24 hours to form a company, but it depends on many factors. When you place an order with a company formation agent such as us, you can do so at any time; our websites are 24/7, but we submit those orders to Companies House, which does not operate a 24/7 service. Their office hours are Monday to Friday, 8 a.m. to 6 p.m and they are closed on bank holidays. So if you place an order with us on a Friday night, companies House will not process it until Monday. Furthermore, there are times when Companies House is very busy and the processing time takes longer. Delays can also arise if there are IT glitches at Companies House. In our experience, IT glitches at Companies House are very rare.',
  },
  {
    q: 'When can I start trading?',
    a: 'As soon as you receive an email with your Certificate of Incorporation, your company can start trading. It can immediately enter into contracts, make sales, employ staff and buy goods and services. It has full legal capacity even though it does not yet have a bank account.',
  },
  {
    q: 'What types of company are there?',
    a: 'There are three types of company you can form on our website.',
    bullets: [
      'Company limited by shares. These can be formed by one person who can be the only shareholder and director. Or by many shareholders with many directors. They are the most popular company trading structure in the UK.',
      'Companies Limited by Guarantee. This type of company structure is normally used for non-profit organisations such as clubs, associations, charities and social enterprises. Instead of shareholders, they have guarantors who guarantee a minimal amount, usually £1. A company limited by guarantee can be formed with 1 person being the only guarantor and director.',
      'Limited Liability Partnerships. This type of company structure is commonly used by professional organisations such as accountants, engineers and solicitors. The LLP structure allows flexible profit-sharing arrangements amongst the partners. LLPs require at least two persons as partners.',
    ],
  },
  {
    q: 'What information is needed to form a company?',
    a: 'For this information, go to our guide BEFORE YOU START.',
  },
  {
    q: 'What happens with the company if my business does not start?',
    a: 'If you form a company and keep it dormant because you change your mind about trading, you can ask us to dissolve it for you. Our charge for this service is £36+vat plus £35 companies house filing fee.',
  },
]

export const footer = {
  tradingName: 'is a trading name of Smart Registrations Limited',
  companyNr: 'Company Nr: 12123095.',
  vat: 'VAT Registration Nr: 328383976',
  ico: 'ICO Registration Reference: ZA872655',
  acsp: 'ACSP Nr: AP006944',
  address: '27 Old Gloucester Street, London, WC1N 3AX, UK',
  columns: [
    {
      title: 'Formation Services:',
      links: [
        'Limited Companies',
        'LLP Companies',
        'Community Interest Company (LBG)',
        'Charity -Limited by Guarantee',
        'More than 1 class of share companies',
        'Supplying Own or Bespoke Articles',
      ],
    },
    {
      title: 'Non-UK Services:',
      links: ['LTD Companies for Non-UK Residents', 'LLP Companies for Non-UK Residents'],
    },
    {
      title: 'Additional Services:',
      links: ['Registered Office Service', 'Virtual Address Service', 'Company Restoration Service'],
    },
    {
      title: 'Legal:',
      links: ['Terms & Conditions', 'GDPR Privacy Policy', 'Refund & Cancellation Policy', 'Cookies Policy'],
    },
    {
      title: 'General Links:',
      links: ['Home', 'Contact Us', 'Sitemap', 'Blogs'],
    },
  ],
}
