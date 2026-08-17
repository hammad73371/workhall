import { ArrowUpRight, Check } from "lucide-react";
import { locationPages } from "../data/locationPages";
import { TipuBranchMap } from "./TipuBranchMap";

const facilityGroups = [
  {
    label: "Access & security",
    items: ["Armed guards and security", "24/7 secure access", "Indoor, on-site parking", "Weekend access"],
  },
  {
    label: "Work essentials",
    items: ["Reliable, fast internet", "Air conditioning and backup power", "Premium business location and address", "Mail and parcel handling"],
  },
  {
    label: "Spaces & support",
    items: ["Large real estate", "Meeting and conference rooms", "Sparkling furniture and fixtures", "Specialized community managers and staff"],
  },
  {
    label: "Hospitality",
    items: ["Outdoor swimming pool", "Refreshments, pantry, dining and kitchenette"],
  },
];

export function TipuSpecifications() {
  const tipuIndex = locationPages.findIndex((branch) => branch.id === "tipu-sultan");
  const tipuBranch = locationPages[tipuIndex];

  return (
    <section className="tipu-specs" id="facilities-map" aria-labelledby="tipu-specs-title">
      <div className="tipu-specs__panel tipu-specs__panel--facilities">
        <header>
          <p className="location-section-label">Everything included</p>
          <h2 id="tipu-specs-title">WorkHall specifications</h2>
          <p>
            Work Hall coworking spaces are intentionally designed to create uplifting
            environments that increase productivity and encourage collaboration.
          </p>
        </header>

        <div className="tipu-specs__facilities" aria-label="Tipu Sultan facilities">
          {facilityGroups.map((group) => (
            <div className="tipu-specs__facility-group" key={group.label}>
              <h3>{group.label}</h3>
              <ul>
                {group.items.map((facility) => (
                  <li key={facility}><Check size={18} /> {facility}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="tipu-specs__note">
          Being around all kinds of businesses has made us specialists in redefining
          the way people work. We excel at knowing exactly what you need to get your work done.
        </p>
      </div>

      <div className="tipu-specs__panel tipu-specs__panel--map">
        <div className="tipu-specs__map">
          <TipuBranchMap location={tipuBranch} />
          <div className="tipu-specs__map-label">
            <small>Tipu Sultan branch</small>
            <strong>{tipuBranch.area}</strong>
            <span>{tipuBranch.address}</span>
          </div>
          <a href={tipuBranch.mapsUrl} target="_blank" rel="noreferrer">
            Open in Google Maps <ArrowUpRight size={17} />
          </a>
        </div>

        <div className="tipu-specs__location-slider">
          <div>
            <span>Explore the network</span>
            <strong>{tipuBranch.area}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
