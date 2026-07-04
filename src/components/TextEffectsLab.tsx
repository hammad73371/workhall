import './TextEffectsLab.css'

const sampleHeading = 'Find The Nearest Work Hall.'
const sampleSubheading = 'Orange-led heading reveal studies'

const wordTokens = sampleHeading.split(' ')

function Words({ className = '' }: { className?: string }) {
  return (
    <>
      {wordTokens.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className={className}
          style={{ ['--word-index' as string]: String(index) }}
        >
          {word}
          {index < wordTokens.length - 1 ? ' ' : ''}
        </span>
      ))}
    </>
  )
}

export function TextEffectsLab() {
  return (
    <main className="text-lab">
      <div className="text-lab__shell">
        <header className="text-lab__hero">
          <p className="text-lab__eyebrow">Mock URL: `/text-effects-lab`</p>
          <h1>Text Effects Lab</h1>
          <p>
            Reload this page and every heading animation will replay automatically.
            Each card uses Work Hall&apos;s heading font, and the label beneath uses the effect name.
          </p>
        </header>

        <section className="text-lab__grid" aria-label="Heading animation comparisons">
          <article className="text-lab__card">
            <div className="text-lab__heading text-lab__heading--masked-slide">
              <span className="text-lab__heading-base">{sampleHeading}</span>
              <span className="text-lab__heading-accent">{sampleHeading}</span>
              <span className="text-lab__heading-panel" />
            </div>
            <p className="text-lab__label">Masked Slide Reveal</p>
            <small>{sampleSubheading}</small>
          </article>

          <article className="text-lab__card">
            <div className="text-lab__heading text-lab__heading--underpaint">
              <Words className="text-lab__word text-lab__word--underpaint" />
            </div>
            <p className="text-lab__label">Orange Underpaint Reveal</p>
            <small>{sampleSubheading}</small>
          </article>

          <article className="text-lab__card">
            <div className="text-lab__heading text-lab__heading--crop-rise">
              <Words className="text-lab__word text-lab__word--crop-rise" />
            </div>
            <p className="text-lab__label">Bottom-Up Crop Reveal</p>
            <small>{sampleSubheading}</small>
          </article>

          <article className="text-lab__card">
            <div className="text-lab__heading text-lab__heading--sweep">
              <span className="text-lab__heading-base">{sampleHeading}</span>
              <span className="text-lab__heading-sweep" />
            </div>
            <p className="text-lab__label">Single-Line Sweep</p>
            <small>{sampleSubheading}</small>
          </article>

          <article className="text-lab__card">
            <div className="text-lab__heading text-lab__heading--fade-up">
              <Words className="text-lab__word text-lab__word--fade-up" />
            </div>
            <p className="text-lab__label">Letter Fade-Up</p>
            <small>{sampleSubheading}</small>
          </article>
        </section>
      </div>
    </main>
  )
}
