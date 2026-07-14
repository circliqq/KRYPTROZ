// ─────────────────────────────────────────────
//  KRYPTROZ collection data — edit anytime.
// ─────────────────────────────────────────────

export const COLLECTION = {
  name: 'KRYPTROZ',
  tagline: 'REALITY NOT FOUND',
  chain: 'Ethereum',
  supply: 666,
  mintPrice: 'TBA',
  wlPrice: 'TBA',
  currency: 'ETH',
  mintDate: 'TBA',
  maxPerWallet: 1,
}

export const STATS = [
  { label: 'Corrupted Identities', value: '666', count: 666 },
  { label: 'Corruption Price', value: 'TBA' },
  { label: 'Corruption Event', value: 'TBA' },
  { label: 'Chain', value: 'ETH' },
  { label: 'Max / Wallet', value: '1', count: 1 },
]

export const STORY = [
  {
    tag: 'UNKNOWN_ORIGIN',
    title: 'Nobody knows where KRYPTROZ came from.',
    body: 'Nobody knows who created them. Nobody knows why reality started breaking. All we know is this: 666 corrupted identities remain.',
  },
  {
    tag: 'THE_UNIVERSE',
    title: 'Reality is not ending. Reality is corrupting.',
    body: 'The glitches are spreading. Every identity is trapped between reality and the digital world. The signal is no longer contained.',
  },
  {
    tag: 'THE_DIFFERENCE',
    title: "Reality is breaking. You're becoming part of it.",
    body: 'Most collections say: buy our NFTs. KRYPTROZ is a recognizable digital universe. Becoming a Carrier means becoming part of the corruption.',
  },
  {
    tag: 'CORE_PROCESS',
    title: 'Not another PFP collection.',
    body: 'Every piece of art, every post and every design choice follows the same glitch-driven identity. KRYPTROZ should be recognizable instantly—not because of hype, but because the universe feels different.',
  },
]

// Real collection previews — files in public/collection/
export const CARDS = [
  { id: '#013', src: '/collection/13.mp4', name: 'EYES.EXE', rarity: 'MYTHIC', feature: true },
  { id: '#004', src: '/collection/4.mp4', name: 'HUSH PROTOCOL', rarity: 'MYTHIC' },
  { id: '#019', src: '/collection/19.mp4', name: 'BLUE SCREEN', rarity: 'EPIC' },
  { id: '#020', src: '/collection/20.mp4', name: 'WHITEOUT', rarity: 'COMMON', locked: true },
  { id: '#016', src: '/collection/16.mp4', name: 'GLITCH MOTH', rarity: 'RARE', locked: true },
  { id: '#015', src: '/collection/15.mp4', name: 'PINK STATIC', rarity: 'EPIC', locked: true },
]

export const RARITY = [
  { tier: 'COMMON', share: 60.0, desc: 'Standard corruption. Still dangerous.', color: 'var(--dim)' },
  { tier: 'RARE', share: 26.0, desc: 'Unstable traits. Flickers when watched.', color: 'var(--cyan)' },
  { tier: 'EPIC', share: 10.0, desc: 'Deep-fried signal. Reads fragments aloud.', color: 'var(--magenta)' },
  { tier: 'MYTHIC', share: 4.0, desc: 'Fully decrypted. It knows your wallet.', color: 'var(--phosphor)' },
]

export const ROADMAP = [
  {
    phase: 'PHASE 01',
    title: 'REALITY BEGINS TO CRACK',
    status: 'active',
    items: ['The first fractures appear across the signal.'],
  },
  {
    phase: 'PHASE 02',
    title: 'THE CORRUPTION SPREADS',
    status: 'next',
    items: ['The glitches spread through the Network.'],
  },
  {
    phase: 'PHASE 03',
    title: 'MANIFESTATION',
    status: 'next',
    items: ['The Genesis Corruption begins. 666 identities manifest.'],
  },
  {
    phase: 'PHASE 04',
    title: 'NETWORK EXPANSION',
    status: 'next',
    items: ['The Network expands beyond the original signal.'],
  },
  {
    phase: 'PHASE 05',
    title: 'REALITY OVERRIDE',
    status: 'next',
    items: ['Reality gives way to the KRYPTROZ universe.'],
  },
]

export const FAQ = [
  {
    q: 'What is KRYPTROZ?',
    a: 'A recognizable digital universe built around 666 corrupted identities trapped between reality and the digital world.',
  },
  {
    q: 'How do I get Priority Access?',
    a: 'Join the Network, follow official transmissions and complete the access protocol when the gate opens.',
  },
  {
    q: 'When is the Corruption Event?',
    a: 'The Genesis Corruption date is TBA. Priority Access carriers will receive the signal first through official KRYPTROZ channels.',
  },
  {
    q: 'How many identities remain?',
    a: '666 corrupted identities remain. The Corruption Event is limited to one identity per eligible wallet.',
  },
]

// Whitelist quests — set real links in href
// Flip to true when the whitelist opens — form + quests appear again
export const WHITELIST_OPEN = false

export const QUESTS = [
  { id: 'follow', label: 'Follow @KRYPTROZ on X', href: 'https://x.com/KRYPTROZ' },
  { id: 'like', label: 'Like the pinned @KRYPTROZ post', href: 'https://x.com/KRYPTROZ' },
  { id: 'rt', label: 'Retweet the pinned @KRYPTROZ post', href: 'https://x.com/KRYPTROZ' },
  { id: 'comment', label: 'Comment under the pinned post', href: 'https://x.com/KRYPTROZ' },
  { id: 'post', label: 'Transmit the KRYPTROZ signal (tag us)', href: 'https://x.com/intent/post?text=Reality%20is%20breaking.%20666%20corrupted%20identities%20remain.%20%40KRYPTROZ%20%23KRYPTROZ' },
  { id: 'discord', label: 'Join the Network (Discord)', href: 'https://discord.gg/' },
]

export const SOCIALS = [
  { label: 'X / TWITTER', href: 'https://x.com/KRYPTROZ' },
  { label: 'DISCORD', href: '#' },
  { label: 'OPENSEA', href: '#' },
]
