import { style } from '@mui/system';
import React, { useState, useEffect } from 'react';
import * as styles from './styles/CarouselSwipe.module.css'

function CarouselSwipe() {
    const [slide, setSlide] = useState(false);
    const [slideType, setSlideType] = useState([styles.leftItem,styles.centerItem,styles.rightItem])
    const [items, setItems] = useState(['A','B','C']);
    const [rotate, setRotate] = useState("");

    useEffect(() => {
        if(rotate === 'left'){
            setItems([items[1],items[2],items[0]])
        }
        if(rotate === 'right'){
            setItems([items[2],items[0],items[1]])
        }
    }, [slide]);

    return (
        <body className={styles.container}>
            <button 
                className={styles.btn}
                onClick = {() => {
                    setRotate("left");
                    setSlide(!slide);
                    setSlideType(
                        [
                            styles.slide1,
                            styles.slide2,
                            styles.slide3
                        ]
                    );
                }}
            >
                L
            </button>

            <div className={styles.card, styles.leftItem, `${slideType[0]}`}>
                <div className={styles.content}>
                    {items[0]}
                </div>
            </div>
            <div className={styles.card, styles.centerItem, `${slideType[1]}`}>
                <div className={styles.content}>
                    {items[1]}
                </div>
            </div>
            <div className={styles.card, styles.rightItem, `${slideType[2]}`}>
                <div className={styles.content}>
                    {items[2]}
                </div>
            </div>

            <button className={styles.btn}
                onClick = {() => {
                    setSlide(!slide); 
                    setSlideType(
                        [
                            styles.slide3,
                            styles.slide2,
                            styles.slide1
                        ]
                    );
                }}
            >
                R
            </button>
        </body>
    )
}

export default CarouselSwipe
