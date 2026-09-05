/** Blog posts for Phase 3 publishing. */

export const blogPosts = [
  {
    slug: 'ltd-vs-llp-differences',
    title: 'UK Companies Limited by Shares vs UK Limited Liability Partnerships: Understanding the Differences',
    excerpt:
      'When establishing a business in the United Kingdom, one of the most critical decisions entrepreneurs face is choosing the appropriate legal structure.',
    date: '2026-03-12',
    image: '/news-1.jpg',
    tags: ['Formations', 'Structures'],
    body: [
      'When establishing a business in the United Kingdom, one of the most critical decisions entrepreneurs face is choosing the appropriate legal structure.',
      'A private limited company (LTD) limited by shares is the most common structure for trading businesses. Directors manage the company and shareholders own it. Liability is generally limited to unpaid share capital.',
      'A limited liability partnership (LLP) is often used by professional practices. Members take part in the business and enjoy limited liability, with different filing and tax treatment compared with an LTD.',
      'Which option fits depends on ownership, tax planning, banking needs and how you want to raise capital. If you are unsure, speak with an accountant before you form - then choose a clear package on UK.company and complete identity checks as required.',
    ],
  },
  {
    slug: 'digital-nomad-uk-company',
    title: 'Embracing the Digital Nomad Lifestyle: The Advantages of a UK Registered Company',
    excerpt:
      'In today’s digital age, the concept of traditional office spaces is rapidly evolving. With the rise of remote work, individuals are embracing the freedom to travel the globe without sacrificing their careers.',
    date: '2026-02-18',
    image: '/news-2.jpg',
    tags: ['Non-UK', 'Address'],
    body: [
      'In today’s digital age, the concept of traditional office spaces is rapidly evolving. With the rise of remote work, individuals are embracing the freedom to travel the globe without sacrificing their careers.',
      'A UK registered company can give overseas founders a recognised structure for contracting, invoicing and building credibility. Non-UK residents can form a UK company when a UK registered office address is in place.',
      'Identity verification still applies. Pair formation with a proper address and mail service - such as MyUKPost.com - so official post is handled securely while you travel.',
      'Explore our International / Non-UK formation packs if you are based outside the UK, and complete ID checks before filing.',
    ],
  },
  {
    slug: 'what-is-a-certified-b-corporation',
    title: 'What is a Certified B Corporation?',
    excerpt:
      'Certified B corporations can be defined as businesses that adhere to the topmost criteria of verified environmental and social performance, transparency, and legal answerability to keep a balance between purpose and profits.',
    date: '2026-01-22',
    image: '/news-3.jpg',
    tags: ['Guides'],
    body: [
      'Certified B corporations can be defined as businesses that adhere to the topmost criteria of verified environmental and social performance, transparency, and legal answerability to keep a balance between purpose and profits.',
      'B Corp certification is separate from your Companies House legal structure. Many B Corps still use a standard UK limited company as the underlying vehicle.',
      'If your mission needs a community focus, you may also look at Community Interest Companies (CICs) - a UK structure with an asset lock and community purpose. We form CICs regularly alongside standard LTD packages.',
      'Whatever structure you choose, clear filings, identity checks and a professional registered office help your company look credible from day one.',
    ],
  },
]

export function getBlogPost(slug) {
  return blogPosts.find((p) => p.slug === slug) || null
}
