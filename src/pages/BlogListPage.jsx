import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'
import { blogPosts } from '../data/blogPosts.js'
import usePageMeta from '../hooks/usePageMeta.js'

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  } catch {
    return iso
  }
}

export default function BlogListPage() {
  usePageMeta(
    'Blog | UK.company',
    'Guides and articles from UK.company on UK company formation, structures, non-UK founders and growing your business.',
    '/blog'
  )

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <section className="formation-hero">
        <div className="container formation-hero-inner">
          <Reveal variant="top">
            <nav className="formation-breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span>Blog</span>
            </nav>
            <p className="section-label">Publishing</p>
            <h1>Our latest blogs</h1>
            <p className="formation-hero-lead">
              Practical guidance on UK company structures, non-resident formation and growing your
              business.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="product-hub-section">
        <div className="container">
          <div className="blog-list-grid">
            {blogPosts.map((post, i) => (
              <Reveal key={post.slug} variant="popup" delay={i * 80}>
                <article className="blog-card">
                  <Link to={`/blog/${post.slug}`} className="blog-card-media">
                    <img src={post.image} alt="" />
                  </Link>
                  <div className="blog-card-body">
                    <p className="blog-card-meta">{formatDate(post.date)}</p>
                    <h2>
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <p>{post.excerpt}</p>
                    <Link to={`/blog/${post.slug}`} className="btn btn-primary">
                      Read more
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
