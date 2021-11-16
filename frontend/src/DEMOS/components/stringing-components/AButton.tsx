import React, { SyntheticEvent, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core';

const styles = makeStyles({
    container: {
        width: '200px',
        height: '50px',
        // border: '5px solid',
        display: 'flex',
        overflow: 'hidden',
        // margin: '150px',
        transition: '.2s ease-in-out',
        // transform: 'rotate(90deg)',
        transformOrigin: 'bottom left',
        userSelect: 'none',

        '&:hover': {
            cursor: 'pointer',
            position: 'relative',
            // transform: 'scaleY(1.1) rotate(80deg)',
            transform: 'scaleX(1.1) rotate(-5deg)',
            opacity: '.89',
            width: '300px',
        },
    },
    front: {
        justifySelf: 'flex-start',
        position: 'relative',
        left: '10px',
        width: '50px',
        height: '100%',
        background: (specs: any) => { return specs.color },
        color: 'rgba(255,0,0,0)',
        transform: 'skewX(-15deg)',
        borderWidth: '2px 0 2px 2px',
        borderStyle: 'solid',
        borderColor: 'black',
        // zIndex: -1,
    },
    content: {
        width: '100px',
        background: (specs: any) => { return specs.color },
        textAlign: 'center',
        paddingTop: '6px',
        borderWidth: '2px 0 0 0',
        borderStyle: 'solid',
        borderColor: 'black',
        color: 'white',
        zIndex: 999,
    },
    back: {
        justifySelf: 'flex-end',
        position: 'relative',
        left: '-10px',
        width: '50px',
        height: '100%',
        background: (specs: any) => { return specs.color },
        color: 'rgba(255,0,0,0)',
        transform: 'skewX(-15deg)',
        borderBottom: '2px solid black',
        borderWidth: '2px 2px 2px 0px',
        borderStyle: 'solid',
        borderColor: 'black',
        zIndex: (specs: any) => { return specs.index },
    },
})

const AButton = ({ name, color, index, setClick, setOpened, opened, click, buttonState, setButtonState }: any) => {
    const specs = { color: color, name: name, index: index };
    const classes = styles(specs);

    const handleClick = (/* e: any */ id: any) => {
        // console.log(name);

        // if (e.name === 'add') {console.log('added')}


        // initial state = (0,'')

        // if the button is clicked a second time in a row
        if (click && opened === id) {
            setClick(!click);
            setOpened('');
            // console.log("button clicked again: (" + click + ", " + name + ")")
        }

        // if the button is clicked after a different button
        else if (click && opened != id) {
            setOpened(name);
            // console.log("new button clicked: (" + click + ", " + name + ")")
        }
        // if this is the first button clicked
        else if (!click && opened === '') {
            setClick(!click);
            setOpened(id);
            // console.log("very first click: (" + click + ", " + name + ")")
        }
        // else
        //     setClick(!click)

    };

    // useEffect(() => {
    //     if (click){
    //         setOpened(name);
    //         console.log("update to: (" + click + ", " + name + ")")
    //     }
    //     else
    //         setOpened('');

    // }, [click, opened])

    return (
        <div
            className={classes.container}
            onClick={() => { handleClick(name) }}
        >
            <div className={classes.front} ></div>
            <div className={classes.content}>
                <span style={{ fontSize: '24px', textTransform: 'uppercase', alignSelf: 'center', }}>
                    {name}
                </span>
            </div>
            <div className={classes.back} />
        </div>
    )
}

export default AButton
