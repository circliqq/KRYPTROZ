export default function CRTOverlay() {
  return (
    <div className="crt-overlay" aria-hidden="true">
      <div className="crt-scanlines" />
      <div className="crt-noise" />
      <div className="crt-vignette" />
      <div className="crt-flicker" />
    </div>
  )
}
