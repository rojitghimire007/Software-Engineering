// import * as React from 'react';
import { Carousel, CarouselItem } from 'react-round-carousel';

// Create an array of Carousel Items
const items: CarouselItem[] = Array(20)
  .fill('')
  .map((_: string, index: number) => ({
    alt: 'A random Unsplash photo',
    image: 'https://source.unsplash.com/random/210x210',
    content: (
      <div >
        {/* <strong>Round Carousel</strong> */}
        {/* <span>Slide number {index + 1}</span> */}
      </div>
    )
  }));

const RunCarousel = () => {
	return (
    <div style={{fontSize: '1rem', lineHeight: '1.2', display: 'flex !important', flexFlow: 'column wrap !important', height: '100%', alignItems: 'center', justifyContent: 'center', margin: 0}}>
		  <div style={{textAlign: 'center', width:'100%', overflow: 'hidden'}}>
        <Carousel items={items} itemWidth={10}/> {/* width lined them up! */}
      </div>
    </div>
	)
}
export default RunCarousel;