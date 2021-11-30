import React, { useState, ChangeEvent } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { PipeGangeParam } from './pipeGange';
import './firingLine.css';

export interface FiringLineReading {
  currentRange: string[];
  voltageRange: string[];
  numOfRod: string[];
}

interface FakeTableDataType {
  fakeWelderLocations: string[];
  fakeTimeOfDays: string[];
  fakePasses: string[];
  fakeFillPasses: string[];
}

const fakeTableData: FakeTableDataType = {
  fakeWelderLocations: [],
  fakeTimeOfDays: [],
  fakePasses: [],
  fakeFillPasses: [],
};

export interface FiringLineParam {
  readings: FiringLineReading;
  numPasses: string;
  numCaps: string;
  stationNumStart: string;
  stationNumEnd: string;
  startTime: string;
  startWork: string;
  endWork: string;
  avgPipeLen: string;
  actualWeld: string;
}

interface LocationStateType {
  pipeGangeParam: PipeGangeParam;
  numPassCaps: { numPasses: string; numCaps: string };
}

const FiringLine = (props: any) => {
  const location = useLocation();
  const { pipeGangeParam, numPassCaps } = location.state as LocationStateType;
  // console.log(numPassCaps)
  const tableRows =
    parseInt(numPassCaps.numCaps) + parseInt(numPassCaps.numPasses);
  const initialEmptyArray = Array(tableRows);
  const initialFiringLine: FiringLineReading = {
    currentRange: initialEmptyArray,
    voltageRange: initialEmptyArray,
    numOfRod: initialEmptyArray,
  };
  const [firingLine, setFiringLine] = useState(initialFiringLine);
  const [firingLineInput, setFiringLineInput] = useState({
    stationNumStart: '',
    stationNumEnd: '',
    startTime: '',
    startWork: '',
    endWork: '',
    avgPipeLen: '',
    actualWeld: '',
  });

  const welderLocations = ['Ditch', 'Work'];
  const timeOfDays = [
    '8:45 AM',
    '10:15 AM',
    '1:30 PM',
    '1:40 PM',
    '2:40 PM',
    '3:40 PM',
  ];
  const passes = ['Pass', 'Cap'];
  const fillPasses = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

  const randomIntFromInterval = (min: number, max: number) => {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  // generate some fake data to fill up the table, if not already generated
  // if (fakeTableData.fakeTimeOfDays.length === 0) {
  //   fakeTableData.fakeTimeOfDays = Array.from({length: tableRows}).map(_ => timeOfDays[randomIntFromInterval(0, timeOfDays.length-1)]);
  //   fakeTableData.fakePasses = Array.from({length: tableRows}).map(_ => passes[randomIntFromInterval(0, passes.length-1)]);
  //   fakeTableData.fakeWelderLocations = Array.from({length: tableRows}).map(_ => welderLocations[randomIntFromInterval(0, welderLocations.length-1)]);
  //   fakeTableData.fakeFillPasses = Array.from({length: tableRows}).map(_ => fillPasses[randomIntFromInterval(0, fillPasses.length-1)]);
  // }

  const onInputChange = (e: any) => {
    let newInputs = { ...firingLineInput, [e.target.name]: e.target.value };
    setFiringLineInput(newInputs);
  };

  const onTableInputChange =
    (idx: number) => (e: ChangeEvent<HTMLInputElement>) => {
      let newList =
        firingLine[e.target.name as keyof FiringLineReading].slice(0);
      newList[idx] = e.target.value;
      let newFiringLine = { ...firingLine, [e.target.name]: newList };
      setFiringLine(newFiringLine);
    };

  return (
    <div className="firing-line-container">
      <div style={{ textAlign: 'center' }}>
        <h3>Firing Line</h3>
      </div>
      <br />
      <div className="top-section">
        <div
          className="first"
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <div className="label-input">
            <label>Start Time/Date</label>
            <input
              type="text"
              name="startTime"
              value={firingLineInput.startTime}
              onChange={onInputChange}
            />
          </div>
          <div className="label-input">
            <label>Start Work</label>
            <input
              type="text"
              name="startWork"
              value={firingLineInput.startWork}
              onChange={onInputChange}
            />
          </div>
          <div className="label-input">
            <label>End of Work</label>
            <input
              type="text"
              name="endWork"
              value={firingLineInput.endWork}
              onChange={onInputChange}
            />
          </div>
        </div>
        <div className="second">
          <div className="left">
            <div className="label-input">
              <label>Station Number Start</label>
              <input
                type="text"
                name="stationNumStart"
                value={firingLineInput.stationNumStart}
                onChange={onInputChange}
              />
            </div>
            <div className="label-input">
              <label>Station Number End</label>
              <input
                type="text"
                name="stationNumEnd"
                value={firingLineInput.stationNumEnd}
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
                value={firingLineInput.avgPipeLen}
                onChange={onInputChange}
              />
            </div>
            <div className="label-input">
              <label>Actual Weld's</label>
              <input
                type="text"
                name="actualWeld"
                value={firingLineInput.actualWeld}
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
              <th>Welders Location</th>
              <th>Time of Day</th>
              <th>Pass/Cap</th>
              <th>Fill Pass</th>
              <th>Current Range (Amp) Used</th>
              <th>Voltage Range (Volts) Used</th>
              <th>Number of Rods Per Area</th>
              <th>Welder Initials</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: tableRows }).map((value, idx) => {
              return (
                <tr key={idx}>
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
                  <td>
                    <input
                      type="text"
                      defaultValue={fakeTableData.fakeTimeOfDays[idx]}
                    />
                  </td>
                  <td>
                    <select defaultValue={fakeTableData.fakePasses[idx]}>
                      {passes.map((pass, idx) => (
                        <option key={idx} value={pass}>
                          {pass}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <select defaultValue={fakeTableData.fakeFillPasses[idx]}>
                      {fillPasses.map((value, idx) => (
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
                      value={firingLine.currentRange[idx] || ''}
                      onChange={onTableInputChange(idx)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="voltageRange"
                      value={firingLine.voltageRange[idx] || ''}
                      onChange={onTableInputChange(idx)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="numOfRod"
                      value={firingLine.numOfRod[idx] || ''}
                      onChange={onTableInputChange(idx)}
                    />
                  </td>
                  <td>-</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <table>
            <thead>
              <tr>
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
              </tr>
              <tr>
                <td>Set-up</td>
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
              </tr>
            </tbody>
          </table>
        </div>

        <div>
          <table>
            <thead>
              <tr>
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
              </tr>
              <tr>
                <td>Set-up</td>
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
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <br />
      <Link
        to={{
          pathname: '/welding/single-vbutt-weld',
          state: {
            pipeGangeParam: pipeGangeParam,
            firingLineParam: {
              readings: firingLine,
              ...numPassCaps,
              ...firingLineInput,
            },
          },
        }}
      >
        <button style={{ width: '75px', padding: '5px' }}>Next</button>
      </Link>
    </div>
  );
};

export default FiringLine;
