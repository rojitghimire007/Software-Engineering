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
import useUpdateEffect from 'utils/useUpdateEffect';

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

const grid = 50;

const NewStrungPipes = () => {
  const [data, setData] = useState<dataType[]>([]);
  const [sequence, setSequence] = useState<Array<number>>([]);
  const [window, setWindow] = useState(-1); //careful sliding left when window = 0
  const [pipeDetails, setPipeDetails] = useState<{ [index: number]: any }>({});

  const [loading, setLoading] = useState(true);
  const classes = useStyles();

  const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    paddingLeft: grid * 2,
    paddingRight: grid * 2,
    margin: `0 ${grid}px 0 10px`,

    // change background colour if dragging
    // drag colors not changing yet
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

  useEffect(() => {
    api
      .getStringing()
      .then((res) => {
        setSequence(res);
        setWindow(0);
      })
      .catch((err) => alert(err));
  }, []);

  useUpdateEffect(() => {
    api
      .getStrungPipesInfo(sequence.slice(window, window + 4))
      .then((res) => {
        setPipeDetails(
          res.reduce((result: any, entry: any) => {
            result[entry.id] = entry;
            return result;
          }, {})
        );
      })
      .catch((err) => alert(err));
  }, [window]);

  useUpdateEffect(() => {
    setLoading(false);
  }, [pipeDetails]);

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
    // if (!result.destination) {
    //   return;
    // }

    console.log(result);

    // const [items, pipe, left_pipe] = reorder(
    //   data,
    //   result.destination.index,
    //   result.source.index
    // );

    // setData(items);

    // api
    //   .updateStringing(
    //     pipe.pipe_id,
    //     pipe.id,
    //     pipe.station,
    //     left_pipe ? left_pipe.pipe_id : null
    //   )
    //   .then((res) => updateData())
    //   .catch((err) => alert(err));

    return new Promise((resolve, reject) => reject('Hello'));
  };

  if (!loading)
    return (
      <div className={classes.body}>
        <CssBaseline />
        <Toolbar className={classes.title}>
          <Typography variant="h4" className={classes.titleContent}>
            Pipe Stringing
          </Typography>
        </Toolbar>
        {/* <Toolbar className={classes.title}> */}
        <div className={classes.center}>
          <Button variant="contained" color="secondary">
            Refresh
          </Button>
        </div>
        {/*</Toolbar>*/}

        <main>
          <div>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable" direction="horizontal">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                    {...provided.droppableProps}
                    className={classes.virtList}
                  >
                    {sequence.map((item, index) => {
                      return (
                        <>
                          {/* <div>{`${item.station} + ${item.id}`}</div> */}
                          <Draggable
                            key={`${item}`}
                            draggableId={`${item}`}
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
                                  <span>{item}</span>
                                </div>

                                {/* Information Below */}
                                <div>Heat No = {pipeDetails[item].heat_no}</div>
                                <div>
                                  Wall = {pipeDetails[item].wall_thickness}
                                </div>
                                <div>Grade = {pipeDetails[item].grade}</div>
                                <div>Length = {pipeDetails[item].length}</div>
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
  else return <></>;
};

export default NewStrungPipes;
