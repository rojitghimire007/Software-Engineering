import React, { useEffect, useState } from 'react';
import ReactDOM, { unstable_batchedUpdates } from 'react-dom';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import api from 'api';

import { createFilterOptions } from '@mui/material/Autocomplete';

import useStyles from '../../style/StringingStyles';
import useUpdateEffect from 'utils/useUpdateEffect';
import styles from './new-stringing-components/style-modules/newStringing.module.css';
import Gap from './Gap';
import MainLaneControls from './new-stringing-components/MainLaneControls';
import StationContainer from 'views/stringing/new-stringing-components/StationContainer';
import MainLaneDraggable from './new-stringing-components/MainLaneDraggable';

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

    if (gap_length > 50) {
      let temp = leftEnd;
      for (let i = 0; i < 4; i++) {
        leftSequence.push({ item_id: 'gap', station_number: temp });
        temp += gap_length / 4;
      }
    } else leftSequence.push({ item_id: 'gap', station_number: leftEnd });
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

const defaultSequence: Array<dataType> = [
  { item_id: 'gap', station_number: 0 },
  { item_id: 'gap', station_number: 50 },
  { item_id: 'gap', station_number: 100 },
  { item_id: 'gap', station_number: 150 },
];
const getLastItem = (arr: any) => {
  if (arr.length == 0 || arr.at(-1).item_id === 'gap') return [];

  let last = arr.at(-1);

  return [
    {
      item_id: 'gap',
      station_number: last.station_number + (last.plength || last.flength),
    },
  ];
};

