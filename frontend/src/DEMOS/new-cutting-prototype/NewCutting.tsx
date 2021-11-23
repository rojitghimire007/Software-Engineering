import React, { useState, useEffect } from 'react'
import styles from './newCuttingStyles.module.css'
const pipeData = [
    {
        id: 'PIPE_A',
        length: 100.347,
        units: 'feet',
    }
]
const NewCutting = ({id, length}:any) => {
    const [cutLengthPercent, setCutLengthPercent] = useState(50);
    const [leftLength, setLeftLength] = useState(pipeData[0].length * .5)
    const [rightLength, setRightLength] = useState(pipeData[0].length * .5)
    const [cutFinalized, setCutFinalized] = useState(false)
    const [finalLengths, setFinalLengths] = useState([pipeData[0].length, 0])

    useEffect(() => {
        setFinalLengths([leftLength, rightLength])
    }, [cutFinalized === true])

    useEffect(() => {
        setRightLength(pipeData[0].length - (.01 * cutLengthPercent * pipeData[0].length))
    }, [cutLengthPercent])

    useEffect(() => {
        setLeftLength(pipeData[0].length - rightLength)
    }, [rightLength])

    return (
        <div className={styles.cuttingContainer}>
            <div>
                Starting Pipe Length: {pipeData[0].length} feet
            </div>
            <div className={styles.pipeContainer}>
                {/* {pipeData[0].id} */}
                {cutFinalized ?
                    <div
                    >
                        {/* <div
                            style={{ width: leftLength, height: '100px' }}
                        >

                        </div>
                        <div

                            style={{ width: rightLength, marginLeft: '20px', height: '100px' }}
                        >

                        </div> */}
                        cut Pipe! 
                        <div>id 1 {finalLengths[0]}</div>
                        <div>id 2 {finalLengths[1]}</div>
                    </div>
                    :
                    <div
                        className={styles.measure}
                        style={{
                            marginLeft: `${cutLengthPercent != 99.001 ? cutLengthPercent : 99.001}%`,
                        }}
                    />
                }
            </div>
            {/* <div>tick marks here</div> */}
            <div>
                Left Length: {leftLength.toPrecision(5)} {pipeData[0].units}
            </div>
            <div>
                Right Length: {rightLength.toPrecision(5)} {pipeData[0].units}
            </div>
            <div>
                {/* {cutLengthPercent} */}
            </div>
            <input
                type="range"
                min={0.999}
                max={99.001}
                onInput={(e: any) => setCutLengthPercent(e.target.value)}
                step={.001}
                style={{
                    margin: '2%% 1% 0 1%'
                }}
            />
            <input
                type="number"
                min={0.999}
                max={99.999}
                onInput={(e: any) => setCutLengthPercent(e.target.value)}
                step={.001}
                style={{
                    margin: '1% 2% 1% 2%'
                }}
            />
            <div>Cut finalized?: {cutFinalized ? 'yes' : 'no'}</div>
            <button
                onClick={() => { setCutFinalized(!cutFinalized) }}
            >
                {!cutFinalized ?
                    "Finalize Cut?"
                    :
                    "Reset?"
                }
            </button>
            {/* woudl be neat to show calculated sides on number input */}
        </div>
    )
}

export default NewCutting
