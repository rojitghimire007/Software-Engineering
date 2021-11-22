import React from 'react'
import { makeStyles } from '@material-ui/core'

const styles = makeStyles({
    container: {
        position: 'relative',
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        // minWidth: '100px',
        minWidth: '33%',
        height: '1.5rem',
        marginRight: '12px',
        flexBasis: '33%',

        '& :first-child': {
            position: 'relative',
            alignSelf: 'self-start',
            top: 0,
            left: '-15px',
            width: '30px',
            height: '100%',
            zIndex: 99999,
            transform: 'skewX(-15deg)',
            flexGrow: 0,
            flexShrink: 0,
        },
        '& :nth-child(3)': {
            position: 'relative',
            alignSelf: 'self-end',
            left: '15px',
            width: '30px',
            height: '100%',
            zIndex: 99999,
            transform: 'skewX(-15deg)',
            flexGrow: 0,
            flexShrink: 0,
        },
        // transform: 'rotate(90deg)',
        transition: 'scale 2s, background 2s ease-in-out',
        '&:hover': {
            cursor: 'pointer',
            transform: 'scale(1.05)',
            minWidth: '150px',
            zIndex: 999999999999999,
            
            '& :first-child': {
                // cursor: 'pointer',
                // transform: 'scale(1.05)',
                // left: '-30px',
                // minWidth: '150px',
                zIndex: 999999999999999,
                background: 'rgba(0,255,0,.2)',
                opacity: 0,
                position: 'absolute',
            },
            '& :nth-child(3)': {
                position: 'absolute',
                left: '-30px',
                zIndex: -1,
                opacity: 0,
            },
        },
    },
    content: {
        fontSize: '1.25rem',
        letterSpacing: '.25rem',
        textTransform: 'uppercase',
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Bebas Neue, serif',
    },
})

const renderButtons = (content: any, type: any, onClick: any, classes: any) => {
    if (type === 'del') {
        return (
            <div className={classes.container} 
                style={{ background: 'rgba(255,0,0,1)' }}
                onClick={onClick}
            >
                <div style={{background: 'rgba(255,0,0,1)',}}/>
                <div className={classes.content}>
                    {content}
                </div>
                <div style={{background: 'rgba(255,0,0,1)',}}/>
            </div>
        )
    }
    if (type === 'tran') {
        return (
            <div className={classes.container} 
                style={{ background: 'rgba(0,255,0,1)' }}
                onClick={onClick}
            >
                <div style={{background: 'rgba(0,255,0,1)',}}/>
                <div className={classes.content}>
                    {content}
                </div>
                <div style={{background: 'rgba(0,255,0,1)',}}/>
            </div>
        )
    }
    if (type === 'add') {
        return (
            <div className={classes.container} 
                style={{ background: 'rgba(0,0,255,1)' }}
                onClick={onClick}
            >
                <div style={{background: 'rgba(0,0,255,1)',}}/>
                <div className={classes.content}>
                    {content}
                </div>
                <div style={{background: 'rgba(0,0,255,1)',}}/>
            </div>
        )
    }
    else return (<div>INVALID BUTTON ID</div>)
}

const MyButton = ({ content, orientation, type, onClick }: any) => {
    const classes = styles()
    return (
        <>
            {renderButtons(content, type, onClick, classes)}
        </>
    )
}

export default MyButton
