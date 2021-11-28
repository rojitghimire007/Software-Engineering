import react, {useState, useEffect} from 'react';
import { Carousel, CarouselItem } from 'react-round-carousel';
import './Carousel.css';
import Slides from './Links';

import { useHistory } from 'react-router'; // history.push('theLink')


const links = Slides();


const RunCarousel = () => {
    const [focused, setFocused] = useState(0);
    const history = useHistory();
    
    let circleQueue = links.map((item, index) => (
        {
            prev: (index - 1) < 0 ? (links.length - 1) : (index - 1),
            index: index,
            focusState: (index === focused ? true : false),
            next: (index + 1) > links.length ? 0 : (index + 1),
        }
    ))

    useEffect(()=>{
        circleQueue = links.map((item, index) => (
            {
                prev: (index - 1) < 0 ? (links.length - 1) : (index - 1),
                index: index,
                focusState: index === focused ? true : false,
                next: (index + 1) > links.length ? 0 : (index + 1),
            }
        ))
    },[focused])

    // Create an array of Carousel Items
    const items: CarouselItem[] = 
      links.map((item, index) => ({
        alt: '',
        image: '',
        content: (
            <>
              <div style={{height: '100%', /* opacity: `${(index: any) => (focusArray[index].focused ? 1: 0)}` */}}>
                <a href={`${item.link}`} style={{width: '100%', height: '33%'}} >
                    <img src={item.image} style={{height: '80%'}}></img>
                    <div style={{height: '20%', color: 'white', fontSize: 'small', textDecoration: 'none', backgroundColor: 'black'}}>
                        {item.id}
                    </div>
                </a>
                <a href={`${item.link2}`} style={{width: '100%', height: '34%'}} >
                    <img src={item.image2} style={{height: '80%'}}></img>
                    <div style={{height: '20%', color: 'white', fontSize: 'small', textDecoration: 'none', backgroundColor: 'black'}}>
                        {item.id2}
                    </div>
                </a>
                <a href={`${item.link3}`} style={{width: '100%', height: '33%'}} >
                    <img src={item.image3} style={{height: '80%'}}></img>
                    <div style={{height: '20%', color: 'white', fontSize: 'small', textDecoration: 'none', backgroundColor: 'black'}}>
                        {item.id3}
                    </div>
                </a>
              </div>
            </>
        )
    }));

    const handleClick = (i: number) => {
        if (focused + i < 0) {setFocused(circleQueue.length - 1)}
        else if (focused + i > circleQueue.length) {setFocused(0)}
    }
    
    return (
        <div className='comp-container'>
            {/* {console.log(focusArray)} */}
            {console.log(circleQueue)}
            {/* notice className root */}
            {/*  DO NOT CHANGE THIS (atm at least) */}
            <div className='root'>
                {/* this is the carousel item*/}
                <Carousel 
                    items={items} 
                    itemWidth={200}
                    nextButtonContent={
                            <button
                                style={{
                                    position: 'relative', 
                                    bottom: '20%', 
                                    right: '19%', 
                                    opacity: '1', 
                                    width: '2.5rem', 
                                    height: '2.5rem', 
                                    borderRadius: '50%',
                                    zIndex: 5,
                                }}
                                onClick={(e: any) => {handleClick(1); console.log("click Next")}}
                            >&rarr;</button>
                    }
                    prevButtonContent={
                            <button
                                style={{
                                    position: 'relative', 
                                    top: 0, 
                                    left: 0, 
                                    opacity: '1', 
                                    width: '2.5rem', 
                                    height: '2.5rem', 
                                    borderRadius: '50%',
                                    zIndex: 5,
                                }}
                                onClick={(e: any) => {handleClick(-1); console.log("click Previous")}}
                            >&larr;</button>
                    }
                />
            </div>
            <div style={{background: 'white', position: 'absolute', left: '0px',bottom: '0px'}}>
                <h3>Circle Queue State :::::: TESTING</h3>
                <h4>Array Size = {circleQueue.length}</h4>
                <div style={{border: '3px solid black', color: 'black', display: 'flex', flexFlow: 'column nowrap'}}>
                    {circleQueue.map((item: any, index: any)=>{
                        return(
                            <div style={{display: 'flex', flexFlow: 'row nowrap', width: 'max-content', borderWidth: '0 2xp 0 0', borderStyle: 'dashed'}}>
                                <div>
                                    previous: {item.prev} 
                                </div>
                                <div>
                                    index: {item.index} 
                                </div>
                                <div>
                                    focus?: {item.focusState.toString()}
                                </div>
                                <div>
                                    item: {item.next}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
	)
}
export default RunCarousel;
