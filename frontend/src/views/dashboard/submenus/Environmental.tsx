import React from 'react';
import { Container } from '@material-ui/core';
import useStyles from '../../../style/DashboardStyles'; // new styling
import MenuAppBar from '../../../components/AppBar';
import { Carousel, CarouselItem } from 'react-round-carousel';
import { Link } from 'react-router-dom';
import environmental from 'img/environmental.png';
import './SubCarousel.css';



const links = [
    // Inventory
    {
      parent: 'ConstructionTeam',
      link: '/',
      id: 'Upland and Construction',
      image: environmental,
    },
    {
      parent: 'ConstructionTeam',
      link: '/',
      id: 'Stream and Wetland Crossings',
      image: environmental,
    },
    {
      parent: 'ConstructionTeam',
      link: '/',
      id: 'Spill Prevention, Containment and Control',
      image: environmental,
    },
    {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Maintenance',
        image: environmental,
    },
    {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Environmental Construction Management and Inspection',
        image: environmental,
    },
    {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Emergency Construction',
        image: environmental,
    },
    {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Winter Season Construction Plan',
        image: environmental,
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

const Environmental = () => {

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

export default Environmental;
