import React from 'react';
import EmblaCarousel from './EmblaCarousel';

export default function YearbookCaro({ yearbook }) {
  return (
    <EmblaCarousel yearbook={yearbook} options={{ dragFree: true }} />
  );
}