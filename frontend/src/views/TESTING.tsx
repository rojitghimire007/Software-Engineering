import React, { useState, useEffect} from 'react'

//////////////
// imported //
//////////////
import PipeCutter from '../components/PipeCutter'
import Pipe from '../components/Pipe'
import DemoA from '../DEMOS/DemoA'
import DemoI from '../DEMOS/DemoI'
import RunCarousel from 'DEMOS/ZachDemo/RunCarousel'
import RunCarousel2 from 'DEMOS/ZachDemo/RunCarousel2'
import Pipe2 from 'DEMOS/components/Pipe2'
//////////////

const TESTING = () => {
    return (
        <>
        {/* <PipeCutter/> */}
        {/* <Pipe length={100} height={50}/>
        <Pipe length={50} height={50}/>
        <Pipe length={25} height={50}/> */}
        <div style={{border: '5px solid blue', margin: '20px', padding: '20px', width: 'calc(100% - 80px)', display: 'grid',gridAutoFlow: 'column',overflow: 'scroll',gap: '20px',background: 'linear-gradient(to bottom, rgba(0,50,50,.5), rgba(0,120,255,.5)'}}>
            <Pipe2 length={100} height={50} pid="p_10" station={100} gap={true} heat="A66845" thickness={40} grade="X40" />
            <Pipe2 length={100} height={50} pid="p_10" station={100} gap={false} heat="A66845" thickness={40} grade="X40" />
            <Pipe2 length={100} height={50} pid="p_10" station={100} gap={false} heat="A66845" thickness={40} grade="X40" />
            <Pipe2 length={100} height={50} pid="p_10" station={100} gap={true} heat="A66845" thickness={40} grade="X40" />
            <Pipe2 length={300} height={50} pid="p_10" station={100} gap={true} heat="A66845" thickness={40} grade="X40" />
            <Pipe2 length={100} height={50} pid="p_10" station={100} gap={true} heat="A66845" thickness={40} grade="X40" />
            <Pipe2 length={100} height={50} pid="p_10" station={100} gap={true} heat="A66845" thickness={40} grade="X40" />
        </div>
        {/* <DemoA /> */}
        {/* <DemoI /> */}
        {/* <RunCarousel /> */}
        {/* <RunCarousel2 /> */}
        </>
    )
}

export default TESTING;
