import { ArrowLeft, MapPin } from "lucide-react";
import { BookingConcierge } from "../components/booking/BookingConcierge";
import { useCountUp } from "../hooks/useCountUp";
import type { LocationPageContent } from "../types/site";

interface TipuSultanHeroProps {
  location: LocationPageContent;
}

export function TipuSultanHero({ location }: TipuSultanHeroProps) {
  const size = useCountUp(9000, { delay: 180, format: (value) => `${value.toLocaleString()} square feet` });
  const capacity = useCountUp(185, { delay: 300, format: (value) => `${value} seats` });
  const price = useCountUp(25000, { delay: 420, format: (value) => `From Rs ${value.toLocaleString()} / month` });

  return (
    <section className="tipu-hero" aria-labelledby="location-title">
      <a className="tipu-hero__back" href="/#locations">
        <ArrowLeft size={16} /> All locations
      </a>

      <div className="tipu-hero__card">
        <div className="tipu-hero__facts">
          <p className="tipu-hero__eyebrow">WorkHall location</p>
          <h1 id="location-title">Tipu Sultan</h1>
          <dl>
            <div><dt>Size</dt><dd>{size}</dd></div>
            <div><dt>Capacity</dt><dd>{capacity}</dd></div>
            <div><dt>Price</dt><dd>{price}</dd></div>
          </dl>
          <p className="tipu-hero__access">24/7 secure access, on-site parking for maximum flexibility.</p>
          <BookingConcierge
            variant="location-cta"
            fixedLocation={location.area}
            ctaClassName="tipu-hero__book"
          />
        </div>

        <figure className="tipu-hero__image">
          <img src={location.heroImage} alt="WorkHall Tipu Sultan workspace" style={{ objectPosition: location.heroImagePosition }} />
          <a href={location.mapsUrl} target="_blank" rel="noreferrer"><MapPin size={15} /> Open in Google Maps</a>
        </figure>
      </div>
    </section>
  );
}
