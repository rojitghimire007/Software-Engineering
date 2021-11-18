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
  CssBaseline,
  Toolbar,
  //   TextField,
  makeStyles,
} from '@material-ui/core';
import { Button, Autocomplete, TextField } from '@mui/material';
import { createFilterOptions } from '@mui/material/Autocomplete';

import { typography } from '@mui/system';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import useStyles from '../../style/StringingStyles';
import useUpdateEffect from 'utils/useUpdateEffect';
import Gap from './Gap';
import Pipe from '../../components/stringing-components/Pipe2';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import MyButton from 'components/MyButton';
import DeleteDnD from 'components/DeleteDnD';
import TransferDnD from 'components/TransferDnD';
import StringBtnContainer from 'components/StringBtnContainer';

import OptionSelect from 'components/stringing-components/OptionSelect';

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

const styleRules = makeStyles({
  pipeWrapper: {
    width: '100%',
  },
  deleteContainer: {
    height: '20vh',
    width: '80vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'rgba(240,240,240,.25)',
    margin: '0 auto',
    color: 'red',

    '&:hover': {
      background: 'rgba(255,50,50,1)',
      color: 'black',
    },
  },
  deleteIcon: {
    position: 'relative',
    transform: 'scale(2.75)',
    opoacity: 0.75,
    transition: '',
  },
});

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

// Function to remove an array element
const remove = (list: Array<any>, index: number) => {
  const result = Array.from(list);

  result.splice(index, 1);

  return result;
};

// Function to insert item in an array
const insertItem = (list: Array<any>, index: number, item: any) => {
  const result = Array.from(list);

  result.splice(index, 0, item);

  return result;
};

