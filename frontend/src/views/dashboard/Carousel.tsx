// import * as React from 'react';
import { Carousel, CarouselItem } from 'react-round-carousel';
import './Carousel.css'
import { Link } from 'react-router-dom';
import Slides from './Links';

  const links = Slides();
// Create an array of Carousel Items
const items: CarouselItem[] = 
  links.map((item, index) => ({
    alt: '',
    image: '',
    content: (
        <>
            <Link to={item.link} style={{width: '100%', height: '100%'}}>
                <img src={item.image} style={{height: '80%'}}></img>
                <div style={{height: '20%', color: 'white', textDecoration: 'none', backgroundColor: 'black'}}>
                    {item.id}
                </div>
            </Link>
        </>
    )
}));

const RunCarousel = () => {
    return (
        <div className='comp-container'>
            {/* notice className root */}
            {/*  DO NOT CHANGE THIS (atm at least) */}
            <div className="root">
                {/* this is the carousel item*/}
                <Carousel items={items} itemWidth={175}/>
            </div>
        </div>
	)
}
export default RunCarousel;
