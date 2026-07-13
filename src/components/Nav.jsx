import { motion } from 'framer-motion'

const links = [
  { label: 'STORY', href: '#story' },
  { label: 'COLLECTION', href: '#collection' },
  { label: 'RARITY', href: '#rarity' },
  { label: 'ROADMAP', href: '#roadmap' },
  { label: 'FAQ', href: '#faq' },
]

const go = (e, href) => {
  e.preventDefault()
  window.dispatchEvent(new Event('ctz:flash'))
  if (window.__lenis) {
    window.__lenis.scrollTo(href, { duration: 1.1 })
  } else {
    document.querySelector(href)?.scrollIntoView()
  }
}

export default function Nav({ booted }) {
  return (
    <motion.header
      className="nav"
      initial={{ y: -40, opacity: 0 }}
      animate={booted ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
    >
      <a
        className="nav-logo glitch-hover"
        data-text="KRYPTROZ"
        href="#hero"
        onClick={(e) => go(e, '#hero')}
      >
        KRYPTROZ
      </a>
      <nav className="nav-links">
        {links.map((l, i) => (
          <a key={l.label} href={l.href} className="nav-link" onClick={(e) => go(e, l.href)}>
            <span className="nav-index">0{i + 1}</span>
            {l.label}
          </a>
        ))}
      </nav>
      <a
        className="nav-cta mono glitch-hover"
        data-text="JOIN WHITELIST"
        href="#whitelist"
        onClick={(e) => go(e, '#whitelist')}
      >
        JOIN WHITELIST
      </a>
    </motion.header>
  )
}
