import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core'
import DeleteForevorIcon from '@mui/icons-material/DeleteForever';
import { Droppable } from 'react-beautiful-dnd'
import { Autocomplete, Button } from '@mui/material';

const styles = makeStyles({
    container: {
        height: '100%',
        width: '100%',
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
    },
    deleteIcon: {
        position: 'relative',
        transform: 'scale(2.75)',
        opoacity: .75,
        transition: '',
    },
})

const AddLane = ({ clck, shwarea, id, props, }: any) => {
    const properties = { ...props[0].add }
    const toAdd = [];
    console.log(props[0].add);
    const classes = styles();
    return (
        <>
            <div className={classes.container}>
                <Autocomplete disablePortal {...properties.autocomplete} />
                <Button {...properties.button} style={{fontFamily: 'Fenix, serif', fontSize: '24px',position: 'relative', margin: '0 45%',}}>Select</Button>
                <Droppable droppableId="add" direction="horizontal">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={classes.deleteContainer}
                        >
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        </>
    )
}

export default AddLane