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

// Original:  https://codesandbox.io/s/mmrp44okvj?file=/index.js
type dataType = {
  item_id: string;
  station_number: number;
  overlap?: boolean;
  gap_length?: number;
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

const StrungItems = () => {
  const [sequence, setSequence] = useState<Array<any>>([]); // correct order of pipe ids

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

  useEffect(() => {
    api
      .getStringing()
      .then((res) => {
        for (let i = 0; i < res.length - 1; i++) {
          detectOverlaps(res[i], res[i + 1]);

          if (
            res[i].at(-1).station_number +
              (res[i].at(-1).plength || res[i].at(-1).flength) <
            res[i + 1][0].station_number
          ) {
            res[i].push({
              item_id: 'gap',
              gap_length:
                res[i + 1][0].station_number -
                res[i].at(-1).station_number -
                (res[i].at(-1).plength || res[i].at(-1).flength),
            });
          }
        }

        let arr = [];
        for (let row of res) for (let e of row) arr.push(e);

        setSequence([...arr]);
        setLoading(false);
        // updatePipesOnScreen(0, res);
      })
      .catch((err) => alert(err.message));
  }, []);

  useUpdateEffect(() => {
    let stations: { [index: number | string]: number } = {};
    let total = initialLength;

    for (let i = window; i < window + 4; i++) {
      if (sequence[i]) {
        stations[sequence[i]] = total;
        total += Number(pipeDetails[sequence[i]].length);
      } else break;
    }

    setStations(stations);
  }, [initialLength]);

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

  //////////////////////////////
  //            NEW
  //////////////////////////////
  const [newDetails, setNewPipe] = useState<{ [index: number | string]: any }>(
    {}
  );
  const [eligible, setEligible] = useState<dataType[]>([]);
  const [newPipeAdded, setNewPipeAdded] = useState(false);
  const [toAdd, setToAdd] = useState('');

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
                    {sequence.map((item, index) => {
                      return (
                        <div>
                          {/* {createStations(item, index)} */}

                          {/* <div>{`${item.station} + ${item.id}`}</div> */}
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
                                <div className={classes.pipeStart} />

                                <div className={classes.pipe}>
                                  {item.item_id}
                                </div>
                                <div className={classes.pipeEnd} />
                              </div>
                            )}
                          </Draggable>
                        </div>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </main>
        <Button
          size="medium"
          color="secondary"
          variant="contained"
          disabled={window == 0 ? true : false}
          onClick={() => updatePipesOnScreen(window - 4)}
        >
          Previous
        </Button>
        <Button
          size="medium"
          color="success"
          variant="contained"
          disabled={window + 4 >= sequence.length ? true : false}
          onClick={() => updatePipesOnScreen(window + 4)}
        >
          Next
        </Button>
      </div>
    );
  else return <></>;
};

export default StrungItems;
