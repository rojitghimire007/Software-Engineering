import React from 'react'
import styles from './style-modules/simpleButtons.module.css'

const SimpleButton = ({ btnName, btnStyle, buttonProps }: any) => {
    const buttonInformation = { ...buttonProps };
    const getButtonStyle = (style: any) => {
        if (style === 'refresh') return styles.refresh
        if (style === 'move') return styles.move
        if (style === 'add') return styles.add
        if (style === 'delete') return styles.delete
        else {
            console.log('invalid style for button');
            return styles.unStyled
        }
    }
    return (
        <div>
            {btnName != '' ?
                <button
                    className={getButtonStyle(btnStyle)}
                    disabled={buttonInformation.disabled}
                    onClick={buttonInformation.onClick}
                >
                    {!buttonInformation.disabled ?
                        <>{btnName}</>
                        :
                        <>DISABLED</>
                    }
                </button>
                :
                <button>name missing</button>
            }
        </div>
    )
}

export default SimpleButton
