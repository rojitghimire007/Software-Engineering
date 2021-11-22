import React from 'react'
import { makeStyles } from '@material-ui/core';

interface pipeDetails {
    length: number,
    height: number,
    pid: string,
    station: number,
    gap: boolean,
    heat: string, 
    thickness: number, 
    grade: string,
}

const useStyles = makeStyles({
    pipeContainer: {
        display: 'flex',
        justifyContent: 'flex-start',
        // width: '100%',
        width: (item: any) => {return `${item.length * 10}px`},
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
        width: (item: any) => {return `${item.length * 3}px`},
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
    detailsPane: {
        // border: '3px solid red',
        height: '90%',
        weight: '90%',
        display: 'flex',
        flexFlow: 'column wrap',
        justifyContent: 'space-around',
        alignContent: 'flex-start',
        alignItems: 'flex-start',
    },
    details: {
        background: 'linear-gradient(to bottom right, rgba(200,200,150,.05), rgba(150,150,150,.05))',
        // border: '1px solid blue',
        fontFamily: 'Bebas Neue, serif',
        fontSize: '1em',
        marginRight: '10px',
        padding: '0 10px',
        position: 'relative',
        left: '75px',
        top: '10px',
        textAlign: 'left',
        color: 'white',
        zIndex: 10,
        transition: 'scale .75s ease-in-out, color .5s ease-in',
        
        '&:hover': {
            transform: 'scale(1.01)',
            color: 'rgba(200,244,175,1)',
            // background: 'linear-gradient(to bottom right, rgb(200,200,150), rgb(150,150,150))',
        },
    },
})

function Pipe2({length, height, pid, plength, station, gap, heat, thickness, grade, overlap}: any) {
    const pipeDetails = {
        length: length,
        height: height,
    }
    const classes = useStyles(pipeDetails);

    return (
        <div style={{}}>
            <div className={classes.pipeContainer}>
                {!gap?
                    <>
                        <div className={classes.shadowStart} />  
                        <div className={classes.pipeStart} >
                            <div /> {/* Pipe's Hole (see styling) */}
                        </div>
                        <div className={classes.pipe}>
                            <div className={classes.detailsPane}>
                                <div className={classes.details}>
                                    {pid}
                                </div>
                                <div className={classes.details}>
                                    Station No: {station}
                                </div>
                                <div className={classes.details}>
                                    Pipe length: {plength}
                                </div>
                                <div className={classes.details}>
                                    Heat No: {heat}
                                </div>
                                <div className={classes.details}>
                                    Wall Thickness: {thickness}
                                </div>
                                <div className={classes.details}>
                                    Grade: {grade}
                                </div> 
                                 <div className={classes.details}>
                                    {`${overlap}`}
                                </div>
                                {/* <div className={classes.details}>
                                    Placeholder: {`{information}`}
                                </div> */}
                            </div>
                        </div>
                        <div className={classes.pipeEnd} />
                    </>
                :
                    // Pipe is a gap pipe
                    <>
                        <div className={classes.shadowStart} style={{opacity: '0'}}/>  
                        <div className={classes.pipeStart}  style={{opacity: '0'}}>
                            <div /> {/* Pipe's Hole (see styling) */}
                        </div>
                        <div 
                            className={classes.pipe}  
                            style={{opacity: '0.1', 
                                    borderRadius: '25px', 
                                    background: 'linear-gradient(to top left, rgb(225,225,225), rgb(0,0,0))', 
                                    boxShadow: '-5px 5px', 
                                    transform: 'skewX(-7deg)',
                            }}
                        />
                        <div className={classes.pipeEnd}  style={{opacity: '0'}}/>
                    </>
                }
            </div>
        </div>
    )
}

export default Pipe2;
