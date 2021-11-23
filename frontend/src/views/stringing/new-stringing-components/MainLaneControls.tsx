import React, { useState } from 'react';
import SimpleButton from './SimpleButton';

const MainLaneControls = ({ styles, goToStation, findItem, controls }: any) => {
  const [stationField, setStationField] = useState<any>('');
  const [jointField, setJointField] = useState('');

  const handleSearch = (e: any) => {
    // let val = e.target.value;
    e.preventDefault();
    if (stationField) {
      if (!isNaN(parseFloat(stationField)) && isFinite(stationField))
        goToStation(parseInt(stationField));
      else
        alert(
          'Invalid Station number! Please enter a valid station number for search.'
        );
      setStationField('');
    } else {
      findItem(jointField);
      setJointField('');
    }
  };

  return (
    <div className={styles.mainControllerContainer}>
      <div></div>
      <div className={styles.mainController}>
        <div className={styles.mainControllerColumn}>
          <SimpleButton
            btnName="Move Left"
            btnStyle="move"
            buttonProps={controls[0].moveLeft}
          />
        </div>
        <div className={styles.mainControllerColumn}>
          <div style={{ alignSelf: 'flex-end', flex: '.5 .5 50%'  }}>
            Station No.
            <input
              type="search"
              placeholder="enter station"
              id="station-search"
              name="station-search"
              aria-label="Search for station number"
              value={stationField}
              onChange={(e) => {
                setStationField(e.target.value);
                setJointField('');
              }}
            />
          </div>
          <div style={{ alignSelf: 'flex-end', flex: '.5 .5 50%' }}>
            Joint No.
            <input
              type="search"
              placeholder="enter station"
              id="station-search"
              name="station-search"
              aria-label="Search for station number"
              value={jointField}
              onChange={(e) => {
                setJointField(e.target.value);
                setStationField('');
              }}
            />
          </div>
          <SimpleButton
            btnName="Search"
            btnStyle="refresh"
            buttonProps={{
              btnName: 'Search',
              btnStyle: 'refresh',
              disabled: false,
              onClick: handleSearch,
            }}
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
  );
};

export default MainLaneControls;
