import React from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import NewPipe from './NewPipe'
import styles from './stringing-lanes.module.css'

const StringingLane = ({ toMap }: any) => {
    return (
        <div className={styles.container}>
            <div className={styles.stationContainer}>
                <div className={styles.stationSig}>
                    Station No.
                </div>
                <div className={styles.station}>
                    "247+91"
                </div>
            </div>
            <div />
            <div className={styles.stationContainer}>
                <div className={styles.stationSig}>
                    Station No.
                </div>
                <div className={styles.station}>
                    "247+91"
                </div>
            </div>
            <div />
            <div className={styles.stationContainer}>
                <div className={styles.stationSig}>
                    Station No.
                </div>
                <div className={styles.station}>
                    "247+91"
                </div>
            </div>
            <div />
            <div className={styles.stationContainer}>
                <div className={styles.stationSig}>
                    Station No.
                </div>
                <div className={styles.station}>
                    "247+91"
                    <div className={styles.divider}>|</div>
                </div>
            </div>
            <div />
            <Droppable droppableId="droppable" direction="horizontal">
                {(provided, snapshot) => (
                    <div
                        className={styles.lane}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {toMap.map((item: any, index: any) => {
                            return (
                                <Draggable
                                    key={`${item.name}`}
                                    draggableId={`${item.name}`}
                                    index={index}
                                >
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            // style={{gridColumn: `${index}`}}
                                        >
                                            <NewPipe
                                                drag={provided.dragHandleProps}
                                                information={item}
                                            />
                                        </div>
                                    )}
                                </Draggable>
                            )
                        })}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    )
}

export default StringingLane
