import { Autocomplete, createFilterOptions, TextField } from '@mui/material';
import api from 'api';
import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styles from './new-stringing-components/style-modules/simplePipes.module.css';

const filterOptions = createFilterOptions({
  matchFrom: 'start',
});

const Gap = ({
  station,
  dragIndex,
  eligible,
  transformGap,
}: {
  station: number;
  dragIndex: number;
  eligible: Array<any>;
  transformGap: any;
}) => {
  const [newItem, setNewItem] = useState(null);
  const itemSelected = (item: string) => {
    // Make sure that fitting goes as F_.*
    if (item.charAt(0) == 'F') item = item.replace('F', 'F_');

    // Get the item info and transform Gap
    api
      .getItemInfo(item)
      .then((res) => {
        //Determining length based on item type
        let length = {};
        if (new RegExp('F_.*').test(item)) length = { flength: res.length };
        else length = { plength: res.length };

        transformGap(dragIndex, station, {
          item_id: res.id,
          ...length,
          heat_no: res.heat_no,
          wall_thickness: res.wall_thickness,
          grade: res.grade,
        });

        setNewItem(null);
      })
      .catch((error) => {
        alert(error.message);
        setNewItem(null);
      });
  };
  return (
    <Draggable
      key={`${dragIndex}`}
      draggableId={`${dragIndex}`}
      index={dragIndex}
      isDragDisabled
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          // style={{ margin: '0 50px' }}
          className={styles.newContainer}
        >
          <div
            className={styles.gap}
            style={{
              // border: 'dotted 1px white',
              width: '100%',
              // color: 'white',
              // flex: '1 1 25%',
              // boxSizing: 'border-box',
            }}
            id="mydiv"
          >
            {/* Station : {station} */}
            GAP
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={eligible}
              sx={{ width: '100%', color: 'white' }}
              value={newItem}
              onChange={(event: any, newValue: any) => {
                setNewItem(newValue);
                itemSelected(newValue);
              }}
              // inputValue={inputValue}
              // onInputChange={(event, newInputValue) => {
              //   setInputValue(newInputValue);
              // }}
              renderInput={(params) => (
                <TextField {...params} label="Add Item" />
              )}
              filterOptions={filterOptions}
            />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Gap;
