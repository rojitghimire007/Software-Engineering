import React, { useState } from 'react'
import SimpleButton from './SimpleButton'

const MainLaneControls = ({ styles, onSearchChange, controls, }: any) => {
    const [stationField, setStationField] = useState('')
    return (
        <div className={styles.mainControllerContainer}>
            <div>North</div>
            <div className={styles.mainController}>
                <div className={styles.mainControllerColumn}>
                    <SimpleButton
                        btnName="Move Left"
                        btnStyle="move"
                        buttonProps={controls[0].moveLeft}
                    />
                </div>
                <div className={styles.mainControllerColumn}>
                    <div style={{ alignSelf: 'flex-end' }}>
                        Station No.
                        <input
                            type="search"
                            placeholder="enter station"
                            id="station-search"
                            name="station-search"
                            aria-label="Search for station number"
                            onChange={controls[0].stationInput.onChange}
                        />
                    </div>
                    {/* <div style={{ alignSelf: 'flex-end' }}>
                        Joint No.
                        <input
                            type="search"
                            placeholder="enter joint"
                            id="joint-search"
                            name="joint-search"
                            aria-label="Search for joint number"
                        />
                    </div> */}
                    <SimpleButton
                        btnName="Search"
                        btnStyle="refresh"
                        buttonProps={controls[0].search}
                    />
                </div>
                <div className={styles.mainControllerColumn}>
                    <SimpleButton
                        btnName="Move Right"
                        btnStyle="move"
                        buttonProps={controls[0].moveRight}
                    />
                </div>
            </div>
            <div />
        </div>
    )
}

export default MainLaneControls
