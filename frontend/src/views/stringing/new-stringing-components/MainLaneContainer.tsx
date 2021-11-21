import React from 'react'
// import MainLaneControls from './MainLaneControls'
// import StationContainer from './StationContainer'
import MainLaneDraggable from '../../../DEMOS/new-stringing-prototype/MainLaneDraggable'
import { Droppable } from 'react-beautiful-dnd'


const MainLaneContainer = ({ styles, onDragEnd }: any) => {
    const stationData = [
        '237+91',
        '237+91',
        '237+50',
        '237+10',
        '236+68',
    ];
    const pipeData = [
        'pipe_A',
        'pipe_B',
        'pipe_C',
        'pipe_D',
    ];
    return (
        <div>
            <div className={styles.mainTop}>
                {/* <MainLaneControls styles={styles} />
                <StationContainer styles={styles} stations={stationData} /> */}
            </div>
            <Droppable droppableId="PipesDragMain">
                {(provided) => (
                    <div
                        className={styles.mainBottom}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {/* <MainLaneDraggable
                            pipes={pipeData}
                            onDragEnd={onDragEnd}
                        /> */}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    )
}

export default MainLaneContainer
