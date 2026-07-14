import { useState } from 'react'
import { motion } from 'framer-motion'
import { FAQ } from '../data/collection'

export default function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <section className="section" id="faq">
      <div className="section-head">
        <span className="section-index mono">[05]</span>
        <h2 className="section-title glitch" data-text="SYSTEM LOGS">
          SYSTEM LOGS
        </h2>
      </div>

      <div className="faq-list">
        {FAQ.map((f, i) => {
          const isOpen = open === i
          const questionId = `faq-question-${i}`
          const answerId = `faq-answer-${i}`
          return (
            <div className={`faq-item ${isOpen ? 'open' : ''}`} key={f.q}>
              <button
                id={questionId}
                className="faq-q"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                aria-controls={answerId}
              >
                <span className="faq-index mono">Q{i + 1}</span>
                <span className="faq-text gtx">{f.q}</span>
                <span className="faq-toggle mono">{isOpen ? '[-]' : '[+]'}</span>
              </button>
              <motion.div
                id={answerId}
                className="faq-a-wrap"
                role="region"
                aria-labelledby={questionId}
                hidden={!isOpen}
                initial={false}
                animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="faq-a mono">{f.a}</p>
              </motion.div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
