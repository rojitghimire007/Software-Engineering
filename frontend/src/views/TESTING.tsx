import React, { useState, useEffect} from 'react'

//////////////
// imported //
//////////////
import PipeCutter from '../components/PipeCutter'
import Pipe from '../components/Pipe'
import DemoA from '../DEMOS/DemoA'
import DemoI from '../DEMOS/DemoI'
import RunCarousel from 'DEMOS/ZachDemo/RunCarousel'
//////////////

const TESTING = () => {
    return (
        <>
        <PipeCutter/>
        <Pipe length={50} height={50}/>
        <DemoA />
        <DemoI />
        {/* <RunCarousel /> */}
        </>
    )
}

export default TESTING;
