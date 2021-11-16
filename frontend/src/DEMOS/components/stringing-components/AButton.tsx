import React, { useState } from 'react'
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

const AButton = ({ name, color, index, setClick, setOpened, opened, click }: any) => {
    const specs = { color: color, name: name, index: index };
    const classes = styles(specs);

    const handleClick = () => {
        console.log("btn " + name + " clicked!");
        // var x = 0;
        if (click) {
            setClick(false);
            setOpened('');
            if (opened === '') {
                setClick(true);
                setOpened(name);
            }
        } //swap for new button
        if (opened === '') {
            setClick(true);
            setOpened(name);
        }
    };

    return (
        <div
            className={classes.container}
            onClick={() => { handleClick() }}
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
