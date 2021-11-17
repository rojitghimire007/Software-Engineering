// import * as React from 'react';
import { Carousel, CarouselItem } from 'react-round-carousel';
import { makeStyles } from '@mui/material';
import './CarouselDemo.css'

// const useStyles = makeStyles({
//   carousel: {},
// })

// Create an array of Carousel Items
const items: CarouselItem[] = Array(10)
  .fill('')
  .map((_: string, index: number) => ({
    alt: 'A random Unsplash photo',
    image: 'https://source.unsplash.com/random/210x210',
    content: (
      <div className="card">
         <strong>It's working</strong> 
         <span>Slide number {index + 1}</span> 
      </div>
    )
  }));

const RunCarousel = () => {
	return (
    <div className="root">
        <Carousel items={items}/> {/* width lined them up! */}
        <Carousel items={items}/>
        <Carousel items={items}/>
    </div>
	)
}
export default RunCarousel;