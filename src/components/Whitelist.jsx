import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SOCIALS, COLLECTION, QUESTS, WHITELIST_OPEN } from '../data/collection'
import { supabase } from '../lib/supabase'

gsap.registerPlugin(ScrollTrigger)

const load = () => {
  try {
    return JSON.parse(localStorage.getItem('ctz-quests')) || []
  } catch {
    return []
  }
}

export default function Whitelist() {
  const root = useRef(null)
  const [done, setDone] = useState(load)
  const [handle, setHandle] = useState('')
  const [postLink, setPostLink] = useState('')
  const [commentLink, setCommentLink] = useState('')
  const [wallet, setWallet] = useState('')
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)
  const [busy, setBusy] = useState(false)
  const [count, setCount] = useState(null)

  useEffect(() => {
    try {
      localStorage.setItem('ctz-quests', JSON.stringify(done))
    } catch {
      /* private mode */
    }
  }, [done])

  useEffect(() => {
    if (!supabase) return
    supabase
      .rpc('whitelist_count')
      .then(({ data }) => {
        if (typeof data === 'number') setCount(data)
      })
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.wl-panel',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.wl-grid', start: 'top 80%' },
        }
      )
    }, root)
    return () => ctx.revert()
  }, [])

  const toggle = (id) =>
    setDone((d) => (d.includes(id) ? d.filter((x) => x !== id) : [...d, id]))

  const pct = Math.round((done.length / QUESTS.length) * 100)

  const submit = async (e) => {
    e.preventDefault()
    if (!handle.trim() || !wallet.trim()) {
      setError('> ERROR: X HANDLE + WALLET REQUIRED')
      return
    }
    setError('')
    const row = {
      handle: handle.trim(),
      post_link: postLink.trim() || null,
      comment_link: commentLink.trim() || null,
      wallet: wallet.trim().toLowerCase(),
      quests: done.join(', ') || null,
    }
    if (!supabase) {
      console.warn('[KRYPTROZ] Supabase not configured — submission:', row)
      setSent(true)
      return
    }
    setBusy(true)
    const { error: dbError } = await supabase.from('whitelist').insert(row)
    setBusy(false)
    if (dbError) {
      if (dbError.code === '23505') {
        setError('> ERROR: WALLET ALREADY ON THE LIST')
      } else {
        setError('> ERROR: TRANSMISSION FAILED — TRY AGAIN')
        console.error('[KRYPTROZ]', dbError)
      }
      return
    }
    setCount((c) => (typeof c === 'number' ? c + 1 : c))
    setSent(true)
  }

  return (
    <section className="section whitelist" id="whitelist" ref={root}>
      <div className="section-head">
        <span className="section-index mono">[06]</span>
        <h2 className="section-title glitch" data-text="PRIORITY ACCESS">
          PRIORITY ACCESS
        </h2>
      </div>

      <p className="wl-sub mono">
        CORRUPTION PRICE {COLLECTION.mintPrice} — GENESIS CORRUPTION {COLLECTION.mintDate} — MAX{' '}
        {COLLECTION.maxPerWallet} / WALLET
        {typeof count === 'number' && (
          <span className="wl-count"> — {count} SIGNALS LOGGED — SUPPLY {COLLECTION.supply}</span>
        )}
      </p>

      {WHITELIST_OPEN ? (
      <div className="wl-grid">
        <div className="wl-panel">
          <div className="wl-panel-head mono">
            <span>ACCESS PROTOCOL · {QUESTS.length}</span>
            <span className="wl-pct">{pct}% READY</span>
          </div>
          <div className="wl-progress">
            <div className="wl-progress-fill" style={{ width: `${pct}%` }} />
          </div>
          <ul className="quest-list">
            {QUESTS.map((q) => {
              const checked = done.includes(q.id)
              return (
                <li className={`quest ${checked ? 'done' : ''}`} key={q.id}>
                  <button
                    type="button"
                    className="quest-check mono"
                    onClick={() => toggle(q.id)}
                    aria-pressed={checked}
                  >
                    {checked ? '▣' : '▢'}
                  </button>
                  <span className="quest-label mono">{q.label}</span>
                  <a
                    className="quest-open mono"
                    href={q.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    OPEN ↗
                  </a>
                </li>
              )
            })}
          </ul>
        </div>

        <form className="wl-panel" onSubmit={submit}>
          <div className="wl-panel-head mono">
            <span>YOUR DETAILS</span>
            <span className="wl-pct">* REQUIRED</span>
          </div>

          {sent ? (
            <div className="wl-done mono">
              &gt; APPLICATION RECEIVED_
              <br />
              <span className="dim">
                PRIORITY ACCESS REQUEST LOGGED. WATCH FOR THE CORRUPTION SIGNAL.
              </span>
            </div>
          ) : (
            <>
              <label className="wl-label mono">
                X / TWITTER HANDLE *
                <input
                  className="wl-field mono"
                  type="text"
                  placeholder="@yourhandle"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  spellCheck="false"
                />
              </label>
              <label className="wl-label mono">
                LINK TO YOUR POST
                <input
                  className="wl-field mono"
                  type="url"
                  placeholder="https://x.com/you/status/…"
                  value={postLink}
                  onChange={(e) => setPostLink(e.target.value)}
                  spellCheck="false"
                />
              </label>
              <label className="wl-label mono">
                COMMENT LINK
                <input
                  className="wl-field mono"
                  type="url"
                  placeholder="https://x.com/…/status/…"
                  value={commentLink}
                  onChange={(e) => setCommentLink(e.target.value)}
                  spellCheck="false"
                />
              </label>
              <label className="wl-label mono">
                WALLET * <span className="dim">(identity destination)</span>
                <input
                  className="wl-field mono"
                  type="text"
                  placeholder="0x…"
                  value={wallet}
                  onChange={(e) => setWallet(e.target.value)}
                  spellCheck="false"
                />
              </label>

              {error && <p className="wl-error mono">{error}</p>}

              <button
                className="wl-submit mono glitch-hover"
                data-text="[ SUBMIT APPLICATION ]"
                type="submit"
                disabled={busy}
              >
                {busy ? '[ TRANSMITTING… ]' : '[ SUBMIT APPLICATION ]'}
              </button>
              <p className="wl-note mono">
                ONE ENTRY PER WALLET. NO CONNECT. NO SIGNATURE. ADDRESS ONLY.
              </p>
            </>
          )}
        </form>
      </div>
      ) : (
        <div className="wl-soon terminal">
          <div className="terminal-bar">
            <span>PRIORITY ACCESS PROTOCOL</span>
            <span className="dots">
              <span />
              <span />
              <span />
            </span>
          </div>
          <div className="terminal-body wl-soon-body">
            <div>
              <span className="prompt">&gt;</span> priority-access --status
            </div>
            <div className="dim">ACCESS OFFLINE — GATE SEALED</div>
            <div>
              <span className="prompt">&gt;</span> eta
            </div>
            <div className="wl-soon-title glitch" data-text="COMING SOON">
              COMING SOON
            </div>
            <div className="dim">
              THE GATE OPENS WITHOUT WARNING. FOLLOW THE SIGNAL.
            </div>
            <a
              className="wl-soon-cta mono glitch-hover"
              data-text="[ FOLLOW @KRYPTROZ ]"
              href="https://x.com/KRYPTROZ"
              target="_blank"
              rel="noreferrer"
            >
              [ FOLLOW @KRYPTROZ ]
            </a>
          </div>
        </div>
      )}

      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="footer-logo glitch-hover" data-text="KRYPTROZ">
              KRYPTROZ
            </span>
            <p className="footer-tag mono">
              Corrupted identity supply: TBA.
              <br />
              Reality is corrupting. Genesis Corruption TBA.
            </p>
          </div>
          <div className="footer-col mono">
            <span className="footer-head">SIGNAL</span>
            {SOCIALS.map((so) => (
              <a key={so.label} href={so.href} target="_blank" rel="noreferrer">
                {so.label}
              </a>
            ))}
          </div>
          <div className="footer-col mono">
            <span className="footer-head">NAVIGATE</span>
            {[
              ['ORIGIN', '#story'],
              ['IDENTITIES', '#collection'],
              ['CORRUPTION TIMELINE', '#roadmap'],
              ['PRIORITY ACCESS', '#whitelist'],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                onClick={(e) => {
                  e.preventDefault()
                  window.dispatchEvent(new Event('ctz:flash'))
                  window.__lenis?.scrollTo(href, { duration: 1.1 })
                }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
        <div className="footer-bottom mono">
          <span>© 2026 KRYPTROZ — ALL FREQUENCIES RESERVED</span>
          <span>BROADCAST ENDS — STATIC CONTINUES</span>
        </div>
      </footer>
    </section>
  )
}
