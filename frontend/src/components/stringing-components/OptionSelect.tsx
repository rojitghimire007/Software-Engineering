import React, { useEffect, useState } from 'react'
import ButtonHolder from './ButtonHolder'
import StringingTrack from './StringingTrack';
import { Droppable } from 'react-beautiful-dnd';

const OptionSelect = ({props}: any) => {
    const names = ["delete", "transfer", "add"];
    const [opened, setOpened] = useState('');
    const [click, setClick] = useState(false);
    const [trackHistory, setTrackHistory] = useState([opened]);

    useEffect(() => {
        trackHistory.push(opened);

        if (trackHistory.length > 10)
            trackHistory.shift();
    }, [opened])

    // useEffect(() => { console.log(click + " " + opened) }, [click === true])
    // console.log("initial Render: ("+click+", "+opened+")")
    return (
        <>
            <div
                style={{
                    /* display: 'flex', */
                    maxWidth: '100vw',
                    // minHeight: '10%',
                    /* border: '3px solid', */
                }}
            >
                <ButtonHolder
                    names={names}
                    style={{ position: 'relative', top: '-10px', left: '0', zIndex: 2, height: '80%', overflow: 'hidden',}}
                    opened={opened}
                    click={click}
                    setClick={setClick}
                    setOpened={setOpened}
                />
                <div style={{ position: 'relative', top: '-50px', left: '50px', zIndex: 1 }}>
                    <StringingTrack
                        name={opened}
                        opened={opened}
                        click={click}
                        trackHistory={trackHistory}
                        props={props}
                    />
                </div>
            </div>
            {/* </div> */}
            {/* <div style={{ position: 'absolute', top: '70vh', left: '40vw', padding: '0 50px', border: '3px solid blue' }}>
                <h1 style={{ textDecoration: 'underline' }}>
                    States
                </h1>
                <h3>open:
                    {opened === '' ?
                        ' ___'
                        :
                        opened
                    }
                </h3>
                <h3>click:
                    {click ?
                        ' true'
                        :
                        ' false'
                    }
                </h3>
                <h3>history:
                    {trackHistory[trackHistory.length - 1] === '' ?
                        ' ___'
                        :
                        trackHistory[trackHistory.length - 1]
                    }
                </h3>
            </div> */}
        </>
    )
}

export default OptionSelect