const filterOptions = createFilterOptions({
  matchFrom: 'start',
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

const updateStations = (
  sequence: Array<any>,
  start: number,
  length: number
) => {
  for (let i = start; i < sequence.length; i++) {
    sequence[i].station_number += length;
  }
};

const grid = 50;

const initialNewItem = {
  item_id: '',
  heat_no: '',
  grade: '',
  length: 0,
  wall_thickness: 0,
};

const StrungItems = () => {
  const [sequence, setSequence] = useState<Array<dataType>>([]); // correct order of pipe ids
  const [tempSequence, setTempSequence] = useState<Array<dataType>>([]);
  const [currentItemDetails, setCurrentItemDetails] = useState<Array<any>>([]);

  const [window, setWindow] = useState(-1); //careful sliding left when window = 0 ; "view slider"
  // right now set to left most index of view (0, rn)

  const [loading, setLoading] = useState(true);

  const classes = useStyles();
  const styles = styleRules();

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

  useEffect(() => {
    api
      .getStriningEligiblePipes()
      .then((res) => {
        setEligible(res);
      })
      .catch((err) => alert(err.message));
  }, []);

  useUpdateEffect(() => {
    setCurrentItemDetails([]);

    api
      .getStrungItemsInfo(
        sequence.slice(window, window + 4).map((item) => item.item_id)
      )
      .then((res) => setCurrentItemDetails(res))
      .catch((err) => alert(err.message));
  }, [window]);

  const addNewItem = (result: any) => {
    let target_pipe: string = result.draggableId;
    let [left_item, start_item] = getLeftAndStartItem(sequence, result);

    if (!new RegExp('F_.*').test(target_pipe)) target_pipe = 'p_' + target_pipe;
    console.log('==========================');
    console.log(target_pipe);

    return api
      .insertIntoSequence(target_pipe.toLowerCase(), left_item, start_item)
      .then((res) => {
        updateStations(
          sequence,
          window + result.destination.index,
          newItemDetails.plength || newItemDetails.flength || 0
        );

        let prevItem: dataType =
          sequence[window + result.destination.index - 1];

        let length = {};
        if (new RegExp('F_.*').test(target_pipe))
          length = { flength: newItemDetails.flength };
        else length = { plength: newItemDetails.plength };

        let prev;
        setSequence(
          insertItem(sequence, window + result.destination.index, {
            item_id: target_pipe,
            station_number: prevItem
              ? prevItem.station_number +
              (prevItem.flength || prevItem.plength || 0)
              : 0,
            ...length,
          })
        );
        setCurrentItemDetails(
          insertItem(currentItemDetails, window + result.destination.index, {
            heat_no: newItemDetails?.heat_no,
            wall_thickness: newItemDetails?.wall_thickness,
            grade: newItemDetails?.grade,
          })
        );
        setNewItemDetails(initialNewItem);
        setEligible(remove(eligible, eligible.indexOf(result.draggableId)));
      })
      .catch((err) => alert(err.message));
  };

  const updateSequence = (result: any) => {
    let target_pipe = result.draggableId;

    const items = reorder(
      sequence,
      window + result.source.index,
      window + result.destination.index
    );

    let [left_item, start_item] = getLeftAndStartItem(items, result);

    return api
      .updateSequence(target_pipe, left_item, start_item)
      .then((res) => {
        setSequence([...items]);
      })
      .catch((err) => {
        alert(err.message);
        // setSequence([...items]);
      });
  };

  const deleteFromSequence = (result: any) => {
    let item: dataType = sequence[window + result.source.index];
    let item_id: string = item.item_id;
    return api
      .deleteFromSequence(item_id)
      .then((res) => {
        updateStations(
          sequence,
          window + result.source.index,
          -1 * (item.flength || item.plength || 0)
        );
        setSequence(remove(sequence, window + result.source.index));
        if (new RegExp('p_.*').test(item_id)) item_id = item_id.substring(2);
        setEligible([...eligible, item_id]);
      })
      .catch((err) => alert(err.message));
  };

  const getLeftAndStartItem = (items: Array<any>, result: any) => {
    let left_item = items[window + result.destination.index - 1];
    let start_item = null;
    if (!left_item || left_item.item_id == 'gap') {
      start_item = items[window + result.destination.index + 1].item_id;
      left_item = null;
    } else left_item = left_item.item_id;

    return [left_item, start_item];
  };

  const onDragEnd = (result: any) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    } else if (result.destination.droppableId === 'delete') {
      deleteFromSequence(result);
    } else if (
      result.source.droppableId == 'add' &&
      result.destination.droppableId === 'droppable'
    )
      addNewItem(result);
    else if (result.source.index == result.destination.index) return;
    else updateSequence(result);
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

  const [eligible, setEligible] = useState<string[]>([]);
  const [goTo, setGoTo] = useState('');
  const [newItem, setNewItem] = useState<string>('');
  const [newItemDetails, setNewItemDetails] = useState<{
    item_id: string;
    heat_no: string;
    grade: string;
    plength?: number;
    flength?: number;
    wall_thickness: number;
  }>(initialNewItem);
  const [inputValue, setInputValue] = React.useState('');

  const getItemDetails = (item: string) => {
    api
      .getItemInfo(item)
      .then((res) => {
        let length = {};
        if (new RegExp('F_.*').test(item)) length = { flength: res.length };
        else length = { plength: res.length };

        setNewItemDetails({
          item_id: res.id,
          ...length,
          heat_no: res.heat_no,
          wall_thickness: res.wall_thickness,
          grade: res.grade,
        });
      })
      .catch((error) => alert(error.message));
  };

  const DnDProps = [
    {
      add: {
        autocomplete: {
          id: 'combo-box-demo',
          options: eligible,
          value: newItem,
          onChange: (event: any, newValue: any) => setNewItem(newValue),
          inputValue: inputValue,
          onInputChange: (event: any, newInputValue: any) =>
            setInputValue(newInputValue),
          renderInput: (params: any) => (
            <TextField {...params} label="Add Item" />
          ),
          filterOptions: filterOptions,
        },
        button: {
          variant: 'contained',
          onClick: (e: any) => {
            getItemDetails(newItem);
            setInputValue('');
            setNewItem('');
          },
        },
        newItemDetails: newItemDetails,
      },
      transfer: {
        newItemDetails: newItemDetails,
      },
    },
    /* 
    {
      delete: {

      }
    }, 
    */
  ];

  //////////////////////////////
  //    RENDERING SECTION
  //////////////////////////////

  if (!loading)
    return (
      <div style={{
        maxWidth: '100vw',
        display: 'flex',
        flexFlow: 'column nowrap',
        height: '1000px',
        maxHeight: '100vw',
        overflow: 'hidden',
        backgroundSize: 'contain',
        background: 'linear-gradient( to bottom left, rgba(220,220,220,.7), rgba(20,100,0,.9))',
      }}>
        <CssBaseline />
        {/* <Toolbar className={classes.title} > */}
        {/* <Typography variant="h4" className={classes.titleContent}>
            Pipe Stringing
          </Typography> */}
        {/* </Toolbar> */}
        <div
          style={{
            // display: 'flex',
            fontSize: '3.2rem',
            color: 'white',
            fontFamily: 'Bebas Neue, serif',
            letterSpacing: '.25rem',
            textAlign: 'center',
            width: 'calc(100% - 30px)',
            boxShadow: '-3px 6px 4px 2px rgba(0,40,0,.8)',
            background: 'rgba(20,50,20,.6)',
            margin: '15px 15px 15px 15px',
          }}
        >
          {/* <div
            style={{
              borderRadius: '50% 0 0 50%',
              width: '100%',
            }}
          /> */}
          Pipe Stringing
          {/* <div/> */}
        </div>
        <main>
          <div>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable" direction="horizontal">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                    {...provided.droppableProps}
                  /* className={classes.virtList} */
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
                              // isDragDisabled
                            >
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={{ margin: '0 10px' }}
                                >
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
                                  // style={{ maxWidth: '100vw', overflow: 'hidden', }}
                                  // style={getItemStyle(
                                  //   snapshot.isDragging,
                                  //   // provided.draggableProps.style, 
                                  // )}
                                  style={{
                                    width: '400px',
                                    maxWidth: '100vw',
                                    position: 'relative',
                                    left: '-75px',
                                    marginLeft: '0',
                                    // overflow: 'scroll',
                                  }}
                                >
                                  {console.log(item)}
                                  <Pipe
                                    plength={item.plength}
                                    station={item.station_number}
                                    pid={item.item_id}
                                    length={75}
                                    grade={currentItemDetails[index]
                                      ? currentItemDetails[index].grade
                                      : 'N/A'}
                                    overlap={currentItemDetails[index]
                                      && currentItemDetails[index].overlap
                                      ? "overlap"
                                      : 'NO overlap'}
                                    thickness={currentItemDetails[index]
                                      && currentItemDetails[index].wall_thickness
                                      ? currentItemDetails[index].wall_thickness
                                      : 'N/A'}
                                    heat={currentItemDetails[index]
                                      && currentItemDetails[index].heat_no
                                      ? currentItemDetails[index].heat_no
                                      : 'N/A'}
                                  />
                                </div>
                              )}
                            </Draggable>
                          );
                      })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  size="large"
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
                  style={{ fontFamily: 'Fenix, serif', fontSize: '24px', justifySelf: 'flex-start', margin: '2vh 3vw' }}
                >
                  Previous
                </Button>
                <div style={{ display: "flex", justifyContent: 'flex-start', justifyItems: 'center', alignItems: 'center', }}>
                  <TextField
                    value={goTo}
                    onChange={(e) => setGoTo(e.currentTarget.value)}
                    style={{ marginLeft: '2vw', /* marginBottom: '2vh' */ }}
                  />
                  <Button
                    size="large"
                    color="success"
                    variant="contained"
                    onClick={(e) => goToStation(parseInt(goTo))}
                    placeholder="Select Station"
                    style={{ fontFamily: 'Fenix, serif', fontSize: '24px', height: '50%', marginLeft: '2vw', position: 'relative', /* top: '0.5vh' */ }}
                  >
                    GO TO Station
                  </Button>
                </div>
                <Button
                  size="large"
                  color="success"
                  variant="contained"
                  disabled={window + 4 >= sequence.length ? true : false}
                  onClick={() => setWindow(window + 1)}
                  style={{ fontFamily: 'Fenix, serif', fontSize: '24px', justifySelf: 'flex-end', margin: '2vh 6vw' }}
                >
                  Next
                </Button>
              </div>
              <OptionSelect props={DnDProps} style={{ marginBottom: '0px', }} />
            </DragDropContext>
          </div>
        </main>
      </div>
    );
  else return <></>;
};

export default StrungItems;
