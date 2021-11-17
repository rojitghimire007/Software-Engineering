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
        // border: '2px dashed white',
    },
    pipe: {
        
        width: (item: any) => {return `${item.length * 6}px`},
        height: (item: any) => {return `${item.height * 3}px`},
        position: 'relative',
        left: (item: any) => {return `${item.length * 2}px`},
        backgroundColor: 'grey',
        zIndex: 8,
        justifySelf: 'center',

        '&::before': {
            content: '""',
            position: 'absolute',
            backgroundColor: 'lightGrey',
            zIndex: 12,
            borderRadius: '50%',      
            // width: (item: any) => {return `${item.length * 2}px`},            
            // height: (item: any) => {return `${item.height * 3}px`},
            width: (item: any) => {return '100px'},            
            height: (item: any) => {return '150px'},
            right: (item: any) => {return `${item.length * 5}px`},   // positioning     
            // right: '50px',   // positioning     
            
            // THE PIPE HOLE
            '&::before': {
                content: '""',
                position: 'absolute',
                backgroundColor: 'darkGrey',
                zIndex: 13,
                borderRadius: '50%',
                border: '3px dashed red', // testing
                width: (item: any) => {return '900px'},            
                height: (item: any) => {return '140px'},
                right: (item: any) => {return '10px'},
            },
        },
        
        '&::after': {
            content: '""',
            position: 'absolute',
            backgroundColor: 'grey',
            zIndex: 10,
            borderRadius: '50%',
            // width: (item: any) => {return `${item.length * 2}px`},            
            // height: (item: any) => {return `${item.height * 3}px`},
            border: '3px dashed white', // testing
            width: (item: any) => {return '100px'},            
            height: (item: any) => {return '150px'},
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
        // <body className={classes.wrapper}>
            <div className={classes.pipeContainer}>
                <div className={classes.pipe} ></div>
            </div>
        // </body>
    )
}

export default Pipe;
