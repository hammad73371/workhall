import { motion } from 'motion/react'
import type { CSSProperties } from 'react'
import { services } from '../../data/siteContent'
import { ArrowIcon, CoworkingIcon, MeetingRoomIcon, OfficeSuiteIcon } from '../shared/icons'
import { ShuffleText } from '../shared/ShuffleText'

const serviceIconMap = {
  coworking: CoworkingIcon,
  office: OfficeSuiteIcon,
  meeting: MeetingRoomIcon,
} as const

export function WorkspaceServicesSection() {
  return (
    <section className="service-section" id="workspace-services" aria-labelledby="services-title">
      <div className="service-section__intro">
        <div>
          <div className="section-kicker">What you can book</div>
          <h2 id="services-title"><ShuffleText text="Three clear ways to work from Work Hall." finalColor="#15110d" /></h2>
          <p className="service-section__lead">Pick the shape of the day first. Work Hall handles the room, rhythm, access, and the little invisible things that make a workday feel lighter.</p>
        </div>
        <aside className="service-section__note" aria-label="Service guide">
          <span>Start with the room shape</span>
          <p>Shared desks keep the day open, private suites hold focus in place, and meeting rooms let the conversation arrive ready.</p>
        </aside>
      </div>
      <div className="service-grid">
        {services.map((service, index) => {
          const ServiceIcon = serviceIconMap[service.iconName]
          return (
            <motion.article key={service.title} className={`service-card ${index === 0 ? 'service-card--featured' : 'service-card--support'}`} style={{ '--service-accent': service.accent, '--service-image': 'url("/cowork.jpg")', '--service-image-position': service.imagePosition } as CSSProperties} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }} whileHover={{ y: -6, transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } }}>
              <span className="service-card__bgnum" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <span className="service-card__media" aria-hidden="true" />
              <span className="service-card__glow" aria-hidden="true" />
              <span className="service-card__top"><span className="service-card__chip"><span className="service-card__icon" aria-hidden="true"><ServiceIcon /></span><span className="service-card__eyebrow">{service.eyebrow}</span></span></span>
              <div className="service-card__body"><h3>{service.title}</h3><p>{service.body}</p><strong>{service.promise}</strong></div>
              <div className="service-card__footer"><div className="service-card__highlights" aria-label={`${service.title} highlights`}>{service.highlights.map((item) => <span key={item}>{item}</span>)}</div><a href="#book-tour">{service.cta}<ArrowIcon /></a></div>
            </motion.article>
          )
        })}
      </div>
    </section>
  )
}

