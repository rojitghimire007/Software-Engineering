import React from 'react';
import styles from './style-modules/simplePipes.module.css';
import { Draggable } from 'react-beautiful-dnd';
import SimpleButton from './SimpleButton';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const createItem = (
  itemInfo: any,
  itemFunctions: any,
  index: number /* dragProps: any */
) => {
  if (itemInfo.item_id &&
    (itemInfo.item_id.charAt(0) === 'F' || itemInfo.item_id.charAt(0) === 'f')
  ) {
    return (
      <div className={styles.newPipeWrapper}>
        <div className={styles.fittingContent}>
          <div className={styles.leftInfo}>
            <div>Fitting ID:</div>
            <div>Length:</div>
          </div>
          <div className={styles.rightInfo}>
            <div>{itemInfo.item_id}</div>
            <div>{itemInfo.flength}</div>
          </div>
          <div className={styles.topRow}>
            <IconButton
              color="warning"
              onClick={() => itemFunctions[0].delete.onClick(index)}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </div>
      </div>
    );
  } else if (itemInfo.item_id &&
    itemInfo.item_id.charAt(0) === ('p' || 'P')
  ) {
    return (
      <div className={styles.newPipeWrapper}>
        <div className={styles.pipeSide} />
        <div className={styles.pipeContent}>
          <div className={styles.topRow}>
            <div>
              <IconButton
                color="warning"
                onClick={() => itemFunctions[0].delete.onClick(index)}
              >
                <CloseIcon />
              </IconButton>
            </div>
          </div>
          <div className={styles.leftInfo}>
            <div>Pipe ID:</div>
            <div>Station:</div>
            <div>Heat:</div>
            <div>Grade: </div>
            <div>Length:</div>
          </div>
          <div className={styles.rightInfo}>
            <div>{itemInfo.item_id}</div>
            <div>{itemInfo.station_number}</div>
            <div>123345{itemInfo.heat_no}</div>
            <div>X65{itemInfo.grade}</div>
            <div>{itemInfo.plength}</div>
          </div>
        </div>
        <div className={styles.pipeSide} />
      </div>
    );
  } else return <div style={{ width: '100%' }}>Invalid Item</div>;
};

const MainLaneDraggable = ({
  item,
  index,
  dragDetails,
  itemFunctions,
}: any) => {
  return (
    <Draggable draggableId={item.item_id} key={item.item_id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          key={item.id + index}
          className={styles.newContainer}
        >
          {console.log(item)}
          {createItem(item, itemFunctions, index /* dragDetails */)}
        </div>
      )}
    </Draggable>
  );
};

export default MainLaneDraggable;
