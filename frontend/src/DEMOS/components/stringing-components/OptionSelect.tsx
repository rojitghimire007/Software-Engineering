import React, { useEffect, useState } from 'react'
import ButtonHolder from './ButtonHolder'
import StringingTrack from './StringingTrack';

const OptionSelect = () => {
    const names = ["delete", "transfer", "add"];
    const [opened, setOpened] = useState('');
    const [click, setClick] = useState(false);
    const [trackAnimationState, setTrackAnimationState] = useState("slideIn")

    // useEffect(() => { console.log(click + " " + opened) }, [click === true])
    // console.log("initial Render: ("+click+", "+opened+")")
    return (
        // <div style={{ display: 'grid', gridTemplateColumns: '100px 100fr', gridTemplateRows: '100%',  minHeight: '100%', border: '3px solid', }}>
        <div style={{ /* display: 'flex', */ maxWidth: '100%', maxHeight: '100%', /* border: '3px solid', */ }}>
            <ButtonHolder
                names={names}
                style={{ position: 'relative', top: '-10px', left: '0', }}
                opened={opened}
                click={click}
                setClick={setClick}
                setOpened={setOpened}
            />
            <div style={{ position: 'relative', top: '-50px', left: '50px', zIndex: -1 }}>
                <StringingTrack
                    name={opened}
                    opened={opened}
                    click={click}
                    setTrackAnimationState={setTrackAnimationState}
                />
            </div>
        </div>
    )
}

export default OptionSelect
