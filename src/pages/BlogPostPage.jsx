import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'
import { getBlogPost, blogPosts } from '../data/blogPosts.js'
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

export default function BlogPostPage() {
  const { slug } = useParams()
  const post = getBlogPost(slug)
  const related = blogPosts.filter((p) => p.slug !== slug).slice(0, 2)

  usePageMeta(
    post ? `${post.title} | UK.company Blog` : 'Blog | UK.company',
    post?.excerpt || 'UK.company blog article.',
    post ? `/blog/${post.slug}` : '/blog'
  )

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!post) return <Navigate to="/blog" replace />

  return (
    <>
      <section className="formation-hero">
        <div className="container formation-hero-inner">
          <Reveal variant="top">
            <nav className="formation-breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span aria-hidden="true">/</span>
              <Link to="/blog">Blog</Link>
              <span aria-hidden="true">/</span>
              <span>{post.title}</span>
            </nav>
            <p className="section-label">{formatDate(post.date)}</p>
            <h1>{post.title}</h1>
            <p className="formation-hero-lead">{post.excerpt}</p>
          </Reveal>
        </div>
      </section>

      <section className="product-hub-section">
        <div className="container legal-layout">
          <Reveal variant="left">
            <article className="legal-article blog-article">
              <img src={post.image} alt="" className="blog-hero-image" />
              {post.body.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
              <div className="hero-actions" style={{ marginTop: 28 }}>
                <Link to="/formations" className="btn btn-primary">
                  View formations
                </Link>
                <Link to="/contact" className="btn btn-outline">
                  Contact us
                </Link>
              </div>
            </article>
          </Reveal>
          <aside className="product-hub-card">
            <h2>More articles</h2>
            <ul className="legal-nav-list">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link to={`/blog/${item.slug}`}>{item.title}</Link>
                </li>
              ))}
              <li>
                <Link to="/blog">All blogs</Link>
              </li>
            </ul>
          </aside>
        </div>
      </section>
    </>
  )
}
