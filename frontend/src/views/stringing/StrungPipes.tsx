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

  useEffect(() => {
    api
      .getStringing()
      .then((res) => {
        setSequence(res);
        updatePipesOnScreen(0, res);
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

    // return api
    //   .updateSequence({ target_pipe, left_pipe })
    //   .then((res) => {})
    //   .catch((err) => {
    //     alert(err.message);
    //     setSequence(temp);
    //   });
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

  // Snackbar stuff
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (event: SyntheticEvent | MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const openSnackbar = (
    <Button color="secondary" size="small" onClick={handleClose}>
      UNDO
    </Button>
    // <IconButton
    //   size="small"
    //   aria-label="close"
    //   color="inherit"
    //   onClick={handleClose}
    // ></IconButton>
  );

  // Going to need another method to update stations before refresh
  // Like for actual pipes!
  const createStations = (item: any, index: number) => {
    // let Length = pipeDetails[item].length;

    return (
      <div className={classes.station}>
        Station = {Math.floor(stations[item] / 100)} + {stations[item] % 100}
      </div>
    );
  };

  const createLength = (length: number) => {
    let numRendered = Math.floor(length / 10);
    const toRender = {
      paddingRight: numRendered * 100 + 'px',
      // backgroundColor: 'yellow',
      margin: 0,
    };
    return <div style={toRender} className={classes.pipePadder}></div>;
  };

  // API call to get available pipes
  useEffect(() => {
    api.getStriningEligiblePipes().then((res) => {
      setEligible(res);
    });
  }, []);

  // Adds the newly added pipe to the array
  useUpdateEffect(() => {
    const combinedArray = { ...pipeDetails, ...newDetails };

    setPipeDetails(combinedArray);
    setNewPipeAdded(true);
  }, [newDetails]);

  // send new pipe to the server
  // currently, can only trigger this ONCE without refreshing the page
  // because of the dependency in the useUpdateEffect!!!
  useUpdateEffect(() => {
    if (toAdd.length > 0) {
      console.log(pipeDetails[toAdd].id);
      console.log('this finally fucking works');

      api
        .appendToString(pipeDetails[toAdd].id)
        .catch((error) => alert(error.message));
    } else {
      console.log(pipeDetails[510].heat_no + ' and ' + toAdd);
    }
    setToAdd('');
  }, [newPipeAdded]);

  // From the form
  // For when button is pressed!
  const updateSelectedPipe = (selected: any) => {
    setToAdd(selected.target.value);
    // console.log("trying to add...")
    console.log(toAdd);
    // console.log("sequence...")
    // console.log(sequence)
  };

  const addPipe = () => {
    let left_pipe = sequence[sequence.length - 1]; // DEFAULT

    api.getStrungPipesInfo([toAdd]).then((res) => {
      // api
      //   .appendToString(res)
      // console.log(res[0].id);
      handleNewPipe(res[0].id);
    });
  };

  const handleNewPipe = (pipe_id: string) => {
    api.getStrungPipesInfo([pipe_id]).then((res) => {
      setNewPipe(
        res.reduce((result: any, entry: any) => {
          result[entry.id] = entry;
          return result;
        }, {})
      );
    });
    // return(
    //   <div>
    //       <div>
    //         Heat No =
    //         {(typeof newDetails[pipe_id] != "undefined") ? newDetails[pipe_id].heat_no : ""}
    //       </div>
    //       <div>
    //         Wall =
    //         {(typeof newDetails[pipe_id] != "undefined") ? newDetails[pipe_id].wall_thickness : ""}
    //       </div>
    //       <div>
    //         Grade =
    //         {(typeof newDetails[pipe_id] != "undefined") ? newDetails[pipe_id].grade : ""}
    //       </div>
    //       <div>
    //         Length =
    //         {(typeof newDetails[pipe_id] != "undefined") ? newDetails[pipe_id].length : ""}
    //       </div>
    //   </div>
    // );
  };

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
                    {sequence.slice(window, window + 4).map((item, index) => {
                      {
                        console.log(item);
                        console.log(pipeDetails);
                      }
                      return (
                        <div>
                          {createStations(item, index)}

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
                                className={classes.pipeContainer}
                              >
                                {/* {console.log(item)} */}
                                <div className={classes.pipeStart} />
                                <div className={classes.pipe}>
                                  {/* ID */}
                                  <div>
                                    <span>{item}</span>
                                  </div>

                                  {/* Information Below */}
                                  <div>
                                    Heat No = {pipeDetails[item].heat_no}
                                  </div>
                                  <div>
                                    Wall = {pipeDetails[item].wall_thickness}
                                  </div>
                                  <div>Grade = {pipeDetails[item].grade}</div>
                                  <div>Length = {pipeDetails[item].length}</div>
                                  <div>
                                    Station = {Math.floor(stations[item] / 100)}{' '}
                                    + {stations[item] % 100}
                                  </div>
                                </div>
                                {createLength(pipeDetails[item].length)}
                                <div className={classes.pipeEnd} />
                              </div>
                            )}
                          </Draggable>
                        </div>
                      );
                    })}
                    {provided.placeholder}

                    {/* ////////////////////////////// */}
                    {/* //            NEW              */}
                    {/* ////////////////////////////// */}
                    <div className={classes.pipeAdd}>
                      <div>
                        <span>Add Pipe Placeholder</span>
                      </div>
                      <div>
                        <FormControl>
                          <Select
                            id="pipe"
                            className={classes.eligiblePipe}
                            label="Choose pipe"
                            onChange={updateSelectedPipe} // extraction
                          >
                            {/* <MenuItem key={"none"} value={"none"}>
                              None
                            </MenuItem> */}
                            {eligible.map((item) => {
                              return (
                                <MenuItem
                                  key={item.pipe_id}
                                  value={item.pipe_id}
                                >
                                  {item.pipe_id}
                                </MenuItem>
                              );
                            })}
                          </Select>
                          <IconButton
                            aria-label="add to string"
                            onClick={() => {
                              addPipe();
                              handleOpen();
                            }}
                          >
                            <AddCircleOutlineIcon />
                          </IconButton>
                          {/* <Snackbar 
                            open={open}
                            autoHideDuration={6000}
                            onClose={handleClose}
                            message="Pipe Added"
                            action={openSnackbar}
                            className={classes.popUp}
                          />      */}
                        </FormControl>
                      </div>
                    </div>
                  </div>
                )}
              </Droppable>

              {/* Transfer List */}
              <Droppable droppableId="droppable2" direction="horizontal">
                {(provided, snapshot) => (
                  <div>
                    {/* <AddCircleOutlineIcon /> */}

                    <div
                      ref={provided.innerRef}
                      style={getListStyle(snapshot.isDraggingOver)}
                      {...provided.droppableProps}
                      className={classes.virtList}
                    >
                      {eligible.map((item, index) => {
                        // return(
                        //   <div>
                        //     <Draggable
                        //       key={`${item}`}
                        //       draggableId={`${item}`}
                        //       index={index}
                        //     >
                        //       {(provided, snapshot) => (
                        //         <div
                        //           ref={provided.innerRef}
                        //           {...provided.draggableProps}
                        //           {...provided.dragHandleProps}
                        //           style={getItemStyle(
                        //             snapshot.isDragging,
                        //             provided.draggableProps.style
                        //             )}
                        //           className={classes.pipeContainer}
                        //         >
                        //           <div className={classes.pipeStart} />
                        //           <div className={classes.pipe}>
                        //             <div>
                        //               <span>
                        //                 {item.pipe_id}
                        //               </span>
                        //             </div>
                        //             {showNewPipe(item.pipe_id)}
                        //           </div>
                        //           <div className={classes.pipeEnd} />
                        //         </div>
                        //       )}
                        //     </Draggable>
                        //   </div>
                        // );
                      })}
                      {provided.placeholder}

                      {/* <div>(Transfer List)</div> */}
                    </div>
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

export default NewStrungPipes;
