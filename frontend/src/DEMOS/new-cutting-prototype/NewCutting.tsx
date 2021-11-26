import React, { useState, useEffect } from 'react'
import styles from './newCuttingStyles.module.css'
import { Button, Select, FormControl, InputLabel, MenuItem } from '@mui/material';
const NewCutting = ({ id, length }: any) => {
    const fineTuning = [0.100, 0.010, 0.001]
    const [cutLengthPercent, setCutLengthPercent] = useState(50);
    const [leftLength, setLeftLength] = useState(length)
    const [rightLength, setRightLength] = useState(0)
    const [cutFinalized, setCutFinalized] = useState(false)
    const [finalLengths, setFinalLengths] = useState([length, 0])
    const [sliderPosition, setSliderPosition] = useState(50)
    const [fineTuneAmount, setFineTuneAmount] = useState(.001)

    useEffect(() => {
        setFinalLengths([leftLength, rightLength])
    }, [cutFinalized === true])

    useEffect(() => {
        setRightLength(length - (.01 * cutLengthPercent * length))
    }, [cutLengthPercent, sliderPosition])

    useEffect(() => {
        setLeftLength(length - rightLength)
    }, [rightLength])

    useEffect(() => {

    }, [sliderPosition])

    return (
        <div className={styles.cuttingContainer}>
            <div style={{ textAlign: 'center', marginBottom: '1%' }}>
                Pipe Name: {id} <div />
                Starting Pipe Length: {length} feet
            </div>
            <div className={styles.pipeContainer}>
                {cutFinalized ?
                    <div
                    >
                        cut Pipe!
                        <div
                            style={{
                                width: `${leftLength}px`,
                                border: '1px dashed white',
                                height: '100px'
                            }}
                        >
                            <div>id 1 {finalLengths[0]}</div>

                        </div>
                        <div
                            style={{
                                width: `${rightLength}px`,
                                border: '1px dashed white',
                                marginLeft: '20px',
                                height: '100px'
                            }}
                        >
                            <div>id 2 {finalLengths[1]}</div>

                        </div>
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
                Left Length: {leftLength.toPrecision(5)} feet
            </div>
            <div>
                Right Length: {rightLength.toPrecision(5)} feet
            </div>
            <div>
                Slider Position: {sliderPosition}
            </div>
            <div>
                {/* {cutLengthPercent} */}
            </div>
            <input
                type="range"
                min={0.500}
                value={sliderPosition}
                max={99.500}
                onChange={(e: any) => setSliderPosition(e.target.value)}
                onInput={(e: any) => setCutLengthPercent(e.target.value)}
                step={.001}
                style={{
                    margin: '2%% 1% 0 1%'
                }}
                list='subdivisions'
            />
            {/* <datalist id='subdivisions'>
                <option value="0"/>
                <option value="25"/>
                <option value="50"/>
                <option value="75"/>
                <option value="100"/>
            </datalist> */}
            <div
                style={{
                    display: 'grid',
                    minWidth: '100%',
                    gridTemplateColumns: '5fr 1fr 3fr 1fr 5fr',
                    gridTemplateRows: '1fr',
                    justifyContent: 'space-between'
                }}
            >
                <div />
                <Button
                    variant='contained'
                    onClick={() => { setSliderPosition(sliderPosition - fineTuneAmount); }}
                >
                    &lt;
                </Button>
                <FormControl>
                    <InputLabel id="fine-tuning-label">Fine Tune Amount</InputLabel>
                    <Select
                        labelId="fine-tuning-label"
                        id="fine-tuning"
                        value={fineTuneAmount}
                        label="Fine Tune Amount"
                        onChange={
                            (e: any) => {
                                setFineTuneAmount(e.target.value);
                            }
                        }
                    >
                        {fineTuning.map((amount: number, index: number) => {
                            return (
                                <MenuItem value={fineTuning[index]}>
                                    <em>{amount} {index == 2 ? <>(Default)</> : null}</em>
                                </MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
                <Button
                    variant='contained'
                    onClick={() => { setSliderPosition(sliderPosition + fineTuneAmount);}}
                >
                    &gt;
                </Button>
                <div />
            </div>
            {/* <input
                type="number"
                min={1}
                value={sliderPosition}
                max={length - 1}
                onChange={(e: any) => setSliderPosition(e.target.value)}
                onInput={(e: any) => setCutLengthPercent(e.target.value / 2)}
                step={.001}
                style={{
                    margin: '1% 2% 1% 2%'
                }}
            /> */}
            {/* <div>Cut finalized?: {cutFinalized ? 'yes' : 'no'}</div> */}
            <Button
                variant='contained'
                color='success'
                style={{ margin: '1% auto' }}
                onClick={() => { setCutFinalized(!cutFinalized) }}
            >
                {!cutFinalized ?
                    "Finalize Cut?"
                    :
                    "Reset?"
                }
            </Button>
            {/* woudl be neat to show calculated sides on number input */}
        </div>
    )
}

export default NewCutting
