// import * as React from 'react';
import { Carousel, CarouselItem } from 'react-round-carousel';
import { CardContent, makeStyles } from '@mui/material';
import './Carousel.css'
import {Card} from '@material-ui/core'
import { Link } from 'react-router-dom';
import { CardMedia } from '@mui/material';
import inventoryImg from 'img/inventory.jpg';
import stringingImg from 'img/stringing.jpg';
import { StylesContext } from '@material-ui/styles';


// const useStyles = makeStyles({
//   carousel: {},
// })

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

    // Welding
    // Stringing
    {
      parent: 'Stringing',
      link: 'pipes/strung',
      id: 'Stringing',
      image: stringingImg,
    },
    // Bending
    // Coating
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
                <div style={{height: '10%', backgroundColor: 'lightGray'}}>
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
                <Carousel items={items}/>
            </div>
        </div>
	)
}
export default RunCarousel;
