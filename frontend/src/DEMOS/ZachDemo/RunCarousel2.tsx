// import * as React from 'react';
import { Carousel, CarouselItem } from 'react-round-carousel';
import { makeStyles } from '@material-ui/core';
import './CarouselDemo2.css'
import { Card, CardActions, CardContent, CardMedia } from '@material-ui/core'
import imgTemp from '../../img/pipeline-1.jpg';

const useStyles = makeStyles({
  carousel: {},
})

// Create an array of Carousel Items
const items: CarouselItem[] = Array(10)
    .fill('')
    .map((_: string, index: number) => ({
        alt: '',
        image: '',
        content: (
            <>
                {/* This is where you can render a component to
                    the carsouel item. React elements and HTML elements
                    (should) work.
                */}
            <div className="filler">
                    <Card className="card">
                        <CardMedia image={imgTemp} style={{width: '100%'}}/>
                    </Card>
            </div>
            </>
        )
}));

const RunCarousel2 = () => {
	return (
    <div className='comp-container'>
            {/* notice className root */}
            {/*  DO NOT CHANGE THIS (atm at least) */}
        <div className="root">
            {/* this is the carousel item*/}
            <Carousel items={items} itemWidth={600}/>
            {console.log(items)}
        </div>
    </div>
	)
}
export default RunCarousel2;