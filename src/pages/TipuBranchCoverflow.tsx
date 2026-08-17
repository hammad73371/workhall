import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { CoverflowCarousel } from "../components/ui/CoverflowCarousel";
import { locationPages } from "../data/locationPages";

export function TipuBranchCoverflow() {
  const initialIndex = locationPages.findIndex((branch) => branch.id === "tipu-sultan");
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);
  const selectedBranch = locationPages[selectedIndex];
  const slides = locationPages.map((branch) => ({
    src: branch.heroImage,
    alt: `WorkHall ${branch.area} workspace`,
    title: branch.area,
    subtitle: branch.eyebrow,
    detail: branch.address,
    href: `/locations/${branch.id}`,
  }));

  return (
    <section className="tipu-coverflow-section" aria-labelledby="network-title">
      <header>
        <p className="location-section-label">The WorkHall network</p>
        <h2 id="network-title">Five branches across Karachi.</h2>
        <p>Explore WorkHall locations designed for different parts of the city and different ways of working.</p>
      </header>
      <CoverflowCarousel slides={slides} initialIndex={initialIndex} onSelectedChange={setSelectedIndex} />
      <a className="tipu-coverflow-section__link" href={`/locations/${selectedBranch.id}`}>
        Explore WorkHall {selectedBranch.area} <ArrowUpRight size={19} />
      </a>
    </section>
  );
}
