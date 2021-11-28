import React from 'react';
import { Container } from '@material-ui/core';
import useStyles from '../../../style/DashboardStyles'; // new styling
import MenuAppBar from '../../../components/AppBar';
import { Carousel, CarouselItem } from 'react-round-carousel';
import { Link } from 'react-router-dom';
import './SubCarousel.css';



const SubCarousel = (slides: any) => {
    const links = slides;
    const classes = useStyles();


    const items: CarouselItem[] = 
    links.map((item: any, index: any) => ({
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

    return (
        <div className={classes.container}  >
            <div className={classes.background}></div>
            <div className={classes.page}>
            
                <MenuAppBar />
                <main >
                <Container maxWidth="lg" >
                    
                <div className='comp-container' >
                    {/* notice className root */}
                    {/*  DO NOT CHANGE THIS (atm at least) */}
                    <div className="root" >
                    {/* this is the carousel item*/}
                    <Carousel items={items} itemWidth={300} />
                    </div>
                </div>

                </Container>
                </main>
            </div>
        </div>
    )
}
export default SubCarousel;


