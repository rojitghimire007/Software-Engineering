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
  if (itemInfo.item_id && itemInfo.item_id.charAt(0) === ('g' || 'G')) {
    return (
      <div className={`${styles.pipeWrapper} ${styles.gap}`}>
        <div
          className={`
                    ${styles.pipeSide} 
                    ${styles.gridSide} 
                    ${styles.left}
                `}
        ></div>
        <div className={`${styles.pipeContent} ${styles.gapContent}`}>
          <div></div>
          <div>
            <div />
            <div
              style={{
                color: 'black',
                textAlign: 'center',
                opacity: `1 !important`,
                zIndex: 2,
              }}
            >
              {itemInfo.item_id}
            </div>
            <SimpleButton
              btnName="Add"
              btnStyle="add"
              buttonProps={itemFunctions[0].add}
            />
            <div />
          </div>
        </div>
        <div
          className={`
                    ${styles.pipeSide} 
                    ${styles.gridSide}
                    ${styles.right}
                `}
        ></div>
      </div>
    );
  } else if (
    itemInfo.item_id &&
    (itemInfo.item_id.charAt(0) === 'F' || itemInfo.item_id.charAt(0) === 'f')
  ) {
    return (
      <div className={styles.pipeWrapper}>
        <div
          className={`
                    ${styles.pipeSide} 
                    ${styles.gridSide} 
                    ${styles.left}
                `}
        ></div>
        <div className={`${styles.fittingsContent}`}>
          <div style={{ position: 'relative', top: '15%', left: '10%' }}>
            <div>Fitting ID: {itemInfo.item_id}</div>
            <div>Length: {itemInfo.flength}</div>
          </div>
          <div />
          <div style={{ justifySelf: 'end' }}>
            {/* <SimpleButton btnName='X' btnStyle='delete'/> */}
            <IconButton
              color="warning"
              onClick={() => itemFunctions[0].delete.onClick(index)}
            >
              <CloseIcon />
            </IconButton>
            {/* {console.log(itemFunctions[0].delete)} */}
          </div>
        </div>
        <div
          className={`
                    ${styles.pipeSide} 
                    ${styles.gridSide} 
                    ${styles.right}
                `}
        ></div>
      </div>
    );
  } else if (itemInfo.item_id && itemInfo.item_id.charAt(0) === ('p' || 'P')) {
    return (
      <div className={styles.pipeWrapper}>
        <div className={`${styles.pipeSide} ${styles.left}`}></div>
        <div className={styles.pipeContent}>
          <div>
            <div>Pipe ID: &nbsp; {itemInfo.item_id}</div>
            <div>Station: &nbsp; {itemInfo.station_number}</div>
            <div>Heat: &nbsp; 123345{itemInfo.heat_no}</div>
            <div>Grade: &nbsp; X65{itemInfo.grade}</div>
            <div>Length: &nbsp; {itemInfo.plength}</div>
          </div>
          <div></div>
          <div style={{ justifySelf: 'end' }}>
            <IconButton
              color="warning"
              onClick={() => itemFunctions[0].delete.onClick(index)}
            >
              <CloseIcon />
            </IconButton>
            {/* {console.log(itemFunctions[0].delete)} */}
          </div>
        </div>
        <div className={`${styles.pipeSide} ${styles.right}`}></div>
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
          /* className={styles.pipeContainer} */
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          key={item.id + index}
          // onClick={() => { console.log(item) }}
        >
          {createItem(item, itemFunctions, index /* dragDetails */)}
        </div>
      )}
    </Draggable>
  );
};

export default MainLaneDraggable;
