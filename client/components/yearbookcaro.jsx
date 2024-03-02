import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function YearbookCaro({ yearbook }) {
  return (
    <Carousel className="w-full max-w-sm">
      <CarouselContent className="-ml-1">
        {yearbook.slice(0, 2).map((item, index) => (
          <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
            <div className="p-1" style={{width: '300px', height: '300px'}}>
              <img src={item.image} alt={item.name} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}