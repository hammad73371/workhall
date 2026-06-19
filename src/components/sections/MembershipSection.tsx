import type { CSSProperties } from 'react'
import { membershipDayNotes, membershipSteps, membershipWords } from '../../data/siteContent'
import { RotatingText } from '../shared/effects'

export function MembershipSection() {
  return (
    <section className="story-band membership-band" id="why-work-hall" aria-labelledby="story-title">
      <div className="membership-copy">
        <div className="section-kicker">How membership works</div>
        <h2 id="story-title">A workday that leaves room for <RotatingText texts={membershipWords} mainClassName="membership-rotating-word" splitLevelClassName="membership-rotating-word__group" elementLevelClassName="membership-rotating-word__letter" staggerFrom="last" staggerDuration={0.022} rotationInterval={2300} transition={{ type: 'spring', damping: 30, stiffness: 420 }} /></h2>
        <p>No cold front-desk energy. Tell us how your team moves through the day, walk the space, and let the room handle the small frictions before they turn into noise.</p>
        <div className="membership-note"><span>What your membership includes</span><strong>walk in with your laptop, find the right room, and let Work Hall handle the office ops.</strong></div>
      </div>
      <div className="membership-system" aria-label="Work Hall membership steps">
        <div className="membership-orbit" aria-hidden="true"><span /><span /><span /></div>
        <ol className="membership-steps">
          {membershipSteps.map((step, index) => (
            <li key={step.title} style={{ '--step-accent-delay': `${index * 140}ms` } as CSSProperties}>
              <span className="membership-step__index">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <span className="membership-step__overline">{['Find the fit', 'Fit the room', 'Settle in'][index]}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
                <em>{step.signal}</em>
              </div>
            </li>
          ))}
        </ol>
        <div className="membership-dayline">{membershipDayNotes.map((note) => <span key={note}>{note}</span>)}</div>
      </div>
    </section>
  )
}

