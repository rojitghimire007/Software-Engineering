import React from 'react'
import styles from './style-modules/simplePipes.module.css'
import { Draggable } from 'react-beautiful-dnd'

const MainLaneDraggable = ({ pipes, onDragEnd }: any) => {
    return (
        <div className={styles.pipesContainer}>
            {pipes.map((pipe: any, index: number) => {
                return (
                    <Draggable
                        key={pipe}
                        draggableId={pipe}
                        index={index}
                    >
                        {(provided) => (

                            <div
                                className={styles.pipeWrapper}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                            >
                                <div
                                    className={styles.pipeSide}
                                    style={{ marginLeft: '20%', marginRight: 0 }}
                                />
                                <div className={styles.pipeContent}>
                                    {pipe}
                                </div>
                                <div
                                    className={styles.pipeSide}
                                    style={{ marginLeft: 0, marginRight: '20%' }}
                                />
                            </div>
                        )}
                    </Draggable>
                )
            })}
        </div>

    )
}

export default MainLaneDraggable
