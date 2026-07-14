import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AnimatePresence } from 'framer-motion'
import Preloader from './components/Preloader'
import CRTOverlay from './components/CRTOverlay'
import GlitchBursts from './components/GlitchBursts'
import Cursor from './components/Cursor'
import ChannelFlash from './components/ChannelFlash'
import Decrypt from './components/Decrypt'
import StatusTicker from './components/StatusTicker'
import TrackBar from './components/TrackBar'
import SoundToggle from './components/SoundToggle'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Story from './components/Story'
import Collection from './components/Collection'
import Rarity from './components/Rarity'
import Roadmap from './components/Roadmap'
import Faq from './components/Faq'
import Whitelist from './components/Whitelist'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [booted, setBooted] = useState(false)

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true })
    window.__lenis = lenis
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
      delete window.__lenis
    }
  }, [])

  return (
    <>
      <AnimatePresence mode="wait">
        {!booted && <Preloader key="preloader" onDone={() => setBooted(true)} />}
      </AnimatePresence>
      <CRTOverlay />
      <GlitchBursts />
      <Cursor />
      <ChannelFlash />
      <Decrypt />
      <StatusTicker />
      <TrackBar />
      <SoundToggle />
      <Nav booted={booted} />
      <main>
        <Hero booted={booted} />
        <Marquee />
        <Story />
        <Collection />
        <Rarity />
        <Roadmap />
        <Faq />
        <Whitelist />
      </main>
    </>
  )
}