const StrungItems = () => {
  const [sequence, setSequence] = useState<Array<dataType>>([]); // correct order of pipe ids
  const [tempSequence, setTempSequence] = useState<Array<dataType>>([]);
  const [currentItemDetails, setCurrentItemDetails] = useState<Array<any>>([]);

  const [startWindow, setStartWindow] = useState(-1); //careful sliding left when window = 0 ; "view slider"
  // right now set to left most index of view (0, rn)

  const [loading, setLoading] = useState(true);

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

  /**
   * Changes a gap item into a physical item
   * @param index Index of gap item
   * @param station Station number of gap item
   * @param data The details of the item selected
   */
  const transformGap = (index: number, station: number, data: dataType) => {
    // let length = sequence[window + index + 1].plength || sequence[window + index + 1].flength

    let target_pipe = data.item_id;
    if (!new RegExp('F_.*').test(target_pipe)) target_pipe = 'P_' + target_pipe;

    sequence[startWindow + index] = {
      ...data,
      station_number: station,
      item_id: target_pipe,
    };

    let [left_item, start_item] = getLeftAndStartItem(sequence, index);

    // Preceeded by a gap and the new item doesn't seal the gap between it and the next item
    if (
      (!sequence[startWindow + index - 1] ||
        sequence[startWindow + index - 1].item_id == 'gap') &&
      sequence[startWindow + index + 1] &&
      (station + (data.plength || data.flength || 0) <
        sequence[startWindow + index + 1].station_number ||
        sequence[startWindow + index - 1].item_id == 'gap')
    ) {
      api
        .createNewSequence(station, target_pipe)
        .then((res) => {
          let temp = insertItem(sequence, startWindow + index + 1, {
            item_id: 'gap',
            station_number: station + (data.plength || data.flength || 0),
          });

          if (tempSequence.length == 0) {
            setSequence(temp);
          } else {
            if (
              sequence[sequence.length - 1].station_number <
              tempSequence[0].station_number
            ) {
              createGaps(temp, tempSequence);
              unstable_batchedUpdates(() => {
                setSequence([...temp, ...tempSequence]);
                setStartWindow(0);
                setTempSequence([]);
              });
            } else {
              createGaps(tempSequence, temp);
              let l = tempSequence.length + temp.length;
              unstable_batchedUpdates(() => {
                setSequence([...tempSequence, ...temp]);
                setStartWindow(l - 5);
                setTempSequence([]);
              });
            }
          }
        })
        .catch((e) => alert(e.message));
    } else {
      api
        .insertIntoSequence(target_pipe, left_item, start_item)
        .then((res) => {
          if (
            sequence[startWindow + index + 1] &&
            sequence[startWindow + index].station_number +
              (sequence[startWindow + index].plength ||
                sequence[startWindow + index].flength ||
                0) <
              sequence[startWindow + index + 1].station_number
          ) {
            setSequence(
              insertItem(sequence, startWindow + index + 1, {
                item_id: 'gap',
                station_number:
                  sequence[startWindow + index].station_number +
                  (sequence[startWindow + index].plength ||
                    sequence[startWindow + index].flength ||
                    0),
              })
            );
            updateDetails();
          } else {
            setSequence([...sequence]);
            updateDetails();
          }
        })
        .catch((err) => alert(err.message));
    }

    if (target_pipe.charAt(0) == 'F')
      target_pipe = target_pipe.replace('F_', 'F');
    else target_pipe = target_pipe.substring(2);

    setEligible(remove(eligible, eligible.indexOf(target_pipe)));
  };

  /**
   * Get stringing data and initialize sequence state.
   * Also detects gaps and inserts gap items in the sequence.
   */
  useEffect(() => {
    api
      .getStringing()
      .then((res) => {
        if (res.length > 0) {
          for (let i = 0; i < res.length - 1; i++) {
            detectOverlaps(res[i], res[i + 1]);
            createGaps(res[i], res[i + 1]);

            let arr = res[i];

            for (let j = 0; j < arr.length; j++) {
              if (arr[j].item_id === 'gap') continue;

              let temp =
                arr[j].station_number + (arr[j].plength || arr[j].flength || 0);

              if (arr[j + 1] && temp < arr[j + 1].station_number) {
                arr.splice(j + 1, 0, {
                  item_id: 'gap',
                  station_number: temp,
                });
              }
            }
          }

          let arr: any[] = [];
          for (let row of res) for (let e of row) arr.push(e);

          // If less than 4 items in stringing. It will always be >= 1.
          if (arr.length < 4) {
            arr = [...arr, ...getLastItem(arr)];
            let temp = arr.length;
            for (let i = 0; i < 4 - temp; i++) {
              arr.push({
                item_id: 'gap',
                station_number: arr[arr.length - 1].station_number + 50,
              });
            }
          }

          unstable_batchedUpdates(() => {
            setSequence([...arr, ...getLastItem(arr)]);
            setLoading(false);
            setStartWindow(0);
          });
        } else {
          unstable_batchedUpdates(() => {
            setSequence(defaultSequence);
            setLoading(false);
            setStartWindow(0);
          });
        }

        // updatePipesOnScreen(0, res);}
      })
      .catch((err) => alert(err.message));
  }, []);

  /**
   * Gets all the items that are eligibe to be added to stringing
   */
  useEffect(() => {
    api
      .getStriningEligiblePipes()
      .then((res) => {
        setEligible(
          res.map((item: string) => {
            if (new RegExp('F_.*').test(item)) {
              return item.replace('F_', 'F');
            }
            return item;
          })
        );
      })
      .catch((err) => alert(err.message));
  }, []);

  const updateDetails = () => {
    api
      .getStrungItemsInfo(
        sequence.slice(startWindow, startWindow + 4).map((item) => item.item_id)
      )
      .then((res) => setCurrentItemDetails(res))
      .catch((err) => alert(err.message));
  };

  useUpdateEffect(() => {
    setCurrentItemDetails([]);
    updateDetails();
  }, [startWindow]);

  useEffect(() => {
    let last = getLastItem(sequence);

    if (last.length == 0) return;
    else {
      setSequence([...sequence, ...last]);
    }
  }, [sequence]);
  /**
   * Depricated
   */
  const addNewItem = (result: any) => {
    let target_pipe = result.draggableId;
    let [left_item, start_item] = getLeftAndStartItem(
      sequence,
      result.destination.index
    );

    if (!new RegExp('F_.*').test(target_pipe)) target_pipe = 'p_' + target_pipe;
    return api
      .insertIntoSequence(target_pipe, left_item, start_item)
      .then((res) => {
        updateStations(
          sequence,
          startWindow + result.destination.index,
          newItemDetails.plength || newItemDetails.flength || 0
        );

        let prevItem: dataType =
          sequence[startWindow + result.destination.index - 1];

        let length = {};
        if (new RegExp('F_.*').test(target_pipe))
          length = { flength: newItemDetails.flength };
        else length = { plength: newItemDetails.plength };

        let prev;
        setSequence(
          insertItem(sequence, startWindow + result.destination.index, {
            item_id: target_pipe,
            station_number: prevItem
              ? prevItem.station_number +
                (prevItem.flength || prevItem.plength || 0)
              : 0,
            ...length,
          })
        );
        setCurrentItemDetails(
          insertItem(
            currentItemDetails,
            startWindow + result.destination.index,
            {
              heat_no: newItemDetails?.heat_no,
              wall_thickness: newItemDetails?.wall_thickness,
              grade: newItemDetails?.grade,
            }
          )
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
      startWindow + result.source.index,
      startWindow + result.destination.index
    );

    // if(items[result.destination.index + 1]){
    //   let temp = items[result.destination.index].station_number;
    //   items[result.destination.index].station_number = items[result.destination.index + 1].station_number

    // }

    let [left_item, start_item] = getLeftAndStartItem(
      items,
      result.destination.index
    );

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

  const deleteFromSequence = (index: number) => {
    let item: dataType = sequence[startWindow + index];
    if (window.confirm(`Are you sure you want to delete ${item.item_id}?`)) {
      let { item_id, station_number } = item;
      return api
        .deleteFromSequence(item_id)
        .then((res) => {
          // updateStations(
          //   sequence,
          //   window + index,
          //   -1 * (item.flength || item.plength || 0)
          // );
          let items = remove(sequence, startWindow + index);
          items = insertItem(items, startWindow + index, {
            item_id: 'gap',
            station_number,
          });
          setSequence(items);
          if (new RegExp('F_.*').test(item_id))
            item_id = item_id.replace('F_', 'F');
          else item_id = item_id.substring(2);
          setEligible([...eligible, item_id]);
        })
        .catch((err) => alert(err.message));
    }
  };

  const getLeftAndStartItem = (items: Array<any>, destinationIndex: number) => {
    let left_item = items[startWindow + destinationIndex - 1];
    let start_item = null;
    if (!left_item || left_item.item_id == 'gap') {
      start_item = items[startWindow + destinationIndex + 1].item_id;
      left_item = null;
    } else left_item = left_item.item_id;

    return [left_item, start_item];
  };

  const onDragEnd = (result: any) => {
    // dropped outside the list
    if (!result.destination) return;
    //  else if (result.destination.droppableId === 'delete') {
    //   // deleteFromSequence(result);
    // } else if (
    //   result.source.droppableId == 'hold' &&
    //   result.destination.droppableId === 'droppable'
    // )
    //   addNewItem(result);
    // else if (
    //   result.destination.droppableId == 'hold' &&
    //   result.source.droppableId === 'droppable'
    // ) {
    //   setNewItemDetails({
    //     ...sequence[startWindow + result.source.index],
    //     ...currentItemDetails[result.source.index],
    //   });
    //   let { station_number } = sequence[startWindow + result.source.index];
    //   let items = remove(sequence, startWindow + result.source.index);
    //   items = insertItem(items, result.source.index, {
    //     item_id: 'gap',
    //     station_number,
    //   });
    //   setSequence(items);
    // } else if (result.source.index == result.destination.index) return;
    // else updateSequence(result);

    updateSequence(result);
  };

  const findItem = (item_id: string) => {
    if (item_id.charAt(0) == 'f' || item_id.charAt(0) == 'F')
      item_id = 'F_' + item_id.substring(1);
    else item_id = 'P_' + item_id;

    for (let i = 0; i < sequence.length; i++) {
      if (sequence[i].item_id === item_id) {
        if (tempSequence.length > 0) {
          unstable_batchedUpdates(() => {
            setSequence(tempSequence);
            setStartWindow(i);
          });
        } else {
          setStartWindow(i);
        }
        return i;
      }
    }

    alert(`${item_id} has not been added to stringing.`);
  };

  const goToStation = (target: number) => {
    if (target < 0) {
      setStartWindow(0);
      return;
    }

    let position = 0;

    let items: Array<dataType> =
      tempSequence.length == 0 ? [...sequence] : [...tempSequence];

    // Target is greater than all exisiting stations
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
      setStartWindow(0);
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

    if (position == -1) {
      items.splice(0, 0, {
        item_id: 'gap',
        station_number: target,
      });
    } else if (
      items[position].item_id === 'gap' &&
      items[position].station_number != target
    ) {
      items.splice(position + 1, 0, {
        item_id: 'gap',
        station_number: target,
      });
      // position += 1;
    }

    setSequence(items);
    setStartWindow(position + 1);
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

  //////////////////////////////
  //            OLD
  //////////////////////////////
  const controlFunctions = [
    {
      moveLeft: {
        btnName: 'Move Left',
        btnStyle: 'move',
        disabled: tempSequence.length == 0 && startWindow == 0 ? true : false,
        onClick: () => {
          if (tempSequence.length > 0) {
            let arr = [...tempSequence];

            unstable_batchedUpdates(() => {
              setSequence(arr);
              setTempSequence([]);
              setStartWindow(arr.length - 4);
            });
          } else {
            setStartWindow(startWindow - 1);
          }
        },
      },
      moveRight: {
        btnName: 'Move Right',
        btnStyle: 'move',
        disabled: startWindow + 4 >= sequence.length ? true : false,
        onClick: () => {
          setStartWindow(startWindow + 1);
        },
      },
      add: {
        btnName: 'Add Pipe +',
        btnStyle: 'add',
        disabled: false,
        onClick: (e: any) => {},
      },
      stationInput: {
        onChange: (e: any) => {
          setGoTo(e.currentTarget.value);
        },
      },
    },
  ];

  const [stationNumbers, setStationNumbers] = useState([0, 1, 2, 3, 4]);

  useEffect(() => {
    setStationNumbers(
      sequence
        .slice(startWindow, startWindow + 4)
        .map((item) => item.station_number)
    );
  }, [sequence, startWindow]);

  if (!loading)
    return (
      <main className={styles.main}>
        <h1 className={styles.title}>Stringing</h1>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className={styles.sectionA}>
            <div className={styles.mainTop}>
              <MainLaneControls
                styles={styles}
                goToStation={goToStation}
                findItem={findItem}
                controls={controlFunctions}
              />
              <StationContainer styles={styles} stations={stationNumbers} />
            </div>
            <div className={styles.mainBottom}>
              <div>
                {/* <DragDropContext onDragEnd={onDragEnd}> */}
                <Droppable droppableId="droppable" direction="horizontal">
                  {(provided, snapshot) => (
                    <div
                      style={{
                        // minWidth: '100%',
                        display: 'flex',
                        flexFlow: 'row nowrap',
                        // paddingTop: '5%',
                        // justifyContent: 'space-between',
                        // position: 'relative',
                        minWidth: '90vw',
                      }}
                      ref={provided.innerRef}
                      // style={getListStyle(snapshot.isDraggingOver)}
                      {...provided.droppableProps}
                      className={classes.virtList}
                    >
                      {sequence
                        .slice(startWindow, startWindow + 4)
                        .map((item: dataType, index) => {
                          if (item.item_id == 'gap')
                            return (
                              <Gap
                                station={item.station_number}
                                dragIndex={index}
                                eligible={eligible}
                                transformGap={transformGap}
                                key={index}
                              />
                            );
                          else
                            return (
                              <MainLaneDraggable
                                item={{ ...item, ...currentItemDetails[index] }}
                                index={index}
                                deleteFromSequence={deleteFromSequence}
                                key={index}
                              />
                            );
                        })}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </div>
          </div>
          <div className={styles.sectionB}>
            {/* <Droppable droppableId="delete" direction="horizontal">
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      // style={getListStyle(snapshot.isDraggingOver)}
                      {...provided.droppableProps}
                      // className={classes.virtList}
                      style={{
                        height: '20vh',
                        width: '30vw',
                        backgroundColor: 'red',
                      }}
                    >
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable> */}
          </div>
        </DragDropContext>
      </main>
    );
  else return <></>;
};

export default StrungItems;
