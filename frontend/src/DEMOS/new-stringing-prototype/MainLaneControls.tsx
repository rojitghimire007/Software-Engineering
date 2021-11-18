import React from 'react'
import SimpleButton from './SimpleButton'

const MainLaneControls = ({ styles, onSearchChange }: any) => {
    return (
        <div className={styles.mainControllerContainer}>
            <div>North</div>
            <div className={styles.mainController}>
                <div className={styles.mainControllerColumn}>
                    <SimpleButton btnName="Move Left" btnStyle="move" />
                </div>
                <div className={styles.mainControllerColumn}>
                    <SimpleButton btnName="Refresh" btnStyle="refresh" />
                    <div style={{ alignSelf: 'flex-end' }}>
                        Station No.
                        <input
                            type="search"
                            placeholder="enter station"
                            id="station-search"
                            name="station-search"
                            aria-label="Search for station number"
                        />
                    </div>
                    <div style={{ alignSelf: 'flex-end' }}>
                        Joint No.
                        <input
                            type="search"
                            placeholder="enter joint"
                            id="joint-search"
                            name="joint-search"
                            aria-label="Search for joint number"
                        />
                    </div>
                </div>
                <div className={styles.mainControllerColumn}>
                    <SimpleButton btnName="Move Right" btnStyle="move" />
                </div>
            </div>
            <div />
        </div>
    )
}

export default MainLaneControls
