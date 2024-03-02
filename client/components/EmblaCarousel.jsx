import React from 'react';
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './EmblaCarouselArrowButtons';
import {
  SelectedSnapDisplay,
  useSelectedSnapDisplay
} from './EmblaCarouselSelectedSnapDisplay';
import useEmblaCarousel from 'embla-carousel-react';

const EmblaCarousel = (props) => {
  const { yearbook, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi);

  const { selectedSnap, snapCount } = useSelectedSnapDisplay(emblaApi);

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
        {yearbook.map((item, index) => (
          <div
            className={`embla__slide ${selectedSnap === index ? 'is-selected' : ''}`}
            key={index}
          >
            <div className="embla__slide__inner">
              <img src={item.image} alt={item.name} style={{ width: '500px', height: '500px', objectFit: 'contain' }} />
              <p>{item.name}</p>
            </div>
          </div>
        ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <SelectedSnapDisplay
          selectedSnap={selectedSnap}
          snapCount={snapCount}
        />
      </div>
    </section>
  );
}

export default EmblaCarousel;