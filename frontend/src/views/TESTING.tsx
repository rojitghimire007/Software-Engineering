import React, { useState, useEffect } from 'react'
import { Draggable, Droppable, DragDropContext } from 'react-beautiful-dnd'

//////////////
// imported //
//////////////
import PipeCutter from '../components/PipeCutter'
import Pipe from '../components/Pipe'
import DemoA from '../DEMOS/DemoA'
import DemoI from '../DEMOS/DemoI'
import RunCarousel from 'DEMOS/ZachDemo/RunCarousel'
import Pipe2 from 'components/stringing-components/Pipe2'
import AButton from 'components/stringing-components/AButton'
import ButtonHolder from 'components/stringing-components/ButtonHolder'
import OptionSelect from 'components/stringing-components/OptionSelect'
import StringingLane from '../components/stringing-new/StringingLane'
import StringingContainer from './stringing/new-stringing-components/StringingContainer'
import NewCutting from 'DEMOS/new-cutting-prototype/NewCutting'

import DraggingFunctions from 'DEMOS/DraggingFunctions'
import PipeCutting from './cutting/PipeCutting'
//////////////

const TESTING = () => {
    //////////////
    // testData //
    //////////////
    const pipesToMap = [
        { name: '1' },
        { name: '2' },
        { name: '3' },
        { name: '4' },
    ]
    const dragDropTesting = ['item A', 'item B', 'item C']
    //////////////
    return (
        <>
            {/* <PipeCutter/> */}
            {/* <Pipe length={100} height={50}/>
            <Pipe length={50} height={50}/>
            <Pipe length={25} height={50}/> */}
            {/* <div style={{border: '5px solid blue', margin: '20px', padding: '20px', width: 'calc(100% - 80px)', display: 'grid',gridAutoFlow: 'column',overflow: 'scroll',gap: '20px',background: 'linear-gradient(to bottom, rgba(0,50,50,.5), rgba(0,120,255,.5)'}}>
            <Pipe2 length={100} height={50} pid="p_10" station={100} gap={true} heat="A66845" thickness={40} grade="X40" />
            <Pipe2 length={100} height={50} pid="p_10" station={100} gap={false} heat="A66845" thickness={40} grade="X40" />
            <Pipe2 length={100} height={50} pid="p_10" station={100} gap={false} heat="A66845" thickness={40} grade="X40" />
            <Pipe2 length={100} height={50} pid="p_10" station={100} gap={true} heat="A66845" thickness={40} grade="X40" />
            <Pipe2 length={300} height={50} pid="p_10" station={100} gap={true} heat="A66845" thickness={40} grade="X40" />
            <Pipe2 length={100} height={50} pid="p_10" station={100} gap={true} heat="A66845" thickness={40} grade="X40" />
            <Pipe2 length={100} height={50} pid="p_10" station={100} gap={true} heat="A66845" thickness={40} grade="X40" />
            </div> */}
            {/* <DemoA /> */}
            {/* <DemoI /> */}
            {/* <RunCarousel /> */}
            {/* <RunCarousel2 /> */}
            {/* <div style={{ transformOrigin: 'bottom left', transform: 'rotate(90deg)', display: 'grid', gridTemplateColumns: '180px 180px 180px', gridTemplateRows: '50px', columnGap: '0', }}>
                <AButton color="rgba(255,0,0,1)" index="20" onClick={() => {console.log("clicked")}}/>
                <AButton color="rgba(0,255,0,1)" index="2" onClick={() => {console.log("clicked")}}/>
                <AButton color="rgba(0,0,255,1)" index="2" onClick={() => {console.log("clicked")}}/>
            </div> */}
            {/* <ButtonHolder /> */}
            {/* <StringingLane toMap={pipesToMap} /> */}
            {/* <DragDropContext
                onDragStart={() => {DraggingFunctions.onDragStart()}}
                onDragEnd={() => {DraggingFunctions.onDragEnd()}}
            > */}
            {/* <OptionSelect /> */}
            {/* <StringingLane toMap={pipesToMap} /> */}
            {/* {console.log(pipesToMap)} */}
            {/* </DragDropContext> */}
            {/* <DragDropContext onDragEnd={DraggingFunctions.onDragEnd}>
                <StringingContainer onDragEnd={DraggingFunctions.onDragEnd}/>
            </DragDropContext> */}
            {/* <NewCutting /> */}
            <PipeCutting />




            {/* DnD no collapse POC */}
            {/* <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                }}
            >
                {dragDropTesting.map((item: any, index: any) => {
                    return (
                        <Droppable droppableId={item + 'drop'}>
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    <Draggable draggableId={item} key={item} index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                {item}
                                            </div>
                                        )}
                                    </Draggable>
                                </div>
                            )
                            }
                        </Droppable>
                    )
                })}
            </div> */}
        </>
    )
}

export default TESTING;
