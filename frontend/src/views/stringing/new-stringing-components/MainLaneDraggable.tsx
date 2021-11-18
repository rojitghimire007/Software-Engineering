import React from 'react'
import styles from './style-modules/simplePipes.module.css'

const createItem = (itemInfo: any, dragProps: any) => {
    if (itemInfo.item_id && itemInfo.item_id.charAt(0) === 'g') {
        return (
            <div
                className={styles.pipeWrapper}
                // ref={dragProps[0]}
                // {...dragProps[1]}
            // {...dragProps[2]}
            >
                {/* <div className={styles.pipeSide} {...dragProps[2]}>side A</div> */}
                <div className={styles.pipeContent} /* {...dragProps[2]} */>
                    {itemInfo.item_id} (gap)
                </div>
                {/* <div className={styles.pipeSide} {...dragProps[2]}>side B</div> */}
            </div>
        )
    }
    else if (itemInfo.item_id && itemInfo.item_id.charAt(0) === 'f') {
        return (
            <div
                className={styles.pipeWrapper}
                // ref={dragProps[0]}
                // {...dragProps[1]}
            >
                {/* <div className={styles.pipeSide} {...dragProps[2]}>side A</div> */}
                <div className={styles.pipeContent} /* {...dragProps[2]} */>
                    <div>
                        {itemInfo.item_id} (fitting)
                    </div>
                    <div>Length: {itemInfo.flength}</div>
                </div>
                {/* <div className={styles.pipeSide} {...dragProps[2]}>side B</div> */}
            </div>
        )
    }
    else if (itemInfo.item_id && itemInfo.item_id.charAt(0) === 'p') {
        return (
            <div
                
                // ref={dragProps[0]}
                // {...dragProps[1]}
            >
                <div
                    className={styles.pipeWrapper}
                >
                    {/* <div className={styles.pipeSide} {...dragProps[2]}>side A</div> */}
                    <div className={styles.pipeContent} /* {...dragProps[2]} */>
                        <div>
                            {itemInfo.item_id} (pipe)
                        </div>
                        <div>
                            {itemInfo.station_number}
                        </div>
                        <div>Length: {itemInfo.plength}</div>
                    </div>
                    {/* <div className={styles.pipeSide} {...dragProps[2]}>side B</div> */}
                </div>
            </div>
        )
    }
    else return <div>TEMP</div>
}

const MainLaneDraggable = ({ item, pipeDetails, dragDetails, }: any) => {
    return (
        <div
            className={styles.pipesWrapper}
            ref={dragDetails[0]}
            {...dragDetails[1]}
            {...dragDetails[2]}
        >
            {createItem(item, dragDetails)}
        </div>
    )
}

export default MainLaneDraggable
