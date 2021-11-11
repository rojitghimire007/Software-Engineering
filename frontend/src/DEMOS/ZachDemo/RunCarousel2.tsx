// import * as React from 'react';
import { Carousel, CarouselItem } from 'react-round-carousel';
import { makeStyles } from '@mui/material';
import './CarouselDemo2.css'

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
        <>
            {/* This is where you can render a component to
                the carsouel item. React elements and HTML elements
                (should) work.
            */}
           <div className="filler">
            <div className="card">a</div>
            <div className="card">b</div>
            <div className="card">c</div>
           </div>
        </>
    )
  }));

const RunCarousel2 = () => {
	return (
    <div className='comp-container'>
            {/* notice className root */}
            {/*  DO NOT CHANGE THIS (atm at least) */}
        <div className="root">
            {/* this is the carousel item*/}
            <Carousel items={items}/>
        </div>
    </div>
	)
}
export default RunCarousel2;