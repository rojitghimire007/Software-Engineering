import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Gap = ({
  gap_length,
  start,
  dragIndex,
}: {
  gap_length: number;
  start: number;
  dragIndex: number;
}) => {
  const [dummyStations, setDummyStations] = useState<number[]>([]);

  const updateGap = () => {
    let arr = [];
    if (gap_length > 50) {
      let temp = start;
      for (let i = 0; i < 4; i++) {
        arr.push(temp);
        temp += gap_length / 4;
      }
    } else arr.push(start);

    setDummyStations([...arr]);
  };
  useEffect(() => {
    updateGap();
  }, []);
  useEffect(() => {
    updateGap();
  }, [gap_length]);

  return (
    <>
      {dummyStations.map((item, index) => {
        return (
          <Draggable
            key={`${item}`}
            draggableId={`${item}`}
            index={index + dragIndex + 1}
            isDragDisabled
          >
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={{ margin: '0 50px' }}
              >
                {console.log(`Gap: ${index + dragIndex + 1}`)}
                <div style={{ border: 'dotted 1px black' }} id="mydiv">
                  Station : {item}
                </div>
              </div>
            )}
          </Draggable>
        );
      })}
    </>
  );
};

export default Gap;
