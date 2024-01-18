import React, { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const Embla = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: false, align: "start" },
    [Autoplay({ delay: 2000 })]
  );
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const slides = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  
  const embla = useRef(null)
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const onSelect = () => {
      // Get the index of the selected slide
      const currentIndex = emblaApi.selectedScrollSnap();
        setIndex(currentIndex)
      console.log("Selected Index:", currentIndex);
    };

    // Attach event listener for slide selection
    embla.current.on("select", onSelect);

    // Clean up the event listener on component unmount
    return () => {
      embla.current.destroy();
    };
  }, []); // Run effect only once during component mount

  return (
    <>
      <div
        className="embla w-72 overflow-hidden border border-blue-700 p-8"
        ref={emblaRef}
      >
        <div className="embla__container flex justify-between">
          {slides.map((slide, index) => (
            <div className="embla__slide border border-red-700 mx-8">
              {slide}
            </div>
          ))}
        </div>
      </div>
      <button className="embla__prev" onClick={scrollPrev}>
        Prev
      </button>
      <button className="embla__next" onClick={scrollNext}>
        Next
      </button>
      <div>{index}</div>
    </>
  );
};

export default Embla;
