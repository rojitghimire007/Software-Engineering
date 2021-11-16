import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core'
import DeleteForevorIcon from '@mui/icons-material/DeleteForever';
import { Droppable } from 'react-beautiful-dnd'

const styles = makeStyles({
    container: {
        border: '1px solid blue'
    },
    deleteContainer: {
        height: '100%',
        width: '100%',
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

const AddLane = ({ clck, shwarea, id }: any) => {
    const classes = styles();
    return (
        <>
            {/* <div style={{position: 'absolute', top: 0, left: 0, }}>Hello</div> */}
            {console.log("AddDnD on")}
            <div className={classes.container}>
                <Droppable droppableId="add" direction="horizontal">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            // style={getListStyle(snapshot.isDraggingOver)}
                            {...provided.droppableProps}
                            // className={classes.virtList}
                            className={classes.deleteContainer}
                        >
                            <DeleteForevorIcon className={classes.deleteIcon} />
                            <h1 style={{}}>{id}</h1>
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        </>
    )
}

export default AddLane