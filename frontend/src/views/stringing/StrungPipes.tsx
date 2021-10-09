import React, { Component, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import api from 'api';
import {
  Typography,
  AppBar,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CardHeader,
  CssBaseline,
  Grid,
  Toolbar,
  Button,
  TextField,
  Container,
  CardActionArea,
} from '@material-ui/core';
import { typography } from '@mui/system';

// Original:  https://codesandbox.io/s/mmrp44okvj?file=/index.js
type dataType = {
  station: string;
  id: string;
  pipe_id: string;
};

// a little function to help us with reordering the result
const reorder = (
  list: dataType[],
  startIndex: number,
  endIndex: number
): [dataType[], dataType, dataType] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return [result, removed, result[endIndex - 1]];
};

const grid = 50


const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 ${grid}px 0 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  display: 'flex',
  padding: grid,
  overflow: 'auto',
});

const StrungPipes = () => {
  const [data, setData] = useState<dataType[]>([]);

  useEffect(() => {
    updateData();
  }, []);

  const updateData = () => {
    api
      .getStringingInfo()
      .then((res) => setData(res))
      .catch((err) => {
        alert(err);
        // setData([
        //   { station: '237+10', id: '1', pipe_id: 'pipe 1' },
        //   { station: '237+20', id: '10', pipe_id: 'pipe 2' },
        //   { station: '237+30', id: '100', pipe_id: 'pipe 3' },
        //   { station: '237+40', id: '1000', pipe_id: 'pipe 4' },
        //   { station: '237+50', id: '10000', pipe_id: 'pipe 5' },
        // ]);
      });
  };

  const onDragEnd = (result: any) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const [items, pipe, left_pipe] = reorder(
      data,
      result.source.index,
      result.destination.index
    );

    setData(items);

    api
      .updateStringing(
        pipe.pipe_id,
        pipe.id,
        pipe.station,
        left_pipe ? left_pipe.pipe_id : null
      )
      .then((res) => updateData())
      .catch((err) => alert(err));
  };

  return (
    <>
    <CssBaseline />
      
        <Toolbar>
          <Button variant="contained" color="secondary">Refresh</Button>
        </Toolbar>
      
     
      
    <main> 
      <div>
        
        <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
              {...provided.droppableProps}
            >
              {data.map((item, index) => {
                return (
                  <>
                    <div>{`${item.station} + ${item.id}`}</div>
                    <Draggable
                      key={item.id}
                      draggableId={`${item.id}`}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          {item.pipe_id}
                        </div>
                      )}
                    </Draggable>
                  </>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      
      </div>
      </main>
      </>
  );
};

export default StrungPipes;
