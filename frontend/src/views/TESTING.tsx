import React, { useState, useEffect} from 'react'

//////////////
// imported //
//////////////
import PipeCutter from '../components/PipeCutter'
import Pipe from '../components/Pipe'

//////////////

const TESTING = () => {
    return (
        <>
            <PipeCutter/>
            <Pipe length={50} height={50}/>
        </>
    )
}

export default TESTING;
