import React, { useEffect } from 'react'

const StationContainer = ({ styles, stations }: any) => {
    useEffect(() => { }, [stations])
    return (
        <div className={styles.stationsContainer}>
            <div className={styles.station}>
                Starting Station No.
                <div className={styles.stationName}>
                    {stations[0]}
                </div>
            </div>
            <div className={styles.middleStationsContainer}>
                <div className={styles.station}>
                    Station No.
                    <div className={styles.stationName}>
                        {stations[1]}
                    </div>
                </div>
                <div className={`${styles.station} ${styles.midItem2}`}>
                    Station No.
                    <div className={styles.stationName}>
                        {stations[2]}
                    </div>
                </div>
                <div className={`${styles.station} ${styles.midItem3}`}>
                    Station No.
                    <div className={styles.stationName}>
                        {stations[3]}
                    </div>
                </div>
            </div>
            <div className={styles.lastStation}>
                Ending Station No.
                <div className={styles.stationName}>
                    {stations[4] ? stations[4] : stations[3] + 50}
                </div>
            </div>
        </div>
    )
}

export default StationContainer
