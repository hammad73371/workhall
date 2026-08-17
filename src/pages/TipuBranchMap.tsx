import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef } from "react";
import { workHallBaseMapStyle } from "../components/locations/LocationsMapSection";
import type { WorkHallLocation } from "../types/site";

interface TipuBranchMapProps {
  location: WorkHallLocation;
}

export function TipuBranchMap({ location }: TipuBranchMapProps) {
  const mapNodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = mapNodeRef.current;
    if (!node) return;

    const map = new maplibregl.Map({
      container: node,
      style: workHallBaseMapStyle,
      center: location.coordinates,
      zoom: 14.2,
      pitch: 28,
      bearing: -12,
      attributionControl: false,
      interactive: true,
    });

    const markerElement = document.createElement("span");
    markerElement.className = "tipu-maplibre-pin";
    markerElement.setAttribute("aria-label", `WorkHall ${location.area}`);
    const marker = new maplibregl.Marker({ element: markerElement, anchor: "bottom" })
      .setLngLat(location.coordinates)
      .addTo(map);

    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "bottom-right");

    const resizeMap = () => map.resize();
    const resizeObserver = new ResizeObserver(resizeMap);
    resizeObserver.observe(node);

    return () => {
      resizeObserver.disconnect();
      marker.remove();
      map.remove();
    };
  }, [location]);

  return <div ref={mapNodeRef} className="tipu-maplibre" aria-label={`Interactive map showing WorkHall ${location.area}`} />;
}
