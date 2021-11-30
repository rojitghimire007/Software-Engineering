import React, { useState, ChangeEvent } from 'react';
import { useLocation } from 'react-router-dom';
import { PipeGangeParam, PipeGangeReading } from './pipeGange';
import { FiringLineParam } from './firingLine';
import './singleVbutt.css';

interface FiringLineInputType {
  currentRange: string[];
  voltageRange: string[];
  numOfRod: string[];
}

const SingleVbuttFL = (props: any) => {
  // const location = useLocation();
  // const { pipeGangeParam, firingLine } = (location.state as LocationStateType);
  const firingLineParam = props.firingLineParam;
  let [numPasses, numCaps] = [
    parseInt(firingLineParam.numPasses),
    parseInt(firingLineParam.numCaps),
  ];

  const { currentRange, voltageRange, numOfRod }: PipeGangeReading =
    firingLineParam.readings;

  const initialFiringLineInput: FiringLineInputType = {
    currentRange: currentRange, //.map(x => parseFloat(x)),
    voltageRange: voltageRange, //.map(x => parseFloat(x)),
    numOfRod: numOfRod, //.map(x => parseFloat(x)),
  };

  const [firingLineInput, setFiringLineInput] = useState(
    initialFiringLineInput
  );
  const weldingArea = 47.12;
  const roundToPlace = (num: number, place: number) => {
    return Math.round(num * Math.pow(10, place)) / Math.pow(10, place);
  };

  const calcRodBurn = (rowIndex: number) => {
    let res = weldingArea / parseFloat(firingLineInput.numOfRod[rowIndex]);
    return roundToPlace(res, 1);
  };

  const calcTravelSpeed = (rowIndex: number) => {
    let res = (rodBurns[rowIndex] / weldingArea) * 60;
    return roundToPlace(res, 1);
  };

  const calcEfficiency = (rowIdx: number) => {
    let res =
      (parseFloat(firingLineInput.voltageRange[rowIdx]) /
        weldingArea /
        travelSpeeds[rowIdx]) *
      10;
    return res;
  };

  const calcDepositRate = (rowIdx: number) => {
    let electrodeDiameter = 3 / 16;
    let res =
      13.1 *
      (electrodeDiameter * electrodeDiameter) *
      travelSpeeds[rowIdx] *
      efficiencies[rowIdx];
    return roundToPlace(res, 2);
  };

  const calcElectrodePerc = (rowIdx: number) => {
    let res = rodBurns[rowIdx] / 14;
    return roundToPlace(res * 100, 0);
  };

  const calcElectrodeInches = (rowIdx: number) => {
    let res =
      (14 - rodBurns[rowIdx]) * parseFloat(firingLineInput.numOfRod[rowIdx]);
    return roundToPlace(res, 1);
  };

  const calcElectrodeWasted = (rowIdx: number) => {
    return roundToPlace(Math.random(), 2);
  };

  const calcHoursWorked = (startTime: any, endTime: any) => {
    return '';
  };

  const totalRows = numPasses + numCaps;
  const rodBurns = Array.from({ length: totalRows }).map((_, idx) =>
    calcRodBurn(idx)
  );
  const travelSpeeds = Array.from({ length: totalRows }).map((_, idx) =>
    calcTravelSpeed(idx)
  );
  const efficiencies = Array.from({ length: totalRows }).map((_, idx) =>
    calcEfficiency(idx)
  );
  const depositRates = Array.from({ length: totalRows }).map((_, idx) =>
    calcDepositRate(idx)
  );
  const electrodePercs = Array.from({ length: totalRows }).map((_, idx) =>
    calcElectrodePerc(idx)
  );
  const electrodeInches = Array.from({ length: totalRows }).map((_, idx) =>
    calcElectrodeInches(idx)
  );
  const electrodeWasted = Array.from({ length: totalRows }).map((_, idx) =>
    calcElectrodeWasted(idx)
  );

  const [hoursWorked] = [10];
  // const pipeGangeMph = roundToPlace((hoursWorked/12) * 60/(firingLineParam.stationNumEnd - firingLineParam.stationNumStart), 4);
  // const pipeGangeFtsec = roundToPlace(pipeGangeMph * 5280, 1);
  const firingLineMph = roundToPlace(props.firingLineMph, 4);
  const firingLineFtsec = roundToPlace(firingLineMph * 5280, 1);

  const sumTravelSpeed = travelSpeeds.reduce((sum, a) => sum + a, 0);
  const howLong = 300; // need to calculate this from previous input
  const forecastedWeld = roundToPlace(
    (hoursWorked * 60) / ((sumTravelSpeed + howLong) / 60),
    1
  );
  const dailyProductivity = roundToPlace(
    (firingLineParam.actualWeld / forecastedWeld) * 100,
    0
  );

  const onTableInputChange =
    (idx: number) => (e: ChangeEvent<HTMLInputElement>) => {
      let newList =
        firingLineInput[e.target.name as keyof FiringLineInputType].slice(0);
      newList[idx] = e.target.value;
      let newPipeGange = { ...firingLineInput, [e.target.name]: newList };
      setFiringLineInput(newPipeGange);
    };

  return (
    <div className="vbutt-pg-container" style={{ padding: '20px' }}>
      <div style={{ display: 'flex' }}>
        <div
          style={{
            padding: '0px 14px',
            fontSize: '22px',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          <div>Firing Line </div>
          <div>Daily Productivity </div>
          Analyzer
        </div>

        <div style={{ display: 'flex', padding: '20px' }}>
          <div style={{ padding: '0px 10px' }}>
            <div className="label-input">
              <label>Start Time</label>
              <input
                name="startTime"
                defaultValue={firingLineParam.startTime}
              />
            </div>
            <div className="label-input">
              <label>Start Work</label>
              <input
                name="startWork"
                defaultValue={firingLineParam.startWork}
              />
            </div>
          </div>
          <div
            style={{
              padding: '0px 10px',
              textAlign: 'center',
              fontSize: '14px',
            }}
          >
            60
            <br />
            Breaks/Lunch
          </div>
          <div style={{ padding: '0px 10px' }}>
            <div className="label-input">
              <label>Ending Time</label>{' '}
              <input name="endWork" defaultValue={firingLineParam.endWork} />{' '}
            </div>
            <div className="label-input">
              <label>Hours worked</label>
              <input name="hoursWorkd" defaultValue={10.5} />{' '}
            </div>
          </div>
        </div>

        <div style={{ padding: '0px 10px' }}>
          <div className="label-input">
            <label>Station number start</label>
            <input
              name="stationNumStart"
              defaultValue={firingLineParam.stationNumStart}
            />
          </div>
          <div className="label-input">
            <label>Station Number End</label>
            <input
              name="stationNumEnd"
              defaultValue={firingLineParam.stationNumEnd}
            />
          </div>
          {/* <div className="label-input">
            <label>Average Pipe Length </label>
            <input name="avgPipeLen" defaultValue={firingLineParam.avgPipeLen}/>
          </div> */}
          <br />
          <div className="label-input">
            <label></label>
            <label>(mph)</label>
            <label>(ft/sec)</label>
          </div>
          {/* <div className="label-input">
            <label>Pipe Gang</label>
            <div>
              <input type="text" name="pipeGangMph" defaultValue={pipeGangeMph}/>
              <input type="text" name="pipeGangFt" defaultValue={pipeGangeFtsec}/>
            </div>
          </div> */}
          <div className="label-input">
            <label>Firing Line (mph)</label>
            <div>
              <input
                type="text"
                name="firingLineMph"
                defaultValue={firingLineMph}
              />
              <input
                type="text"
                name="firingLineFt"
                defaultValue={firingLineFtsec}
              />
            </div>
          </div>
        </div>

        <div style={{ padding: '0px 10px' }}>
          <div className="label-input">
            <label>Actual Weld's </label>
            <input
              name="actualWeld"
              defaultValue={firingLineParam.actualWeld}
            />
          </div>
          <div className="label-input">
            <label>Forcasted Weld's: </label>
            <input name="forcastWeld" defaultValue={forecastedWeld} />
          </div>
          <br />
          <br />
          <div className="label-input">
            <label style={{ fontSize: '16px', alignSelf: 'center' }}>
              Daily Productivity %
            </label>
            <div
              style={{
                fontSize: '18px',
                backgroundColor: 'yellow',
                padding: '10px',
              }}
            >
              {' '}
              {dailyProductivity}%{' '}
            </div>
          </div>
        </div>
      </div>

      <br />

      <div className="vbutt-pipe-gang">
        <table className="pipe-gang-table">
          <thead>
            {/* <tr>
                  <th colSpan={4}>Welding Procedure</th>
                  <th colSpan={4}>Daily Reading</th>
                </tr> */}
            <tr>
              <th></th>
              <th>Electrode Diameter</th>
              <th>Current Range (Amp)</th>
              <th>Voltage Range (Volts)</th>
              <th>Current Range(Amp) Used</th>
              <th>Voltage Range(Volts) Used</th>
              <th>Number of Rods Per Area</th>
              <th>Welders Welding Area(in.)</th>
              <th>Welders Location</th>
              <th>Rod Burn Length</th>
              <th>Travel Speed</th>
              <th>Efficieny (%)</th>
              <th>Deposit Rate</th>
              <th>Electrode % (used)</th>
              <th>Electrode Inches</th>
              <th>Electrode (Wasted Weight)</th>
            </tr>
          </thead>
          <tbody>
            {numPasses !== 0 &&
              Array.from({ length: numPasses }).map((value, idx) => {
                return (
                  <tr key={idx}>
                    {idx === 0 && (
                      <td
                        style={{ backgroundColor: 'lightgray' }}
                        rowSpan={numPasses}
                      >
                        <b>Fill</b>
                      </td>
                    )}
                    <td>5/32</td>
                    <td>80-150</td>
                    <td>20-33</td>
                    <td>
                      <input
                        type="text"
                        name="currentRange"
                        value={firingLineInput.currentRange[idx]}
                        onChange={onTableInputChange(idx)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="voltageRange"
                        value={firingLineInput.voltageRange[idx]}
                        onChange={onTableInputChange(idx)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="numOfRod"
                        value={firingLineInput.numOfRod[idx]}
                        onChange={onTableInputChange(idx)}
                      />
                    </td>
                    <td>{weldingArea}</td>
                    <td>{['Work', 'Ditch'][idx % 2]}</td>
                    <td>{rodBurns[idx]}</td>
                    <td>{travelSpeeds[idx]}</td>
                    <td>{roundToPlace(efficiencies[idx] * 100, 0)}%</td>
                    <td>{depositRates[idx]}</td>
                    <td>{electrodePercs[idx]}%</td>
                    <td>{electrodeInches[idx]}</td>
                    <td>{electrodeWasted[idx]}</td>
                  </tr>
                );
              })}
            <tr className="text-row">
              <td colSpan={6} style={{ color: 'rgb(37, 115, 167)' }}>
                Help or Helps Buffing Time
              </td>
              <td colSpan={2}></td>
              <td>
                <div style={{ backgroundColor: 'white' }}>{numPasses}</div>
              </td>
              <td colSpan={2}></td>
              <td>
                <div style={{ backgroundColor: 'white' }}>10.53 Sec</div>
              </td>
            </tr>
            {numCaps !== 0 &&
              Array.from({ length: numCaps }).map((value, idx) => {
                return (
                  <tr key={idx}>
                    {idx === 0 && (
                      <td
                        style={{ backgroundColor: 'lightgray' }}
                        rowSpan={numCaps}
                      >
                        <b>Cap</b>
                      </td>
                    )}
                    <td>3/16</td>
                    <td>110-200</td>
                    <td>20-34</td>
                    <td>
                      <input
                        type="text"
                        name="currentRange"
                        value={firingLineInput.currentRange[numPasses + idx]}
                        onChange={onTableInputChange(numPasses + idx)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="voltageRange"
                        value={firingLineInput.voltageRange[numPasses + idx]}
                        onChange={onTableInputChange(numPasses + idx)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="numOfRod"
                        value={firingLineInput.numOfRod[numPasses + idx]}
                        onChange={onTableInputChange(numPasses + idx)}
                      />
                    </td>
                    <td>{weldingArea}</td>
                    <td>{['Work', 'Ditch'][(numPasses + idx) % 2]}</td>
                    <td>{rodBurns[numPasses + idx]}</td>
                    <td>{travelSpeeds[numPasses + idx]}</td>
                    <td>
                      {roundToPlace(efficiencies[numPasses + idx] * 100, 0)}%
                    </td>
                    <td>{depositRates[numPasses + idx]}</td>
                    <td>{electrodePercs[numPasses + idx]}%</td>
                    <td>{electrodeInches[numPasses + idx]}</td>
                    <td>{electrodeWasted[numPasses + idx]}</td>
                  </tr>
                );
              })}
            <tr className="text-row">
              <td colSpan={6} style={{ color: 'rgb(37, 115, 167)' }}>
                Help or Helps Buffing Time
              </td>
              <td colSpan={2}></td>
              <td>
                <div style={{ backgroundColor: 'white' }}>{numCaps}</div>
              </td>
              <td colSpan={2}></td>
              <td>
                <div style={{ backgroundColor: 'white' }}>10.53 Sec</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default SingleVbuttFL;
