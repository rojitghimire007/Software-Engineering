// import * as React from 'react';
import { Carousel, CarouselItem } from 'react-round-carousel';
import './Carousel.css'
import { Link } from 'react-router-dom';
import inventoryImg from 'img/MaterialInventory.png';
import stringingImg from 'img/Stringing.png';
import bendingImg from 'img/Bending.png';
import coatingImg from 'img/Coating.png';
import weldingImg from 'img/Welding.png';



const links = [
    // Inventory
    {
      parent: 'Material Inventory',
      link: '/dashboard/inventory',
      id: 'Material Inventory',
      image: inventoryImg,
    },
    // Welding
    {
      parent: 'Welding',
      link: '/',
      id: 'Welding',
      image: weldingImg,
    },
    // Stringing
    {
      parent: 'Stringing',
      link: 'pipes/strung',
      id: 'Stringing',
      image: stringingImg,
    },
    // Bending
    {
      parent: 'Bending',
      link: '/bending',
      id: 'Bending',
      image: bendingImg,
    },
    // Coating
    {
      parent: 'Coating',
      link: '/coating',
      id: 'Coating',
      image: coatingImg,
    },
    // Other
  ];


// Create an array of Carousel Items
const items: CarouselItem[] = 
  links.map((item, index) => ({
    alt: '',
    image: '',
    content: (
        <>
            <Link to={item.link} style={{width: '100%', height: '100%'}}>
                <img src={item.image} style={{height: '90%'}}></img>
                <div style={{height: '10%', color: 'white', textDecoration: 'none', backgroundColor: 'black'}}>
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
                <Carousel items={items} itemWidth={200}/>
            </div>
        </div>
	)
}
export default RunCarousel;
