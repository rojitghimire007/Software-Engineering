import React from 'react';
import { Container } from '@material-ui/core';
import useStyles from '../../../style/DashboardStyles'; // new styling
import MenuAppBar from '../../../components/AppBar';
import { Carousel, CarouselItem } from 'react-round-carousel';
import { Link } from 'react-router-dom';
import overviewOfConstruction from 'img/overviewOfConstruction.png';
import './SubCarousel.css';



const links = [
    // Inventory
    {
      parent: 'OverviewOfConstruction',
      link: '/',
      id: 'Design of Line Pipe and Equipment',
      image: overviewOfConstruction,
    },
    {
      parent: 'OverviewOfConstruction',
      link: '/',
      id: 'Construction Survey',
      image: overviewOfConstruction,
    },
    {
      parent: 'OverviewOfConstruction',
      link: '/',
      id: 'Trenching',
      image: overviewOfConstruction,
    },
    {
        parent: 'OverviewOfConstruction',
        link: '/',
        id: 'Hauling and Stringing',
        image: overviewOfConstruction,
    },
    {
        parent: 'OverviewOfConstruction',
        link: '/',
        id: 'Pipe Bending',
        image: overviewOfConstruction,
    },
    {
        parent: 'OverviewOfConstruction',
        link: '/',
        id: 'Welding',
        image: overviewOfConstruction,
    },
    {
        parent: 'OverviewOfConstruction',
        link: '/',
        id: 'Coating',
        image: overviewOfConstruction,
    },
    {
        parent: 'OverviewOfConstruction',
        link: '/',
        id: 'Lowering the Pipe into the Trench',
        image: overviewOfConstruction,
    },
    {
        parent: 'OverviewOfConstruction',
        link: '/',
        id: 'Tie-ins',
        image: overviewOfConstruction,
    },
    {
        parent: 'OverviewOfConstruction',
        link: '/',
        id: 'Backfilling',
        image: overviewOfConstruction,
    },
    {
        parent: 'OverviewOfConstruction',
        link: '/',
        id: 'Testing and Initial Interal Inspection',
        image: overviewOfConstruction,
    },
    {
        parent: 'OverviewOfConstruction',
        link: '/',
        id: 'Cleanup and Restoration of Right-of-Way',
        image: overviewOfConstruction,
    },
    {
        parent: 'OverviewOfConstruction',
        link: '/',
        id: 'Environmental Compliance and Monitoring',
        image: overviewOfConstruction,
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

const OverviewOfConstruction = () => {

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

export default OverviewOfConstruction;
