import './WhyWorkHallSection.css'

export default function WhyWorkHallSection() {
  return (
    <section className="wh-outer" aria-labelledby="why-workhall-title">
      <div className="wh-card">
        <img className="wh-bg" src="/whyworkhall.png" alt="" />

        <div className="wh-content">
          <div className="wh-kicker">
            <span className="wh-kicker__square" aria-hidden="true" />
            <span>Why Work Hall</span>
          </div>

          <h2 id="why-workhall-title" className="wh-title">
            <span>Work Hall over any other</span>
            <span>Still, why should you choose</span>
            <span>co-working space?</span>
          </h2>
        </div>
      </div>
    </section>
  )
}
