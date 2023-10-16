import React, { useState } from "react";

import "keen-slider/keen-slider.min.css";

import clsx from "clsx";
import { useKeenSlider } from "keen-slider/react";

import cls from "./carousel.module.scss";
import CarouselButton from "./CarouselButton";

import type { KeenSliderPlugin } from "keen-slider/react";

type Props = {
  slides: JSX.Element[];
  // settings?: SlickSettings;
};

const AdaptiveHeight: KeenSliderPlugin = (slider) => {
  function updateHeight() {
    // eslint-disable-next-line no-param-reassign
    // slider.container.style.height = `${
    //   slider.slides[slider.track.details.rel].offsetHeight
    // }px`;
  }
  slider.on("created", updateHeight);
  slider.on("slideChanged", updateHeight);
};

const Carousel = (props: Props) => {
  const { slides } = props;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      slideChanged(s) {
        setCurrentSlide(s.track.details.rel);
      },
      created() {
        setLoaded(true);
      },
    },
    [AdaptiveHeight]
  );
  return (
    <div className={cls.carousel} data-testid="carousel">
      <div ref={sliderRef} className="keen-slider">
        {slides.map((slide) => {
          return (
            <div className="keen-slider__slide" key={slide.key}>
              {slide}
            </div>
          );
        })}

        {loaded && instanceRef.current && (
          <>
            <CarouselButton
              direction="prev"
              onClick={(e) => {
                e?.stopPropagation();
                instanceRef.current?.prev();
              }}
              disabled={currentSlide === 0}
            />

            <CarouselButton
              direction="next"
              onClick={(e) => {
                e?.stopPropagation();
                instanceRef.current?.next();
              }}
              disabled={
                currentSlide ===
                instanceRef.current.track.details.slides.length - 1
              }
            />
          </>
        )}
      </div>

      {loaded && instanceRef.current && (
        <div className={cls.dots}>
          {[
            ...Array(instanceRef.current.track.details.slides.length).keys(),
          ].map((index) => {
            return (
              <button
                type="button"
                key={`slide${index}`}
                aria-label={`slide${index}`}
                onClick={() => {
                  instanceRef.current?.moveToIdx(index);
                }}
                // className={`dot${currentSlide === index ? " active" : ""}`}
                className={clsx(
                  cls.dot,
                  currentSlide === index ? cls["dot-active"] : ""
                )}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Carousel;
