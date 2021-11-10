import React from 'react'
import { makeStyles } from '@material-ui/core';

interface pipeDetails {
    length: number,
    height: number,
}

const useStyles = makeStyles({
    wrapper: {
        width: '100vw',
        height: '50vh',
        border: '5px solid blue',
        backgroundColor: 'teal',
    },
    pipeContainer: {
        width: (item: any) => {return `${item.length * 10}px`},
        height: (item: any) => {return `${item.height * 3}px`},
        border: '2px dashed white',
    },
    pipe: {
        
        width: (item: any) => {return `${item.length * 6}px`},
        height: (item: any) => {return `${item.height * 3}px`},
        position: 'relative',
        left: (item: any) => {return `${item.length * 2}px`},
        backgroundColor: 'grey',
        zIndex: 8,

        '&::before': {
            content: '""',
            position: 'absolute',
            backgroundColor: 'lightGrey',
            zIndex: 12,
            borderRadius: '50%',      
            width: (item: any) => {return `${item.length * 2}px`},            
            height: (item: any) => {return `${item.height * 3}px`},
            right: (item: any) => {return `${item.length * 5}px`},   // positioning         
        },
        
        '&::after': {
            content: '""',
            position: 'absolute',
            backgroundColor: 'grey',
            zIndex: 10,
            borderRadius: '50%',
            width: (item: any) => {return `${item.length * 2}px`},            
            height: (item: any) => {return `${item.height * 3}px`},
            left: (item: any) => {return `${item.length * 5}px`}, // positioning             
        },
    },
})

function Pipe({length, height}: any) {
    const pipeDetails = {
        length: length,
        height: height,
    }
    const classes = useStyles(pipeDetails);

    return (
        <body className={classes.wrapper}>
            <div className={classes.pipeContainer}>
                <div className={classes.pipe} ></div>
            </div>
        </body>
    )
}

export default Pipe;
