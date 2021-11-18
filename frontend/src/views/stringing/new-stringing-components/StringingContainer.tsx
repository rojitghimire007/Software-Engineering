import React from 'react'
import styles from './style-modules/newStringing.module.css'
import MainLaneContainer from './MainLaneContainer'

const StringingContainer = ({ onDragEnd }: any) => {
    return (
        <main className={styles.main}>
            <h1 className={styles.title}>Stringing</h1>
            <div className={styles.sectionA}>
                <MainLaneContainer
                    styles={styles}
                    onDragEnd={onDragEnd}
                />
            </div>
            <div className={styles.sectionB}>Section B</div>
        </main>
    )
}

export default StringingContainer