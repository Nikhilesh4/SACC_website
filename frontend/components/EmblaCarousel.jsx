import React,{useState,useEffect} from 'react';
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
  const [emblaRef, emblaApi] = useEmblaCarousel({options,align: 'center'});
  const [backgroundImage, setBackgroundImage] = useState('');
  const { selectedSnap, snapCount } = useSelectedSnapDisplay(emblaApi);

  useEffect(() => {
    if (yearbook[selectedSnap]) {
      setBackgroundImage(yearbook[selectedSnap].image);
    }
  }, [selectedSnap, yearbook]);

  useEffect(() => {
    document.body.style.backgroundImage = `url(${backgroundImage})`;
    document.body.style.backgroundSize = '50% 100%';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backdropFilter = 'blur(15px)';
    document.body.style.backgroundRepeat = 'no-repeat';
  }, [backgroundImage]);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi);

  // const { selectedSnap, snapCount } = useSelectedSnapDisplay(emblaApi);

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
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} style={{color: 'white', backgroundColor: 'black'}} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} style={{color: 'white', backgroundColor: 'black'}} />
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