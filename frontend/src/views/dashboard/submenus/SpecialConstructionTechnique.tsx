import React from 'react';
import { Container } from '@material-ui/core';
import useStyles from '../../../style/DashboardStyles'; // new styling
import MenuAppBar from '../../../components/AppBar';
import { Carousel, CarouselItem } from 'react-round-carousel';
import { Link } from 'react-router-dom';
import specialConstructionTechnique from 'img/specialConstructionTechnique.png';
import './SubCarousel.css';



const links = [
    // Inventory
    {
      parent: 'SpecialConstructionTechnique',
      link: '/',
      id: 'Open Cut River and Stream Crossing',
      image: specialConstructionTechnique,
    },
    {
      parent: 'SpecialConstructionTechnique',
      link: '/',
      id: 'Horizontal Directional Drilling',
      image: specialConstructionTechnique,
    },
    {
      parent: 'SpecialConstructionTechnique',
      link: '/',
      id: 'Wetlands',
      image: specialConstructionTechnique,
    },
    {
        parent: 'SpecialConstructionTechnique',
        link: '/',
        id: 'Residential Areas',
        image: specialConstructionTechnique,
    },
    {
        parent: 'SpecialConstructionTechnique',
        link: '/',
        id: 'Agricultural Areas',
        image: specialConstructionTechnique,
    },
    {
        parent: 'SpecialConstructionTechnique',
        link: '/',
        id: 'Construction on Steep Slopes',
        image: specialConstructionTechnique,
    },
    {
        parent: 'SpecialConstructionTechnique',
        link: '/',
        id: 'Road and Rail Crossings',
        image: specialConstructionTechnique,
    },
    {
        parent: 'SpecialConstructionTechnique',
        link: '/',
        id: 'Material Staging and Contractor Yard',
        image: specialConstructionTechnique,
    },
    {
        parent: 'SpecialConstructionTechnique',
        link: '/',
        id: 'Quality Control and Quality Assurance',
        image: specialConstructionTechnique,
    },
    {
        parent: 'SpecialConstructionTechnique',
        link: '/',
        id: 'Working Atop In-Service Pipelines',
        image: specialConstructionTechnique,
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

const SpecialConstructionTechnique = () => {

const classes = useStyles();

  return (
    <div className={classes.container}  >
      <div className={classes.background}></div>
      <div className={classes.page}>
        
        <MenuAppBar />
        <main >
          <Container maxWidth="lg" >
            <CarouselInventory />
          </Container>
        </main>
      </div>
    </div>
  );
};

export default SpecialConstructionTechnique;
