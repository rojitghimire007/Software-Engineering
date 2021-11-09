import React, { useState, useEffect} from 'react'

//////////////
// imported //
//////////////
import PipeCutter from '../components/PipeCutter'
import Pipe from '../components/Pipe'
import VirtualPipesList from 'components/VirtualPipesList'
//////////////

const TESTING = () => {
    return (
        <>
            {/* <PipeCutter/> */}
            {/* <Pipe length={50} height={50}/> */}
            <VirtualPipesList/>
        </>
    )
}

export default TESTING;
