import React, { useState, ChangeEvent } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './pipeGange.css';

export interface PipeGangeNumber {
  rootPass: string;
  grindingHelpers: string;
  hotPass: string;
  buffingHelpers: string;
  secondPass: string;
}

export interface PipeGangeReading {
  currentRange: string[];
  voltageRange: string[];
  numOfRod: string[];
  weldingArea: string[];
}

export interface PipeGangeParam {
  readings: PipeGangeReading;
  rootPass: string;
  grindingHelpers: string;
  hotPass: string;
  buffingHelpers: string;
  secondPass: string;
  stationNumStart: string;
  stationNumEnd: string;
  startTime: string;
  startWork: string;
  endWork: string;
  avgPipeLen: string;
  actualWeld: string;
}

interface FakeTableDataType {
  fakeTimeOfDays: string[];
  fakePass: string[];
  fakeWelderLocations: string[];
  fakeRodPerArea: string[];
}

const fakeTableData: FakeTableDataType = {
  fakeTimeOfDays: [],
  fakePass: [],
  fakeWelderLocations: [],
  fakeRodPerArea: [],
};

interface LocationStateType {
  pipeGangeNumber: PipeGangeNumber;
  numPassCaps: { numPasses: string; numCaps: string };
}

const PipeGange = () => {
  const location = useLocation();
  const { pipeGangeNumber, numPassCaps } = location.state as LocationStateType;
  const {
    rootPass,
    grindingHelpers,
    hotPass,
    buffingHelpers,
    secondPass,
  }: PipeGangeNumber = pipeGangeNumber;
  const tableRows =
    parseInt(rootPass) + parseInt(grindingHelpers) + parseInt(hotPass);
  const initialEmptyArray = Array(tableRows);
  const initialReading: PipeGangeReading = {
    currentRange: initialEmptyArray,
    voltageRange: initialEmptyArray,
    numOfRod: initialEmptyArray,
    weldingArea: initialEmptyArray,
  };

  const [pipeGange, setPipeGange] = useState(initialReading);
  const [pipeGangeInput, setPipeGangeInput] = useState({
    stationNumStart: '',
    stationNumEnd: '',
    startTime: '',
    startWork: '',
    endWork: '',
    avgPipeLen: '',
    actualWeld: '',
  });

  const timeOfDays = [
    '8:45 AM',
    '10:15 AM',
    '1:30 PM',
    '1:40 PM',
    '2:40 PM',
    '3:40 PM',
  ];
  const passes = ['Root Pass', '1st Hot Pass', '2nd Host Pass'];
  const welderLocations = [
    'Top Work',
    'Bottom Work',
    'Top Ditch',
    'Bottom Ditch',
    'Top',
    'Work',
    'Ditch',
  ];
  const rodPerArea = ['5/32', '3/16'];

  const randomIntFromInterval = (min: number, max: number) => {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  // generate some fake data to fill up the table, if not already generated
  if (fakeTableData.fakeTimeOfDays.length === 0) {
    fakeTableData.fakeTimeOfDays = Array.from({ length: tableRows }).map(
      (_) => timeOfDays[randomIntFromInterval(0, timeOfDays.length - 1)]
    );
    fakeTableData.fakePass = Array.from({ length: tableRows }).map(
      (_) => passes[randomIntFromInterval(0, passes.length - 1)]
    );
    fakeTableData.fakeWelderLocations = Array.from({ length: tableRows }).map(
      (_) =>
        welderLocations[randomIntFromInterval(0, welderLocations.length - 1)]
    );
    fakeTableData.fakeRodPerArea = Array.from({ length: tableRows }).map(
      (_) => rodPerArea[randomIntFromInterval(0, rodPerArea.length - 1)]
    );
  }

  const onTableInputChange =
    (idx: number) => (e: ChangeEvent<HTMLInputElement>) => {
      let newList = pipeGange[e.target.name as keyof PipeGangeReading].slice(0);
      newList[idx] = e.target.value;
      let newPipeGange = { ...pipeGange, [e.target.name]: newList };
      setPipeGange(newPipeGange);
    };

  const onInputChange = (e: any) => {
    let newInputs = { ...pipeGangeInput, [e.target.name]: e.target.value };
    setPipeGangeInput(newInputs);
  };

  return (
    <div className="pipe-gange-container">
      <div style={{ textAlign: 'center' }}>
        <h3>Pipe Gange</h3>
      </div>
      <br />
      <div className="top-section">
        <div
          className="first"
          style={{ display: 'flex', justifyContent: 'space-around' }}
        >
          <div className="label-input">
            <label>Start Time/Date</label>
            <input
              type="text"
              name="startTime"
              value={pipeGangeInput.startTime}
              onChange={onInputChange}
            />
          </div>
          <div className="label-input">
            <label>Start Work</label>
            <input
              type="text"
              name="startWork"
              value={pipeGangeInput.startWork}
              onChange={onInputChange}
            />
          </div>
          <div className="label-input">
            <label>End of Work</label>
            <input
              type="text"
              name="endWork"
              value={pipeGangeInput.endWork}
              onChange={onInputChange}
            />
          </div>
        </div>
        <div
          className="second"
          style={{ display: 'flex', justifyContent: 'space-around' }}
        >
          <div className="left">
            <div className="label-input">
              <label>Station Number Start</label>
              <input
                type="text"
                name="stationNumStart"
                value={pipeGangeInput.stationNumStart}
                onChange={onInputChange}
              />
            </div>
            <div className="label-input">
              <label>Station Number End</label>
              <input
                type="text"
                name="stationNumEnd"
                value={pipeGangeInput.stationNumEnd}
                onChange={onInputChange}
              />
            </div>
          </div>
          <div className="right">
            <div className="label-input">
              <label>Average Pipe Length</label>
              <input
                type="text"
                name="avgPipeLen"
                value={pipeGangeInput.avgPipeLen}
                onChange={onInputChange}
              />
            </div>
            <div className="label-input">
              <label>Actual Weld's</label>
              <input
                type="text"
                name="actualWeld"
                value={pipeGangeInput.actualWeld}
                onChange={onInputChange}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="top-table">
        <table>
          <thead>
            <tr>
              <th>Pass</th>
              <th>Time of Day</th>
              <th>Number Of Rod Per Area</th>
              <th>Current Range (Amp) Used</th>
              <th>Voltage Range (Volts) Used</th>
              <th>Number Of Rod Per Area</th>
              <th>Welders Welding Area (in.)</th>
              <th>Welders Location</th>
              <th>Welder Initials</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: tableRows }).map((value, idx) => {
              return (
                <tr key={idx}>
                  <td>
                    <select defaultValue={fakeTableData.fakePass[idx]}>
                      {passes.map((pass, idx) => (
                        <option key={idx} value={pass}>
                          {pass}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input
                      type="text"
                      defaultValue={fakeTableData.fakeTimeOfDays[idx]}
                    />
                  </td>
                  <td>
                    <select defaultValue={fakeTableData.fakeRodPerArea[idx]}>
                      {rodPerArea.map((value, idx) => (
                        <option key={idx} value={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="currentRange"
                      value={pipeGange.currentRange[idx] || ''}
                      onChange={onTableInputChange(idx)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="voltageRange"
                      value={pipeGange.voltageRange[idx] || ''}
                      onChange={onTableInputChange(idx)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="numOfRod"
                      value={pipeGange.numOfRod[idx] || ''}
                      onChange={onTableInputChange(idx)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="weldingArea"
                      value={pipeGange.weldingArea[idx] || ''}
                      onChange={onTableInputChange(idx)}
                    />
                  </td>
                  <td>
                    <select
                      defaultValue={fakeTableData.fakeWelderLocations[idx]}
                    >
                      {welderLocations.map((value, idx) => (
                        <option key={idx} value={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>-</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <table>
        <thead>
          <tr>
            <th></th>
            <th>Time of Day</th>
            <th>Time (sec)</th>
            <th></th>
            <th>Time of Day</th>
            <th>Time (sec)</th>
            <th></th>
            <th>Time of Day</th>
            <th>Time (sec)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Set-up</td>
            <td>
              <input></input>
            </td>
            <td>
              <input></input>
            </td>
            <td>
              <input></input>
            </td>
            <td>
              <input></input>
            </td>
            <td>
              <input></input>
            </td>
            <td>
              <input></input>
            </td>
            <td>
              <input></input>
            </td>
            <td>
              <input></input>
            </td>
          </tr>
          <tr>
            <td>Set-up</td>
            <td>
              <input></input>
            </td>
            <td>
              <input></input>
            </td>
            <td>
              <input></input>
            </td>
            <td>
              <input></input>
            </td>
            <td>
              <input></input>
            </td>
            <td>
              <input></input>
            </td>
            <td>
              <input></input>
            </td>
            <td>
              <input></input>
            </td>
          </tr>
          <tr>
            <td>Set-up</td>
            <td>
              <input></input>
            </td>
            <td>
              <input></input>
            </td>
            <td>
              <input></input>
            </td>
            <td>
              <input></input>
            </td>
            <td>
              <input></input>
            </td>
            <td>
              <input></input>
            </td>
            <td>
              <input></input>
            </td>
            <td>
              <input></input>
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      <Link
        to={{
          pathname: '/welding/firing-line',
          state: {
            pipeGangeParam: {
              readings: pipeGange,
              ...pipeGangeNumber,
              ...pipeGangeInput,
            },
            numPassCaps: numPassCaps,
          },
        }}
      >
        <button style={{ width: '75px', padding: '5px' }}>Next</button>
      </Link>
    </div>
  );
};

export default PipeGange;
