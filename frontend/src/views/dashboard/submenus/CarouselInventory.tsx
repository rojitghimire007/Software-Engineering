// import * as React from 'react';
import { Carousel, CarouselItem } from 'react-round-carousel';
import '../Carousel.css'
import { Link } from 'react-router-dom';
import inventoryImg from 'img/MaterialInventory.png';



const links = [
    // Inventory
    {
      parent: 'Material Inventory',
      link: '/pipes',
      id: 'Pipes',
      image: inventoryImg,
    },
    {
      parent: 'Material Inventory',
      link: '/fittings',
      id: 'Fittings',
      image: inventoryImg,
    },
    {
      parent: 'Database Log',
      link: '/',
      id: 'Database Log',
      image: inventoryImg,
    },
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
                <div style={{height: '10%', color: 'white', backgroundColor: 'black'}}>
                    {item.id}
                </div>
            </Link>
        </>
    )
}));

const CarouselInventory = () => {
    return (
        <div className='comp-container'>
            {/* notice className root */}
            {/*  DO NOT CHANGE THIS (atm at least) */}
            <div className="root">
                {/* this is the carousel item*/}
                <Carousel items={items} itemWidth={300}/>
            </div>
        </div>
	)
}
export default CarouselInventory;
