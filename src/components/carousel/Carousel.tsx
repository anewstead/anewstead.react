import React, { useState } from "react";

import "keen-slider/keen-slider.min.css";

import clsx from "clsx";
import { useKeenSlider } from "keen-slider/react";

import css from "./carousel.module.scss";
import { CarouselButton } from "./CarouselButton";

import type { KeenSliderPlugin } from "keen-slider/react";

export type CarouselProps = {
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

export const Carousel = ({ slides }: CarouselProps) => {
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
    <div className={css.carousel} data-testid="carousel">
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
        <div className={css.dots}>
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
                  css.dot,
                  currentSlide === index ? css["dot-active"] : ""
                )}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
