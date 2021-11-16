import React from 'react'
import AButton from './AButton'

const ButtonHolder = ({ names, setClick, opened, setOpened, click, buttonState, setButtonState }: any) => {
    return (
        <div style={{
            position: 'relative',
            top: '-50px',
            transformOrigin: 'bottom left',
            transform: 'rotate(90deg)',
            display: 'grid',
            gridTemplateColumns: '180px 180px 180px',
            gridTemplateRows: '50px',
            columnGap: '0',
            backgroundSize: '50px 100px',
            background: 'rgba(50,50,50,.5)',
            width: 'fit-Content',
            height: 'fit-content',
            overflow: 'hidden',
        }}>
            <AButton
                color="rgba(0,0,255,1)"
                textColor={"white"}
                name={names[2]}
                setClick={setClick}
                setOpened={setOpened}
                opened={opened}
                click={click}
            />
            <AButton
                color="rgba(0,255,100,1)"
                textColor={"black"}
                name={names[1]}
                setClick={setClick}
                setOpened={setOpened}
                opened={opened}
                click={click}
            />
            <AButton
                color="rgba(255,0,0,1)"
                textColor={"white"}
                name={names[0]}
                setClick={setClick}
                setOpened={setOpened}
                opened={opened}
                click={click}
            />
        </div>
    )
}

export default ButtonHolder;