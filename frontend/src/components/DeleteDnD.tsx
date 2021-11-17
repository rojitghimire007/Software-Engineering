import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core'
import DeleteForevorIcon from '@mui/icons-material/DeleteForever';
import { Droppable } from 'react-beautiful-dnd'
import MyButton from './MyButton'

const styles = makeStyles({
    container: {
        border: '1px solid blue'
    },
    deleteContainer: {
        height: '20vh',
        width: '80vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgba(240,240,240,.25)',
        margin: '0 auto',
        color: 'red',

        '&:hover': {
            background: 'rgba(255,50,50,1)',
            color: 'black',
        },
    },
    deleteIcon: {
        position: 'relative',
        transform: 'scale(2.75)',
        opoacity: .75,
        transition: '',
    },
})

const DeleteDnD = ({ clck, shwarea }: any) => {
    const classes = styles();
    return (
        <>
            <div style={{position: 'absolute', top: 0, left: 0, }}>Hello</div>
            {console.log("DeleteDnD on")}
            <div className={classes.container}>
                {shwarea === "delete" ?
                    <Droppable droppableId="delete" direction="horizontal">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                // style={getListStyle(snapshot.isDraggingOver)}
                                {...provided.droppableProps}
                                // className={classes.virtList}
                                className={classes.deleteContainer}
                            >
                                <DeleteForevorIcon className={classes.deleteIcon} />
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    :
                    null
                }
            </div>
        </>
    )
}

export default DeleteDnD
