// ─────────────────────────────────────────────
//  KRYPTROZ collection data — edit anytime.
// ─────────────────────────────────────────────

export const COLLECTION = {
  name: 'KRYPTROZ',
  tagline: 'BORN IN WEB',
  chain: 'Ethereum',
  supply: 666,
  mintPrice: 'TBA',
  wlPrice: 'TBA',
  currency: 'ETH',
  mintDate: 'TBA',
  maxPerWallet: 1,
}

export const STATS = [
  { label: 'Total Supply', value: '666', count: 666 },
  { label: 'Mint Price', value: 'TBA' },
  { label: 'Mint Date', value: 'TBA' },
  { label: 'Chain', value: 'ETH' },
  { label: 'Max / Wallet', value: '1', count: 1 },
]

export const STORY = [
  {
    tag: 'THE_LEAK',
    title: 'Something crawled out of the Ethernet.',
    body: 'In a dead server nobody was watching, 666 corrupted files woke up. Half-rendered, half-alive — portraits stitched from broken pixels, halftone dust and violet noise. They call themselves the KRYPTROZ.',
  },
  {
    tag: 'THE_SIGNAL',
    title: 'They are not a bug. They are the message.',
    body: 'Each KRYPTROZ carries a fragment of a signal that predates the chain. Owning one means you can read a piece of it. Collect enough, and the full transmission decrypts.',
  },
  {
    tag: 'THE_WARNING',
    title: 'The green graph can be DECEIVING.',
    body: 'Ape in with caution. Walk by at your own risk. To die is to DYOR. The phantoms do not care about your floor price — they only want to spread.',
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
    phase: 'PHASE 00',
    title: 'BOOT SEQUENCE',
    status: 'done',
    items: [
      'Art & lore engineered — 666 unique phantoms',
      'Community terminal opens (Discord + X)',
      'Whitelist raids & collab drops',
    ],
  },
  {
    phase: 'PHASE 01',
    title: 'THE MINT',
    status: 'active',
    items: [
      'Whitelist mint — price TBA',
      'Public mint — price TBA',
      'Reveal — phantoms decrypt on-chain',
    ],
  },
  {
    phase: 'PHASE 02',
    title: 'SPREAD',
    status: 'next',
    items: [
      'Holder-only glitch generator tool',
      'Rarity ranks + trait staking',
      'Secondary royalties fund the treasury',
    ],
  },
  {
    phase: 'PHASE 03',
    title: 'FULL CORRUPTION',
    status: 'next',
    items: [
      'KRYPTROZ animated PFP pack',
      'IRL glitch merch drop',
      'Season 2 — the signal completes',
    ],
  },
]

export const FAQ = [
  {
    q: 'What is KRYPTROZ?',
    a: 'A collection of 666 glitch-born animated phantoms on Ethereum. Y2K webcore art, real lore, holder utility.',
  },
  {
    q: 'How do I get whitelisted?',
    a: 'Be active in the community terminal (Discord), grab a role through raids, collabs and events, then submit your wallet in the whitelist panel below.',
  },
  {
    q: 'When is mint?',
    a: 'Mint date is TBA — announced to whitelist and Discord first. Turn on notifications so you do not miss the boot sequence.',
  },
  {
    q: 'What are the prices?',
    a: 'Mint price is TBA. Supply is 666 and it is strictly max 1 per wallet — everyone gets exactly one phantom.',
  },
]

// Whitelist quests — set real links in href
export const QUESTS = [
  { id: 'follow', label: 'Follow @KRYPTROZ on X', href: 'https://x.com/KRYPTROZ' },
  { id: 'like', label: 'Like the pinned @KRYPTROZ post', href: 'https://x.com/KRYPTROZ' },
  { id: 'rt', label: 'Retweet the pinned @KRYPTROZ post', href: 'https://x.com/KRYPTROZ' },
  { id: 'comment', label: 'Comment under the pinned post', href: 'https://x.com/KRYPTROZ' },
  { id: 'post', label: 'Post about KRYPTROZ (tag us)', href: 'https://x.com/intent/post?text=666%20phantoms%20are%20leaking%20out%20of%20a%20dead%20server.%20%40KRYPTROZ%20%23KRYPTROZ' },
  { id: 'discord', label: 'Join the community terminal (Discord)', href: 'https://discord.gg/' },
]

export const SOCIALS = [
  { label: 'X / TWITTER', href: 'https://x.com/KRYPTROZ' },
  { label: 'DISCORD', href: '#' },
  { label: 'OPENSEA', href: '#' },
]
