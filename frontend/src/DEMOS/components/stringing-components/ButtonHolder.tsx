import React from 'react'
import AButton from './AButton'

const ButtonHolder = ({ names, setClick, opened, setOpened, click }: any) => {
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
        }}>
            <AButton
                color="rgba(0,0,255,1)"
                name={names[2]}
                setClick={setClick}
                setOpened={setOpened}
                opened={opened}
                click={click}
            />
            <AButton
                color="rgba(0,255,0,1)"
                name={names[1]}
                setClick={setClick}
                setOpened={setOpened}
                opened={opened}
                click={click}
            />
            <AButton
                color="rgba(255,0,0,1)"
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