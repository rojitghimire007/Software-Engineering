import React from 'react'
import styles from './style-modules/simplePipes.module.css'

const createItem = (itemType: any, dragProps: any) => {
    if (itemType.item_id.charAt(0) === 'g') {
        return (
            <div
                className={styles.pipeWrapper}
                ref={dragProps[0]}
                {...dragProps[1]}
            // {...dragProps[2]}
            >
                <div className={styles.pipeSide} {...dragProps[2]}>CJ</div>
                <div className={styles.pipeContent} {...dragProps[2]}>gap</div>
                <div className={styles.pipeSide} {...dragProps[2]}>CJ</div>
            </div>
        )
    }
    else if (itemType.item_id.charAt(0) === 'f') {
        return (
            <div
                className={styles.pipeWrapper}
                ref={dragProps[0]}
                {...dragProps[1]}
            >
                <div className={styles.pipeSide} {...dragProps[2]}>CJ</div>
                <div className={styles.pipeContent} {...dragProps[2]}>fitting</div>
                <div className={styles.pipeSide} {...dragProps[2]}>CJ</div>
            </div>
        )
    }
    else if (itemType.item_id.charAt(0) === 'p') {
        return (
            <div
                className={styles.pipeWrapper}
                ref={dragProps[0]}
                {...dragProps[1]}
            >
                <div className={styles.pipeSide} {...dragProps[2]}>CJ</div>
                <div className={styles.pipeContent} {...dragProps[2]}>pipe</div>
                <div className={styles.pipeSide} {...dragProps[2]}>CJ</div>
            </div>
        )
    }
}

const MainLaneDraggable = ({ item, pipeDetails, dragDetails, }: any) => {
    return (
        <div
            className={styles.pipesContainer}
            // ref={dragDetails[0]}
            // {...dragDetails[1]}
            // {...dragDetails[2]}
        >
            {createItem(item, dragDetails)}
            {/* {gap ? */}
            {/* <div
                    className={styles.pipeWrapper}
                // ref={provided.innerRef}
                // {...provided.draggableProps}
                // {...provided.dragHandleProps}
                >
                    <div
                        className={styles.pipeSide}
                        style={{ marginLeft: '20%', marginRight: 0 }}
                    />
                    <div className={styles.pipeContent}>
                        <div /><div>{pipe.item_id}</div><div />
                        <div>Length: {pipe.plength || pipe.flength}</div>
                        
                    </div>
                    <div
                        className={styles.pipeSide}
                        style={{ marginLeft: 0, marginRight: '20%' }}
                    />
                </div> */}
            {/* : */}
            {/* <div
                    className={styles.pipeWrapper}
                // ref={provided.innerRef}
                // {...provided.draggableProps}
                // {...provided.dragHandleProps}
                >
                    <div
                        className={styles.pipeSide}
                        style={{ marginLeft: '20%', marginRight: 0 }}
                    />
                    <div className={styles.pipeContent}>
                        <div /><div>{pipe.item_id}</div><div />
                        <div>Length: {pipe.plength || pipe.flength}</div>
                        
                    </div>
                    <div
                        className={styles.pipeSide}
                        style={{ marginLeft: 0, marginRight: '20%' }}
                    />
                </div> */}
            {/* } */}
        </div>
    )
}

export default MainLaneDraggable
