import { useCallback, useState, type KeyboardEvent } from "react";
import type { CarouselImage } from "../../types";
import "./Carousel.css";

interface CarouselProps {
  images: CarouselImage[];
  label: string;
}

function Carousel({ images, label }: CarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const lastIndex = images.length - 1;

  const goTo = useCallback(
    (index: number) => {
      if (index < 0) {
        setActiveIndex(lastIndex);
      } else if (index > lastIndex) {
        setActiveIndex(0);
      } else {
        setActiveIndex(index);
      }
    },
    [lastIndex],
  );

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(activeIndex - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(activeIndex + 1);
    }
  };

  if (images.length === 0) {
    return <div className="carousel carousel--empty" aria-hidden="true" />;
  }

  return (
    <div
      className="carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label={`${label} photos`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div
        className="carousel__track"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <img
            key={image.src}
            className="carousel__slide"
            src={image.src}
            alt={`${label} photo ${index + 1} of ${images.length}: ${image.alt}`}
            loading={index === 0 ? "eager" : "lazy"}
            draggable={false}
          />
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button
            type="button"
            className="carousel__arrow carousel__arrow--prev"
            onClick={() => goTo(activeIndex - 1)}
            aria-label="Previous photo"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              style={{ fill: "#ffffff" }}
            >
              <path
                d="M15 5 L8 12 L15 19"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            className="carousel__arrow carousel__arrow--next"
            onClick={() => goTo(activeIndex + 1)}
            aria-label="Next photo"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M9 5 L16 12 L9 19"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div
            className="carousel__dots"
            role="tablist"
            aria-label={`${label} slide picker`}
          >
            {images.map((image, index) => (
              <button
                key={image.src}
                type="button"
                role="tab"
                aria-selected={index === activeIndex}
                aria-label={`Go to photo ${index + 1}`}
                className={
                  index === activeIndex
                    ? "carousel__dot carousel__dot--active"
                    : "carousel__dot"
                }
                onClick={() => goTo(index)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Carousel;
