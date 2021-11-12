import React, {
  Component,
  useEffect,
  useState,
  SyntheticEvent,
  MouseEvent,
} from 'react';
import ReactDOM, { unstable_batchedUpdates } from 'react-dom';
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
  TextField,
  Container,
  CardActionArea,
  ListItem,
} from '@material-ui/core';
import {
  Select,
  MenuItem,
  FormControl,
  Button,
  IconButton,
  collapseClasses,
  Snackbar,
} from '@mui/material';

import { typography } from '@mui/system';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import useStyles from '../../style/StringingStyles';
import useUpdateEffect from 'utils/useUpdateEffect';
import Gap from './Gap';

// Original:  https://codesandbox.io/s/mmrp44okvj?file=/index.js
type dataType = {
  item_id: string;
  station_number: number;
  overlap?: boolean;
  gap_length?: number;
  plength?: number;
  flength?: number;
  start?: number;
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

const remove = (list: Array<dataType>, index: number) => {
  const result = Array.from(list);
  console.log('==================');
  console.log(result);
  console.log(index);

  result.splice(index, 1);
  console.log(result);

  return result;
};

const grid = 50;

const StrungItems = () => {
  const [sequence, setSequence] = useState<Array<dataType>>([]); // correct order of pipe ids
  const [tempSequence, setTempSequence] = useState<Array<dataType>>([]);

  const [window, setWindow] = useState(-1); //careful sliding left when window = 0 ; "view slider"
  // right now set to left most index of view (0, rn)

  const [pipeDetails, setPipeDetails] = useState<{
    [index: number | string]: any;
  }>({}); // details of pipes in view (what's displayed)
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
    // paddingLeft: grid * 2,
    // paddingRight: grid * 2,
    // margin: `0 ${grid}px 0 10px`,

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

  const detectOverlaps = (leftSequence: any, rightSequence: any) => {
    for (let i = 0; i < rightSequence.length; i++) {
      if (
        leftSequence.at(-1).station_number +
          (leftSequence.at(-1).plength || leftSequence.at(-1).flength) >
        rightSequence[i].station_number
      )
        rightSequence[i]['overlap'] = true;
      else break;
    }

    for (let i = leftSequence.length - 1; i >= 0; i--) {
      if (
        rightSequence[0].station_number <
        leftSequence[i].station_number +
          (leftSequence[i].plength || leftSequence[i].flength)
      )
        leftSequence[i]['overlap'] = true;
      else break;
    }
  };

  const createGaps = (leftSequence: any, rightSequence: any) => {
    let leftEnd =
      leftSequence.at(-1).station_number +
      (leftSequence.at(-1).plength || leftSequence.at(-1).flength);

    if (leftEnd < rightSequence[0].station_number) {
      let gap_length = rightSequence[0].station_number - leftEnd;
      // let arr = [];

      if (gap_length > 50) {
        let temp = leftEnd;
        for (let i = 0; i < 4; i++) {
          leftSequence.push({ item_id: 'gap', station_number: temp });
          temp += gap_length / 4;
        }
      } else leftSequence.push({ item_id: 'gap', station_number: leftEnd });

      //   leftSequence.push({
      //     item_id: 'gap',
      //     start: leftEnd,
      //     gap_length: rightSequence[0].station_number - leftEnd,
      //   });
    }
  };

  useEffect(() => {
    api
      .getStringing()
      .then((res) => {
        for (let i = 0; i < res.length - 1; i++) {
          detectOverlaps(res[i], res[i + 1]);
          createGaps(res[i], res[i + 1]);
        }

        let arr: any[] = [];
        for (let row of res) for (let e of row) arr.push(e);

        unstable_batchedUpdates(() => {
          setSequence([...arr]);
          setLoading(false);
          setWindow(0);
        });

        // updatePipesOnScreen(0, res);
      })
      .catch((err) => alert(err.message));
  }, []);

  const updatePipesOnScreen = async (
    newWindow: number,
    tempSequence: any = sequence
  ) => {
    try {
      let res = await api.getStrungPipesInfo(
        tempSequence.slice(newWindow, newWindow + 4)
      );
      let res2 = await api.getSequenceLength(tempSequence.slice(0, newWindow));

      let x = res.reduce((result: any, entry: any) => {
        result[entry.id] = entry;
        return result;
      }, {});
      unstable_batchedUpdates(() => {
        setInitialLength(Number(res2.length));
        setPipeDetails({ ...pipeDetails, ...x });
        setWindow(newWindow);
        setLoading(false);
      });
    } catch (err: any) {
      alert(err.message);
    }
  };

  const onDragEnd = (result: any) => {
    console.table(result);

    // dropped outside the list
    if (
      !result.destination ||
      result.source.index == result.destination.index
    ) {
      return;
    }

    if (result.destination.droppableId === 'delete') {
      console.log(' Will Delete ');
      return api
        .deleteFromSequence(sequence[window + result.source.index].item_id)
        .then((res) => {
          setSequence(remove(sequence, window + result.source.index));
        })
        .catch((err) => alert(err.message));
    }

    let target_pipe = result.draggableId;

    const items = reorder(
      sequence,
      window + result.source.index,
      window + result.destination.index
    );

    console.log(items);

    let left_pipe = items[window + result.destination.index - 1];
    let start_item = null;
    if (!left_pipe || left_pipe.item_id == 'gap') {
      start_item = items[window + result.destination.index + 1].item_id;
      left_pipe = null;
    } else left_pipe = left_pipe.item_id;

    console.log(target_pipe, left_pipe);

    return api
      .updateSequence(target_pipe, left_pipe, start_item)
      .then((res) => {
        setSequence([...items]);
      })
      .catch((err) => {
        alert(err.message);
        // setSequence([...items]);
      });
  };

  const goToStation = (target: number) => {
    let position = 0;

    let items: Array<dataType> =
      tempSequence.length == 0 ? [...sequence] : [...tempSequence];

    if (target > items[items.length - 1].station_number) {
      if (tempSequence.length == 0) setTempSequence([...items]);

      let arr: Array<dataType> = [];
      for (let i = 0; i < 4; i++) {
        arr.push({
          item_id: 'gap',
          station_number: target,
        });
        target += 50;
      }

      setSequence([...arr]);
      setWindow(0);
      return;
    }

    for (let i = 0; i < items.length; i++) {
      if (items[i].station_number == target) {
        position = i;
        break;
      } else if (items[i].station_number > target) {
        position = i - 1;
        break;
      }
    }

    if (
      items[position].item_id === 'gap' &&
      items[position].station_number != target
    ) {
      items.splice(position + 1, 0, {
        item_id: 'gap',
        station_number: target,
      });
      position += 1;
    }

    setSequence(items);
    setWindow(position);
  };

  //////////////////////////////
  //            NEW
  //////////////////////////////
  const [newDetails, setNewPipe] = useState<{ [index: number | string]: any }>(
    {}
  );
  const [eligible, setEligible] = useState<dataType[]>([]);
  const [newPipeAdded, setNewPipeAdded] = useState(false);
  const [toAdd, setToAdd] = useState('');
  const [goTo, setGoTo] = useState('');

  //////////////////////////////
  //            OLD
  //////////////////////////////

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
                    {sequence
                      .slice(window, window + 4)
                      .map((item: dataType, index) => {
                        if (item.item_id == 'gap')
                          return (
                            <Draggable
                              key={`${item.item_id}${index}`}
                              draggableId={`${item.item_id}${index}`}
                              index={index}
                              isDragDisabled
                            >
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={{ margin: '0 50px' }}
                                >
                                  {/* {console.log(`Gap: ${index +  + 1}`)} */}
                                  <div
                                    style={{ border: 'dotted 1px black' }}
                                    id="mydiv"
                                  >
                                    Station : {item.station_number}
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          );
                        else
                          return (
                            <Draggable
                              key={`${item.item_id}`}
                              draggableId={`${item.item_id}`}
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
                                  className={classes.pipeContainer}
                                >
                                  {/* {console.log(`Pipe: ${index}`)}
                                  {console.log(`Pipe: ${item.item_id}`)} */}

                                  <div className={classes.pipeStart} />

                                  <div className={classes.pipe}>
                                    <div>{item.item_id}</div>
                                    <div>{item.station_number}</div>
                                  </div>
                                  <div className={classes.pipeEnd} />
                                </div>
                              )}
                            </Draggable>
                          );
                      })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <Button
                size="medium"
                color="secondary"
                variant="contained"
                disabled={
                  tempSequence.length == 0 && window == 0 ? true : false
                }
                onClick={() => {
                  if (tempSequence.length > 0) {
                    let arr = [...tempSequence];

                    unstable_batchedUpdates(() => {
                      setSequence(arr);
                      setTempSequence([]);
                      setWindow(arr.length - 4);
                    });
                  } else setWindow(window - 1);
                }}
              >
                Previous
              </Button>
              <Button
                size="medium"
                color="success"
                variant="contained"
                disabled={window + 4 >= sequence.length ? true : false}
                onClick={() => setWindow(window + 1)}
              >
                Next
              </Button>
              <div>
                <TextField
                  value={goTo}
                  onChange={(e) => setGoTo(e.currentTarget.value)}
                />
                <Button onClick={(e) => goToStation(parseInt(goTo))}>GO</Button>
              </div>
              <Droppable droppableId="delete" direction="horizontal">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    // style={getListStyle(snapshot.isDraggingOver)}
                    {...provided.droppableProps}
                    // className={classes.virtList}
                    style={{
                      height: '20vh',
                      width: '20vh',
                      backgroundColor: 'red',
                    }}
                  >
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

export default StrungItems;
