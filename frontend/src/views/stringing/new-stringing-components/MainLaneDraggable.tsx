import React from 'react'
import styles from './style-modules/simplePipes.module.css'
import { Draggable } from 'react-beautiful-dnd'
import { style } from '@mui/system'

const createItem = (itemInfo: any, /* dragProps: any */) => {
    if (itemInfo.item_id && itemInfo.item_id.charAt(0) === 'g') {
        return (
            <div className={`${styles.pipeWrapper} ${styles.gap}`}>
                <div className={`${styles.pipeSide} ${styles.gridSide}`}>side A</div>
                <div className={styles.gapContent}>
                    <div></div>
                    <div style={{ color: 'black', textAlign: 'center' }}>
                        {itemInfo.item_id}
                    </div>
                    <div></div>
                </div>
                <div className={`${styles.pipeSide} ${styles.gridSide}`}>side B</div>
            </div>)
    }
    else if (itemInfo.item_id && itemInfo.item_id.charAt(0) === 'f') {
        return (
            <div className={styles.fittingsWrapper}>
                <div className={`${styles.pipeSide} ${styles.gridSide}`}></div>
                <div className={styles.fittingsContent}>
                    <div>Fitting ID: {itemInfo.item_id}</div>
                    <div>Length: {itemInfo.flength}</div>
                </div>
                <div className={`${styles.pipeSide} ${styles.gridSide}`}></div>
            </div>
        )
    }
    else if (itemInfo.item_id && itemInfo.item_id.charAt(0) === 'p') {
        return (
            <div className={styles.pipeWrapper}>
                <div className={`${styles.pipeSide} ${styles.left}`}></div>
                <div className={styles.pipeContent}>
                    <div>
                        <div>Pipe ID: &nbsp; {itemInfo.item_id}</div>
                        <div>Station: &nbsp; {itemInfo.station_number}</div>
                        <div>Heat:  &nbsp; 123345{itemInfo.heat_no}</div>
                        <div>Grade:  &nbsp; X65{itemInfo.grade}</div>
                        <div>Length: &nbsp; {itemInfo.plength}</div>
                    </div>
                </div>
                <div className={`${styles.pipeSide} ${styles.right}`}></div>
            </div>
        )
    }
    else return <div style={{ width: '100%' }}>Invalid Item</div>
}

const MainLaneDraggable = ({ item, index, dragDetails, }: any) => {
    return (
        <Draggable
            draggableId={item.item_id}
            index={index}
        >
            {(provided) => (
                <div
                    className={styles.pipeContainer}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    // style={{marginTop: '5%'}}
                    key={item.id + index}
                >
                    {createItem(item, /* dragDetails */)}
                </div>
            )}

        </Draggable>
    )
}

export default MainLaneDraggable
