import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core';
import ColorScheme from './ColorScheme';
import BackgroundImage from '../img/backgroundB.jpg'

const useStyles = makeStyles((theme: any) => ({
    page:{
        minWidth: '100vw',
        minHeight: '100vh',
        width:'100vw',
        height:'100vh',
        position: 'fixed',
        background: `url(${BackgroundImage}) rgba(0, 0, 0, 4)`,
        backgroundBlendMode: 'multiply',
        backgroundSize: '100vw 100vh',
        // backgroundSize: 'cover',
        backgroundColor: `${ColorScheme.background}`,
    },
    titleTop: {
        backgroundColor: `${ColorScheme.primary}`,
        alignItems: 'center',
        paddingTop: '5px',
        borderRadius: '8px 8px 8px 8px',
        borderStyle: 'ridge',
        borderColor: `${ColorScheme.primaryDark}`,
        backgroundImage: `linear-gradient(to right, ${ColorScheme.primaryDark}, ${ColorScheme.primaryLight})`,
    },
    titleTopContent: {
        // margin: '0 auto',
        textAlign: 'center',
        color: ColorScheme.onPrimary,
        fontFamily: 'Bebas Neue',
        fontSize: '6vw',
        letterSpacing: '.5rem',
        wordWrap: 'break-word',
        textShadow: '0 0 black, 0 2px black, 3px 2px black, 0 1px black',
        // borderRadius: '0 0 0 0',
        // fontSize: '5vw',
        // letterSpacing: '8px',
    },
    container: {
        width: '50%',
        margin: '5% 25%',
        // border: '2px dashed blue',
    },
    title: {
        boxShadow: `3px 4px 5px ${ColorScheme.onSecondary}`,
        alignText: 'center',
        fontFamily: 'Fenix, serif',
        fontSize: '32px',
        padding: '1%',
        borderRadius: '15px 15px 0 0',
        backgroundColor: `${ColorScheme.primary}`,
        color: `${ColorScheme.onPrimary}`,
        border: '1px solid black',
    },
    list: {
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '3px 4px 5px',
        
    },
    selectedItem: {
        background: `${ColorScheme.secondaryLight} !important`, // selected, overriden when not important
        color: `${ColorScheme.onPrimary} !important`,
    },
    item: {
        // width: '100%',
        // padding: '6px 0 6px 3px',
        paddingTop: '6px',
        // paddingLeft: '6px',
        paddingBottom: '6px',
        fontFamily: 'Fenix, serif',
        fontSize: '16px',
        boxShadow: `0 0 0 1px ${ColorScheme.secondaryLight}`,
        margin: '1px 0',
        border: '1px solid black',
        borderRadius: '3px',
        background: `${ColorScheme.primaryLight}`,
        transition: '.4s ease-in-out',
        
        '&:hover':{ 
            transform: 'scale(1.01)',
            background: `${ColorScheme.secondary}`,
            color: `${ColorScheme.onPrimary}`,
            cursor: 'pointer',
        }
    },
    bottom: {
        boxShadow: '3px 4px 5px',
        fontSize: '14px',
        padding: '.50%',
        borderRadius: '0 0 15px 15px',
        backgroundColor: `${ColorScheme.primary}`,
        border: '1px solid black',
        '& span': {
            opacity: 0,
        },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    btn: {
        backgroundColor: `${ColorScheme.secondaryDark}`,
        borderRadius: '6px',
        boxShadow: `0 0 2px 3px ${ColorScheme.secondaryLight}`,
        color: 'white',
        margin: '.5rem',
        width: '50%',
        textAlign: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        fontFamily: 'Fenix, serif',
        fontSize: '32px',
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
        animationName: '$spin',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'linear',
        zIndex: 999999999,
    },
    '@keyframes spin': {
        '0%':       {transform: 'rotateY(90)',},
        '100%':     {transform: 'translateX(50px) rotateY(360)',},
    },
}));

const useAnimations = makeStyles(()=>({

}));


export default useStyles;
