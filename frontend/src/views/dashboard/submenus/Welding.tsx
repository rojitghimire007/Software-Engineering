import React from 'react';
import { Container } from '@material-ui/core';
import useStyles from '../../../style/DashboardStyles'; // new styling
import MenuAppBar from '../../../components/AppBar';
import { Carousel, CarouselItem } from 'react-round-carousel';
import { Link } from 'react-router-dom';
import welding from 'img/Welding.png';
import './SubCarousel.css';



const links = [
    // Inventory
    {
      parent: 'ConstructionTeam',
      link: '/',
      id: 'Welder Test Card',
      image: welding,
    },
    {
      parent: 'ConstructionTeam',
      link: '/bending',
      id: 'Repair Welds',
      image: welding,
    },
    {
      parent: 'ConstructionTeam',
      link: '/',
      id: 'Cut-Outs',
      image: welding,
    },
    {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Tie-ins',
        image: welding,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Fabrication Drawing',
        image: welding,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Fabrication Pictures',
        image: welding,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Weld Photos',
        image: welding,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Weld Waiver Request',
        image: welding,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Welder Stats',
        image: welding,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Welding Productivity',
        image: welding,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Welding Equipment',
        image: welding,
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

const Welding = () => {

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

export default Welding;
