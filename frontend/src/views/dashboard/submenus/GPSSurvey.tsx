import React from 'react';
import { Container } from '@material-ui/core';
import useStyles from '../../../style/DashboardStyles'; // new styling
import MenuAppBar from '../../../components/AppBar';
import { Carousel, CarouselItem } from 'react-round-carousel';
import { Link } from 'react-router-dom';
import gpsSurvey from 'img/gpsSurvey.png';
import './SubCarousel.css';



const links = [
    // Inventory
    {
      parent: 'ConstructionTeam',
      link: '/',
      id: 'Route - Alignment Surveys',
      image: gpsSurvey,
    },
    {
      parent: 'ConstructionTeam',
      link: '/',
      id: 'Boundry and Monument Surveys',
      image: gpsSurvey,
    },
    {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Encroachment Surveys',
        image: gpsSurvey,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Depth of Cover (DOC) Surveys',
        image: gpsSurvey,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Construction Staking',
        image: gpsSurvey,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'As-Built Surveys',
        image: gpsSurvey,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Weld Mapping',
        image: gpsSurvey,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Valves',
        image: gpsSurvey,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Fences',
        image: gpsSurvey,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Certified Easement Plats',
        image: gpsSurvey,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Crossings Surveys',
        image: gpsSurvey,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Utility Crossings Surveys',
        image: gpsSurvey,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Cathodic Protection',
        image: gpsSurvey,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Pipeline Markers',
        image: gpsSurvey,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Test Station',
        image: gpsSurvey,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Surveying Silk Fence',
        image: gpsSurvey,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Surveying Super Fence',
        image: gpsSurvey,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Mates',
        image: gpsSurvey,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Water Bars',
        image: gpsSurvey,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Air Bridges',
        image: gpsSurvey,
      },
      {
        parent: 'ConstructionTeam',
        link: '/',
        id: 'Abandonment',
        image: gpsSurvey,
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

const GPSSurvey = () => {

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

export default GPSSurvey;
