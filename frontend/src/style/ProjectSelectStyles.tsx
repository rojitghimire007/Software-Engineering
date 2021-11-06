import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => ({
    page:{
        minWidth: '100vw',
        minHeight: '100vh',
        position: 'fixed',
        backgroundColor: 'yellow',
    },
    container: {
        width: '50%',
        margin: '5% 25%',
        // border: '2px dashed blue',
    },
    title: {
        boxShadow: '7px 7px',
        alignText: 'center',
        fontSize: '24px',
        padding: '1%',
        borderRadius: '15px 15px 0 0',
        backgroundColor: 'pink',
        border: '1px solid black',
    },
    list: {
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '7px 7px',
        
    },
    item: {
        // width: '100%',
        // padding: '6px 0 6px 3px',
        paddingTop: '6px',
        // paddingLeft: '6px',
        paddingBottom: '6px',
        fontSize: '16px',
        boxShadow: '0 0 0 1px pink',
        border: '1px solid black',
        borderRadius: '3px',
        background: 'white',
        transition: '.5s ease-in-out',
        
        '&:hover':{ 
            transform: 'scale(1.01)',
            background: 'lightGrey',
            cursor: 'pointer',
        }
    },
    bottom: {
        boxShadow: '7px 7px',
        fontSize: '14px',
        padding: '.50%',
        borderRadius: '0 0 15px 15px',
        backgroundColor: 'pink',
        border: '1px solid black',
        '& span': {
            opacity: 0,
        }
    },
    btn: {
        backgroundColor: 'green',
        borderRadius: '6px',
        boxShadow: '0 0 0 3px red',
        color: 'white',
        margin: '3% 43%',
        width: '50px',
        textAlign: 'center',
    },
    msg: {
        position: 'fixed',
        zIndex: 5,
        fontSize: '24px',
        padding: '0 5px',
        top: '55%',
        left: '25%',
        backgroundColor: 'cyan',
        boxShadow: '0 0 0 4px teal',
    },
    exit: {
        fontSize: '14px',
        backgroundColor: 'red',
        color:'white',
        cursor: 'pointer',
    },
    loading: {
        position: 'absolute',
        zIndex: 999,
        minWidth: '100vw',
        minHeight: '100vh',
        padding: '50%',
        background: 'rgba(0,0,0,.5)',
        color: 'white',
    },
    loadSymb: {
        animationDuration: '3s',
        animationName: 'spin',
        animationIterationCount: 'infinite',
    },
    "@keyframes spin": {
        "0%":       {transform: 'rotateY(0)',},
        "100%":     {transform: 'rotateY(360)',},
    },
}));


export default useStyles;
