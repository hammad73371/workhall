import { ArrowIcon } from '../shared/icons'

export function SiteFooter() {
  return (
    <footer className="site-footer" id="contact">
      <div className="brand-mark" aria-label="Work Hall footer mark"><span className="brand-monogram">WH</span></div>
      <div>
        <strong>Work Hall, Karachi coworking spaces.</strong>
        <span>Support for enquiries, tour booking, branch questions, partnerships, and the member lounge.</span>
      </div>
      <a href="#book-tour" className="primary-cta">Book a Tour<ArrowIcon /></a>
    </footer>
  )
}

