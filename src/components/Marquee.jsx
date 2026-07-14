const ITEMS = [
  'SUPPLY: TBA',
  'CORRUPTION EVENT: TBA',
  'CHAIN: ETHEREUM',
  'PRICE: TBA',
  'MAX 1 / WALLET',
  'NO SIGNAL',
  'CORRUPTED IDENTITIES: TBA',
  'REALITY NOT FOUND',
]

export default function Marquee() {
  const row = [...ITEMS, ...ITEMS]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {row.map((item, i) => (
          <span className="marquee-item" key={i}>
            <b>▚</b> {item}
          </span>
        ))}
        {row.map((item, i) => (
          <span className="marquee-item" key={'b' + i}>
            <b>▚</b> {item}
          </span>
        ))}
      </div>
    </div>
  )
}
