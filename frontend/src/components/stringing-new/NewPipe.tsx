import React from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
    pipeWrapper: {
        width: '20vw',
        display: 'flex',
        margin: '0 10%',
        userSelect: 'none',
        // justifyContent: 'flex-start',
        // flex: '1 1 auto',
        // border: '1px dashed',
    },
    pipeEnd: {
        width: '10%',
        height: '10vh',
        // width: '10%',
        // height: '80%',
        margin: '10% 0',
        backgroundColor: 'red',
    },
    pipeMiddle: {
        width: '60%',
        // height: '80%',
        height: '10vh',
        margin: '10% 0',
        backgroundColor: 'blue',
        color: 'white',
    },
})

const NewPipe = ({ ref, information, drag }: any) => {
    const classes = useStyles();
    return (
        <div className={classes.pipeWrapper} ref={ref}>
            <div className={classes.pipeEnd}  />
            <div className={classes.pipeMiddle}>Pipe {information.name}</div>
            <div className={classes.pipeEnd} {...drag} /> {/* Drag Handle */}
        </div>
    )
}

export default NewPipe
