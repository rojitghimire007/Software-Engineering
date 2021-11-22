import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import DeleteForevorIcon from '@mui/icons-material/DeleteForever';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Autocomplete, Button } from '@mui/material';
import Pipe from './Pipe2';

const styles = makeStyles({
  container: {
    height: '100%',
    width: '100%',
    border: '1px solid blue',
    background: 'rgba(0,0,120,.25)',
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

const AddLane = ({ clck, shwarea, id, props }: any) => {
  const properties = { ...props[0].add };
  const newPipe = properties.newItemDetails;
  const autocompleteProps = { ...properties.autocomplete };
  const buttonProps = { ...properties.button };
  const toAdd = [];
  console.log(props[0].add);
  const classes = styles();
  return (
    <>
      <div className={classes.container}>
        <Autocomplete
          disablePortal
          {...autocompleteProps}
          style={{ margin: '10px 10px 0 10px ' }}
        />
        <Button
          {...buttonProps}
          style={{
            fontFamily: 'Fenix, serif',
            fontSize: '24px',
            position: 'relative',
            margin: '10px 45%',
          }}
        >
          Select
        </Button>
        <Droppable droppableId="add" direction="horizontal">
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
                    {newPipe.item_id != ('' && null) ? (
                      <Pipe
                        plength={newPipe.plength}
                        station={newPipe.station_number}
                        pid={autocompleteProps.inputValue}
                        length={100}
                      />
                    ) : null}
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

export default AddLane;
