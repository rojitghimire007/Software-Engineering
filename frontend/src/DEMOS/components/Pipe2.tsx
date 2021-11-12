import React from 'react'
import { makeStyles } from '@material-ui/core';

interface pipeDetails {
    length: number,
    height: number,
}

const useStyles = makeStyles({
    pipeContainer: {
        display: 'flex',
        justifyContent: 'flex-start',
        width: '100%',
        height: '100%',
    },
    // every other div positioned relative to this one
    pipeStart: {
        position: 'static',
        height: '150px',
        width: '100px',
        borderRadius: '50%',
        background: 'linear-gradient(to left, rgb(200,200,200), rgb(150,150,150))',
        zIndex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        
        // the hole
        '& > div': {
            height: '100px', // 2/3 start_height
            width: '66.66px', // 2/3 start_width
            borderRadius: '50%',
            background: 'linear-gradient(to top right, rgb(255,255,255), rgb(0,0,0))',
            zIndex: 2,
        },
    },
    shadowStart: {
        position: 'relative',
        height: '50px',
        width: '100px',
        left: '70px',
        top: '100px',
        borderRadius: '50%',
        background: 'rgba(0,0,0,.25)',
        transform: 'skewX(70deg)',
        // boxShadow: '8px 0 0 0 rgba(0,0,0,.25), 18px 0 0 0 rgba(0,0,0,.1)',
        // zIndex: 5, // testing
    },
    pipe: {
        width: (item: any) => {return `${item.length * 5}px`},
        height: '150px',
        position: 'relative',
        right: '50px',
        background: 'linear-gradient(to bottom, rgb(200,200,200), rgb(0,0,0))',
        justifySelf: 'center',
    },
    pipeEnd: {
        position: 'relative',
        width: '100px',
        height: '150px',
        borderRadius: '50%',
        right:'100px',
        background: 'linear-gradient(to bottom, rgb(200,200,200), rgb(0,0,0))',
        borderLeft: '3px dashed rgba(200,200,200,.08)'
    },
})

function Pipe2({length, height}: any) {
    const pipeDetails = {
        length: length,
        height: height,
    }
    const classes = useStyles(pipeDetails);

    return (
        <div style={{marginLeft: '20px'}}>
            <div className={classes.pipeContainer}>
                <div className={classes.shadowStart}/>  
                <div className={classes.pipeStart} >
                    <div /> {/* Pipe's Hole (see styling) */}
                </div>
                <div className={classes.pipe} />
                <div className={classes.pipeEnd} />
            </div>
        </div>
    )
}

export default Pipe2;
