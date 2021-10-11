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


import useStyles from '../../style/StringingStyles';

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





const StrungPipes = () => {
  const [data, setData] = useState<dataType[]>([]);
  
  const classes = useStyles();
  
  const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    paddingLeft: grid * 2,
    paddingRight: grid * 2,
    margin: `0 ${grid}px 0 10px`,
  
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
    <div div className={classes.body}>
      <CssBaseline />
      <Toolbar className={classes.title}>
        <Typography variant="h4" className={classes.titleContent}>
          Honor Guard Inspections 
        </Typography>  
      </Toolbar>  
     {/* <Toolbar className={classes.title}> */ }
        <div className={classes.center}>
          <Button variant="contained" color="secondary">Refresh</Button>
        </div>
      {/*</Toolbar>*/}
        
      
        
      <main> 
        <div className={classes.container}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable" direction="horizontal">
              {(provided, snapshot) => (
                <div
                  className={classes.center}
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
                              className={classes.pipe}
                            >
                              {/* ID */}
                              <div>
                                <span>
                                  {item.pipe_id}
                                </span>
                              </div>

                              {/* Information Below */}
                              <div>hey</div>
                              <div>hello</div>
                              <div>world</div>
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
    </div>
  );
};

export default StrungPipes;
