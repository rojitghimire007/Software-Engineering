import React, { useState, useEffect, SyntheticEvent } from 'react'
import { makeStyles } from '@material-ui/core'

const styles = makeStyles({
    container: {
        textTransform: 'uppercase',
        backgroundColor: 'rgba(200,200,200,1)',
        width: '100%',
        height: '540px',
        // animation: (specs: any) => { console.log(`$${specs.animateAs} 30000ms ease-in`); return `${specs.animateAs} 30000ms ease-in` },
        // animation: "slideIn 3000ms ease-in-out",
        // animation: (animation: any) => {console.log(`${animation.anim} 35000ms ease-in 0s`);/* return "" */return `${animation} 3500ms ease-in 0s`},
    },
    animation: {
        color: 'white',
        animationDuration: ({ length }: any) => `${length}s`,
        textDecoration: ({ length }: any) => { console.log(`${length}`); return '' },
    },
    '@keyframes slideIn': {
        '0%': { opacity: '0' },
        '50%': { opacity: '0.5' },
        '100%': { opacity: '1' },
    },
    '@keyframes slideOut': {
        '0%': { opacity: '1', transform: 'translateX(0px)' },
        '100%': { opacity: '0', transform: 'translateX(-1000px)' },
    },
})

const StringingTrack = ({ click, opened, name }: any) => {
    // const [animation, setAnimation] = useState({ animateAs: "slideIn" });
    const [animation, setAnimation] = useState("$slideIn");
    const id = name;

    const classes = styles({ anim: "$slideIn", length: '3500ms', iterations: 'infinite', timing: 'ease-in-out' });

    const handleChange = (id: any) => {
        if (click && opened === id) {
            // setAnimation({ animateAs: "slideIn" })
            console.log("triggered: (" + click + ", " + opened + " = " + id + ")")
        }
        console.log("change handled")
    }

    return (
        <>
            {name != '' ?
                <div
                    className={`${classes.container} ${classes.animation}`}
                    onChange={() => { handleChange(name) }}
                    style={{animationName: `${animation}`}}
                >
                    {name} Track Item Here

                </div>
                :
                null // Don't Render!
            }
        </>
    )
}

export default StringingTrack
