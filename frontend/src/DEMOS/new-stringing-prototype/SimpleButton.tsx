import React from 'react'
import styles from './style-modules/simpleButtons.module.css'

const SimpleButton = ({ btnName, btnStyle, onClick }: any) => {
    const getButtonStyle = (style: any) => {
        if (style === 'refresh') return styles.refresh
        if (style === 'move') return styles.move
        else {
            console.log('invalid style for button');
            return styles.unStyled
        }
    }
    return (
        <div>
            {btnName != '' ?
                <button className={getButtonStyle(btnStyle)}>{btnName}</button>
                :
                <button>name missing</button>
            }
        </div>
    )
}

export default SimpleButton
