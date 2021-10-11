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

import useStyles from '../../style/StringingStyles';
import AddPipe from 'views/pipes/AddPipe';

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
const keys = ['0','1','2','3'];





const StrungPipes = () => {
  const [data, setData] = useState<dataType[]>([]);
  
  const classes = useStyles();
  
  const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    paddingLeft: grid * 2,
    paddingRight: grid * 2,
    margin: `0 ${grid}px 0 10px`,
    // position: 'static',
  
    // change background colour if dragging
    background: isDragging ? `${classes.pipeDrag}` : `${classes.pipe}`,
  
    // styles we need to apply on draggables
    ...draggableStyle,
  });
  
  const getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? 'lightblue' : `lightgrey`,
    display: 'flex',
    padding: grid,
    overflow: 'auto',
  });

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
      result.destination.index,
      result.source.index,
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

  // const addPipeTesting = () => {
  //   api
  //     .updateStringing(
  //       "430",
  //       "90",
  //       "40",
  //       // left_pipe ? left_pipe.pipe_id : null

  //     )
  // }

  return (
    <>
      <CssBaseline />
        
      <Toolbar>
        <Button variant="contained" color="secondary" > 
          Refresh
        </Button>
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

                      {/* {console.log(index)}
                      {console.log(item)} */}

                      {/* <div>{`${item.station} + ${item.id}`}</div> */}
                      

                      <Draggable
                        key={`${item.id}`}
                        draggableId={`${item.pipe_id}`}
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
                            className={classes.pipe}
                          >
                            {/* ID */}
                            <div>
                              <span>
                                {item.pipe_id}
                              </span>
                            </div>

                            {/* {console.log(index)}
                            {console.log(item)} */}

                            {/* Information Below */}
                            <div>pipe id = {item.id}</div>
                            <div>station = {item.station}</div>
                            <div>index = {index}</div>
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
