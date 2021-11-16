import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core'
import DeleteForevorIcon from '@mui/icons-material/DeleteForever';
import { Droppable } from 'react-beautiful-dnd'
import Pipe from 'components/stringing-components/Pipe2'

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

const TransferLane = ({ clck, shwarea, id, props, held }: any) => {
    const properties = { ...props[0].transfer }
    const newPipe = {...properties.newItemDetails};
    console.log(newPipe);

    const classes = styles();
    
    // const hold = [...held];
    // Future implementation
    // const setHold = () => {
    //     if(hold.indexOf(properties.newItemDetails) > -1)
    //     hold.push(properties.newItemDetails);
    // }

    return (
        <>
            {/* {setHold} // Future Stuff*/}
            <div className={classes.container}>
                <Droppable droppableId="transfer" direction="horizontal">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={classes.deleteContainer}
                        >

                            <Pipe />
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        </>
    )
}

export default TransferLane