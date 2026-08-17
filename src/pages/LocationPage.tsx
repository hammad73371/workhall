import { ArrowLeft, ArrowUpRight, Check, MapPin } from "lucide-react";
import { useEffect, type CSSProperties } from "react";
import workhallOrange from "../assets/workhall-orange.svg";
import Footer from "../components/Footer/Footer";
import { FigmaFunctionalNav } from "../components/layout/FigmaFunctionalNav";
import { locationPages } from "../data/locationPages";
import type { LocationPageContent } from "../types/site";
import { TipuSultanHero } from "./TipuSultanHero";
import { TipuSpecifications } from "./TipuSpecifications";
import { TipuBranchCoverflow } from "./TipuBranchCoverflow";
import "./LocationPage.css";

interface LocationPageProps {
  location: LocationPageContent;
}

export function LocationPage({ location }: LocationPageProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${location.area} coworking space | WorkHall`;
  }, [location]);

  const pageStyle = {
    "--location-accent": location.accent,
    "--location-accent-two": location.secondaryAccent,
  } as CSSProperties;

  return (
    <main className={location.id === "tipu-sultan" ? "location-page location-page--tipu" : "location-page"} style={pageStyle}>
      <a className="hero-brand-mark location-page__brand" href="/" aria-label="WorkHall home">
        <img src={workhallOrange} alt="WorkHall" />
      </a>
      <FigmaFunctionalNav isLoaded />

      {location.id === "tipu-sultan" ? <TipuSultanHero location={location} /> : (
      <section className="location-hero" aria-labelledby="location-title">
        <div className="location-hero__copy">
          <a className="location-back-link" href="/#locations">
            <ArrowLeft size={17} /> All locations
          </a>
          <p className="location-eyebrow">{location.eyebrow}</p>
          <h1 id="location-title">
            WorkHall <em>{location.area}</em>
          </h1>
          <p className="location-hero__headline">{location.headline}</p>
          <p className="location-hero__intro">{location.introduction}</p>
          <div className="location-hero__actions">
            <a className="location-button location-button--solid" href="#book-a-tour">
              Book a tour <ArrowUpRight size={18} />
            </a>
            <a className="location-button" href={location.mapsUrl} target="_blank" rel="noreferrer">
              Get directions <MapPin size={17} />
            </a>
          </div>
        </div>

        <figure className="location-hero__visual">
          <img
            src={location.heroImage}
            alt={`Contemporary workspace representing WorkHall ${location.area}`}
            style={{ objectPosition: location.heroImagePosition }}
          />
          <figcaption>
            <span>Karachi, Pakistan</span>
            <strong>{location.branchNote}</strong>
          </figcaption>
        </figure>
      </section>
      )}

      <section className="location-facts" aria-label={`${location.area} highlights`}>
        {location.highlights.map((item, index) => (
          <article key={item.label}>
            <span>0{index + 1}</span>
            <strong>{item.value}</strong>
            <p>{item.label}</p>
          </article>
        ))}
        <article className="location-facts__address">
          <MapPin size={22} />
          <strong>Find us</strong>
          <p>{location.address}</p>
        </article>
      </section>

      <section className="location-intro-section">
        <div>
          <p className="location-section-label">The branch</p>
          <h2>Built around the way business moves in {location.area}.</h2>
        </div>
        <div className="location-intro-section__copy">
          <p>{location.businessFocus}</p>
          <p>{location.branchDetail ?? "Choose the setup you need now, then change it as your work changes. The WorkHall team takes care of the operational details around it."}</p>
        </div>
      </section>

      <section className="location-workspaces" id="workspaces" aria-labelledby="workspace-title">
        <header>
          <p className="location-section-label">Ways to work here</p>
          <h2 id="workspace-title">Your workday, in the right shape.</h2>
        </header>
        <div className="location-workspaces__grid">
          {location.workspaces.map((workspace, index) => (
            <article key={workspace.title}>
              <span>0{index + 1}</span>
              <h3>{workspace.title}</h3>
              <p>{workspace.description}</p>
              <small>Best for</small>
              <strong>{workspace.bestFor}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="location-gallery" aria-label={`${location.area} workspace gallery`}>
        {location.gallery.map((image, index) => (
          <figure key={`${image.src}-${index}`} className={`location-gallery__item location-gallery__item--${index + 1}`}>
            <img src={image.src} alt={image.alt} style={{ objectPosition: image.position }} />
          </figure>
        ))}
      </section>

      {location.id === "tipu-sultan" ? <TipuSpecifications /> : <>
      <section className="location-amenities" aria-labelledby="amenities-title">
        <div className="location-amenities__heading">
          <p className="location-section-label">Included in the workday</p>
          <h2 id="amenities-title">Less office management. More actual work.</h2>
          <p>Every setup is supported by the essentials that keep a workday moving.</p>
        </div>
        <ul>
          {location.amenities.map((amenity) => (
            <li key={amenity}><Check size={17} /> {amenity}</li>
          ))}
        </ul>
      </section>

      <section className="location-access" aria-labelledby="access-title">
        <div className="location-access__map">
          <span className="location-access__map-grid" aria-hidden="true" />
          <span className="location-access__pin"><MapPin size={28} /></span>
          <p>{location.area}</p>
        </div>
        <div className="location-access__copy">
          <p className="location-section-label">Getting here</p>
          <h2 id="access-title">Make {location.area} your next work address.</h2>
          <ul>
            {location.accessNotes.map((note) => <li key={note}>{note}</li>)}
          </ul>
          <a href={location.mapsUrl} target="_blank" rel="noreferrer">
            Open live directions <ArrowUpRight size={18} />
          </a>
        </div>
      </section>
      </>}

      {location.id === "tipu-sultan" ? <TipuBranchCoverflow /> : <section className="location-switcher" aria-labelledby="other-locations-title">
        <header>
          <p className="location-section-label">The WorkHall network</p>
          <h2 id="other-locations-title">Five branches. One flexible membership.</h2>
        </header>
        <div className="location-switcher__links">
          {locationPages.map((branch) => (
            <a
              href={`/locations/${branch.id}`}
              key={branch.id}
              className={branch.id === location.id ? "is-current" : undefined}
              aria-current={branch.id === location.id ? "page" : undefined}
            >
              <span>{branch.eyebrow}</span>
              <strong>{branch.area}</strong>
              <ArrowUpRight size={20} />
            </a>
          ))}
        </div>
      </section>
      }

      <section className="location-booking" id="book-a-tour">
        <p>Come see it in person</p>
        <h2>Your next workday could start in {location.area}.</h2>
        <p>Tell us what your team needs and the WorkHall team will help you find the right setup.</p>
        <a href={`mailto:hello@workhall.co?subject=Tour request — ${location.area}`}>
          Request a branch tour <ArrowUpRight size={20} />
        </a>
      </section>

      <Footer />
    </main>
  );
}
