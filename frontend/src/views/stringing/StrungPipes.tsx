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
  list: Array<any>,
  startIndex: number,
  endIndex: number
): Array<any> => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 50;

const NewStrungPipes = () => {
  
  const [sequence, setSequence] = useState<Array<number>>([]); // correct order of pipe ids
  
  const [window, setWindow] = useState(-1); //careful sliding left when window = 0 ; "view slider"
                                            // right now set to left most index of view (0, rn)
  
  const [pipeDetails, setPipeDetails] = useState<{ [index: number]: any }>({}); // details of pipes in view (what's displayed)
                                                                                // ONLY for THIS window
  
  const [loading, setLoading] = useState(true);

  // pipe id + station (pairs them)
  const [stations, setStations] = useState<{
    [index: number | string]: number;
  }>({});
  const [initialLength, setInitialLength] = useState<number>(-1); // window = 0; length = 0
                                                                  // based on total length BEFORE first pipe of window
  
  
  
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
    api
      .getStringing()
      .then((res) => {
        setSequence(res);
        setWindow(0);
      })
      .catch((err) => alert(err.message));
  }, []);

  useUpdateEffect(() => {
    api
      .getStrungPipesInfo(sequence.slice(window, window + 4))
      .then((res) => {
        api
          .getSequenceLength(sequence.slice(0, window))
          .then((res2) => {
            setInitialLength(Number(res2.length));
          })
          .catch((error) => alert(error.message));

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

  useUpdateEffect(() => {
    let stations: { [index: number | string]: number } = {};
    let total = initialLength;

    for (let i = 0; i < sequence.length; i++) {
      stations[sequence[i]] = total;
      total += Number(pipeDetails[sequence[i]].length);
    }

    setStations(stations);
  }, [initialLength]);

  const onDragEnd = (result: any) => {
    // dropped outside the list
    if (
      !result.destination ||
      result.source.index == result.destination.index
    ) {
      return;
    }

    let target_pipe = result.draggableId;

    const items = reorder(
      sequence,
      window + result.source.index,
      window + result.destination.index
    );

    let left_pipe = items[window + result.destination.index - 1];

    let temp = sequence;
    setSequence(items);

    if (!left_pipe) left_pipe = null;

    return api
      .updateSequence({ target_pipe, left_pipe })
      .then((res) => {})
      .catch((err) => {
        alert(err.message);
        setSequence(temp);
      });
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
        {/* <div className={classes.center}>
          <Button variant="contained" color="secondary">
            Refresh
          </Button>
        </div> */}
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
                                <div>
                                  Station = {Math.floor(stations[item] / 100)} +{' '}
                                  {stations[item] % 100}
                                </div>
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
