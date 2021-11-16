import React, { useState, useEffect, SyntheticEvent, useLayoutEffect } from 'react'
import { makeStyles } from '@material-ui/core'
import AddLane from './AddLane'
import TransferLane from './TransferLane'
import DeleteLane from './DeleteLane'

const styles = makeStyles({
    container: {
        textTransform: 'uppercase',
        backgroundColor: 'rgba(200,200,200,1)',
        width: 'calc(100% - 50px)',
        height: '540px',
    },
    animationA: {
        animation: '$slideIn .25s ease-in-out 0s',
        zIndex: -2,
    },
    animationB: {
        // opacity: '0',
        animation: '$slideOut .25s ease-in-out 0s',
        zIndex: -2,
    },
    '@keyframes slideIn': {
        '0%': { opacity: '.5', transform: 'translateX(-1000px)', },
        '100%': { opacity: '1', transform: 'translateX(0px)', },
    },
    '@keyframes slideOut': {
        '0%': { opacity: '1', transform: 'translateX(0px)', },
        '100%': { opacity: '.5', transform: 'translateX(-1000px)', },
    },
})

const StringingTrack = ({ click, opened, name, trackHistory, props, }: any) => {
    const classes = styles();
    const [animationStyle, setAnimationStyle] = useState(classes.container);

    // console.log("----------")
    // console.log("opened:  " + opened)
    // console.log("this:    " + name)
    // console.log("clickIs: " + click)
    // console.log("history: " + trackHistory)

    useLayoutEffect(() => {

        if (trackHistory[trackHistory.length - 1] == name)
            setAnimationStyle(classes.animationB)

        else if (opened != '')
            setAnimationStyle(classes.animationA)
    }, [opened, click != false])

    const renderLane = (id: any) => {
        if (id === 'add'){
            return <AddLane props={props}/>
        }
        else if (id === 'transfer'){
            return <TransferLane props={props}/>
        }
        else if (id === 'delete'){
            return <DeleteLane props={props}/>
        }
    }

    const handleAnimation = (id: any) => {

        // console.log("----------")
        // console.log("Handling animations for: " + id)

        return (
            <>
                <div key={id} className={`${classes.container} ${animationStyle}`}>
                    {/* {id} track lane goes here */}
                    {renderLane(id)}
                </div>
            </>
        )
    }

    return (
        <div>
            {opened != '' && click ?
                <>{handleAnimation(name)}</>
                :
                null // Don't Render!
            }
        </div>
    )
}

export default StringingTrack