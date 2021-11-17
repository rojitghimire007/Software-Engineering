import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import DeleteForevorIcon from '@mui/icons-material/DeleteForever';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Pipe from 'components/stringing-components/Pipe2';

const styles = makeStyles({
    container: {
        height: '100%',
        width: '100%',
        border: '1px solid green',
        background: 'rgba(0,120,0,.25)',
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
        opoacity: 0.75,
        transition: '',
    },
});

const TransferLane = ({ clck, shwarea, id, props, held }: any) => {
    const properties = { ...props[0].transfer };
    const newPipe = { ...properties.newItemDetails };
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
                <Droppable droppableId="hold" direction="horizontal">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={classes.deleteContainer}
                        >
                            <Draggable draggableId={newPipe.item_id} index={0}>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        <Pipe
                                            plength={newPipe.plength}
                                            station={newPipe.station_number
                                                ? newPipe.station_number
                                                : 'N/A'}
                                            pid={newPipe.item_id}
                                            length={100}
                                            overlap={newPipe.overlap
                                                ? 'Overlap'
                                                : 'NO overlap'}
                                            grade={newPipe
                                                ? newPipe.grade
                                                : 'N/A'}
                                            thickness={newPipe
                                                && newPipe.wall_thickness
                                                ? newPipe.wall_thickness
                                                : 'N/A'}
                                            heat={newPipe
                                                && newPipe.heat_no
                                                ? newPipe.heat_no
                                                : 'N/A'}
                                        />
                                        {/*  <Pipe
                                            plength={item.plength}
                                            station={item.station_number}
                                            pid={item.item_id}
                                            length={100}
                                            overlap={currentItemDetails[index]
                                                && currentItemDetails[index].overlap
                                                ? "overlap"
                                                : 'NO overlap'}
                                        /> */}
                                    </div>
                                )}
                            </Draggable>
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        </>
    );
};

export default TransferLane;
