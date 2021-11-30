import React, { useState, ChangeEvent } from 'react';
import { useLocation } from 'react-router-dom';
import { PipeGangeParam, PipeGangeReading } from './pipeGange';
import { FiringLineParam } from './firingLine';
import SingleVbuttPG from './singleVbuttPG';
import SingleVbuttFL from './singleVbuttFL';

import './singleVbutt.css';

interface LocationStateType {
  pipeGangeParam: PipeGangeParam;
  firingLineParam: FiringLineParam;
}

interface PipeGangeInputType {
  currentRange: number[];
  voltageRange: number[];
  numOfRod: number[];
  weldingArea: number[];
}

const SingleVbutt = () => {
  const location = useLocation();
  const locationState = location.state as LocationStateType;
  const pipeGangeParam: any = locationState.pipeGangeParam;
  const firingLineParam: any = locationState.firingLineParam;

  const hoursWorked = 10;
  const firingLineMph =
    ((hoursWorked / 12) * 60) /
    (firingLineParam.stationNumEnd - firingLineParam.stationNumStart);
  return (
    <div style={{ backgroundColor: '#89CFF0', minHeight: '100vh' }}>
      <SingleVbuttPG
        pipeGangeParam={pipeGangeParam}
        firingLineMph={firingLineMph}
      />
      <br />
      <SingleVbuttFL
        firingLineParam={firingLineParam}
        firingLineMph={firingLineMph}
      />
    </div>
  );
};
export default SingleVbutt;
