import React, { useEffect, useState } from 'react'
import { Slider, Input } from '@mui/material'

function PipeCutter() {

    const [value, setValue] = useState<number | number[]>(50);
    const [cutted, setCutted] = useState(false);
    const [cutAt, setCutAt] = useState<number | number[]>(50);
    const [moving, setMoving] = useState('off');

    useEffect(() => {
        setMoving('on')
    }, [value])

    useEffect(() => {
        if(cutted){
            setCutAt(value);
            console.log('cut pipe at '+value)
        }
    }, [cutted])

    // const resetCut = () => {
    //     var x = 0;

    //     if (x == 0){
    //         setCutted(false);
    //         console.log('cut triggered');
    //         x = x+1;
    //     }
    //     if (x == 1){
    //         setCutted(true);
    //     }
    // }

    return (
        <div>
            <h1>PipeCutter</h1>
            <div style={{border: '5px solid red',maxWidth: '100%'}}>
                <div style={{
                        backgroundColor: 'blue',
                        height: '60px',
                        width: `${!cutted? 100 : value}%`,
                        display: 'inline-block',
                        // position: 'absolute',
                    }} 
                >
                    {!cutted?
                        <div style={{
                                marginLeft: `${value}%`, 
                                color: 'lightGreen',
                                fontSize: '60px', 
                                zIndex: 99,
                                position: 'relative'
                            }}
                        >
                            |
                        </div>
                    : null }
                </div>
                <div style={{margin: '40px 0'}} />
                <div/>
                <div/>
                {!cutted ?
                    <>
                    <Slider
                        value={typeof value === 'number' ? value : 0}
                        onChange={(e: Event, newValue: number | number[]) => {setValue(newValue)}}
                        marks={[{value: 1, label: '1'},
                                {value: 25, label: '25'},
                                {value: 50, label: '50'},
                                {value: 75, label: '75'},
                                {value: 99, label: '99'}]
                        }
                        valueLabelDisplay="auto"
                    />
                    <Input
                        value={value}
                        // onChange={(e: Event, newValue: number | number[]) => {setValue(newValue)}}
                        inputProps={{min: 0, max: 100, type: 'number'}}
                    />
                    </>
                : null}
                <div>Cut at length {value}%? (will be length units once database is set)</div>
                <button
                    // onClick={() => !cutted? setCutted(!cutted) : resetCut()}
                    onClick={() => {setCutted(!cutted)}}
                >
                    CUT ME
                </button>
                {cutted? <div>Cut pipe at {cutAt}% (will be length units once database is set)</div> : null}
            </div>
        </div>
    )
}

export default PipeCutter
