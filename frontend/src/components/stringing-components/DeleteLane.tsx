import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core'
import DeleteForevorIcon from '@mui/icons-material/DeleteForever';
import { Droppable } from 'react-beautiful-dnd'

const styles = makeStyles({
    container: {
        height: '100%',
        width: '100%',
        border: '1px solid red',
        background: 'rgba(120,0,0,.25)',
    },
    deleteContainer: {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgba(120,0,0,.25)',
        margin: '0 auto',
        color: 'red',

        '&:hover': {
            background: 'rgba(255,50,50,1)',
            color: 'black',
            position: 'absolue',
        },
    },
    deleteIcon: {
        position: 'relative',
        transform: 'scale(2.75)',
        opoacity: .75,
        transition: '',
        '&:hover': {
            /* position: 'fixed', */ // not working atm
        },
    },
})

const DeleteLane = ({ clck, shwarea, id, props }: any) => {
    const classes = styles();
    return (
        <>
            {/* <div style={{position: 'absolute', top: 0, left: 0, }}>Hello</div> */}
            {console.log("DeleteDnD on")}
            <div className={classes.deleteContainer}>
                <Droppable droppableId="delete" direction="horizontal" isCombineEnabled={true}>
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            // style={getListStyle(snapshot.isDraggingOver)}
                            {...provided.droppableProps}
                            // className={classes.virtList}
                            // className={classes.deleteContainer}
                        >
                            <DeleteForevorIcon className={classes.deleteIcon} />
                            {id}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        </>
    )
}

export default DeleteLane