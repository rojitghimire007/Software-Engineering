import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface RouteParams {
  root: string;
  grinding: string;
  hot: string;
  buffing: string;
  second: string;
}

interface CreateTable extends RouteComponentProps<RouteParams> {}

const CreateTable: React.FC<CreateTable> = (props) => {
  const [root, setRoot] = useState(parseInt(props.match.params.root));
  const [grinding, setGrinding] = useState(
    parseInt(props.match.params.grinding)
  );
  const [hot, setHot] = useState(parseInt(props.match.params.hot));
  const [buffing, setBuffing] = useState(parseInt(props.match.params.buffing));
  const [second, setSecond] = useState(parseInt(props.match.params.second));

  return (
    <div style={{ backgroundColor: '#89CFF0' }}>
      {/* <div>Root: {root}</div>
      <div>Grinding: {grinding}</div>
      <div>Hot: {hot}</div>
      <div>Buffing: {buffing}</div>
      <div>Second: {second}</div> */}

      <div id="single-vbutt">
        {root != 0 && (
          <>
            <div>ROOT PASS</div>
            <table className="vbutt-table">
              <thead>
                <tr>
                  <th>Electrode Diameter</th>
                  <th>Current Range (Amp)</th>
                  <th>Voltage Range (Volts)</th>
                  <th>Current Range(Amp) Used</th>
                  <th>Voltage Range(Volts) Used</th>
                  <th>Number of Rods Per Area</th>
                  <th>Welders Welding Area(in.)</th>
                  <th>Welding Location</th>
                  <th>Rod Burn Length</th>
                  <th>Travel Speed</th>
                  <th>Efficieny (%)</th>
                  <th>Deposit Rate</th>
                  <th>Electrode</th>
                  <th>Electrode Inches</th>
                  <th>Electrode (Wasted Weight)</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: root }).map((value, idx) => {
                  return (
                    <tr key={idx}>
                      <td>5/32</td>
                      <td>80-150</td>
                      <td>20-33</td>
                      <td>
                        <input
                          type="text"
                          name="currentRange"
                          // onChange={onRootPassChange}
                        />
                      </td>
                      <td>
                        <input type="text" />
                      </td>
                      <td>
                        <input type="text" />
                      </td>
                      <td>
                        <input type="text" />
                      </td>
                      {/* <td>{rodBornLength}</td> */}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
        {grinding != 0 && (
          <>
            <br></br>
            <div>HOT PASS</div>
            <table className="vbutt-table">
              <thead>
                <tr>
                  <th>Electrode Diameter</th>
                  <th>Current Range (Amp)</th>
                  <th>Voltage Range (Volts)</th>
                  <th>Current Range(Amp) Used</th>
                  <th>Voltage Range(Volts) Used</th>
                  <th>Number of Rods Per Area</th>
                  <th>Welders Welding Area(in.)</th>
                  <th>Welding Location</th>
                  <th>Rod Burn Length</th>
                  <th>Travel Speed</th>
                  <th>Efficieny (%)</th>
                  <th>Deposit Rate</th>
                  <th>Electrode</th>
                  <th>Electrode Inches</th>
                  <th>Electrode (Wasted Weight)</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: grinding }).map((value, idx) => {
                  return (
                    <tr key={idx}>
                      <td>5/32</td>
                      <td>110-200</td>
                      <td>20-34</td>
                      <td>
                        <input type="text" />
                      </td>
                      <td>
                        <input type="text" />
                      </td>
                      <td>
                        <input type="text" />
                      </td>
                      <td>
                        <input type="text" />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
        {hot != 0 && (
          <>
            <br></br>
            <div>SECOND HOT PASS</div>
            <table className="vbutt-table">
              <thead>
                <tr>
                  <th>Electrode Diameter</th>
                  <th>Current Range (Amp)</th>
                  <th>Voltage Range (Volts)</th>
                  <th>Current Range(Amp) Used</th>
                  <th>Voltage Range(Volts) Used</th>
                  <th>Number of Rods Per Area</th>
                  <th>Welders Welding Area(in.)</th>
                  <th>Welding Location</th>
                  <th>Rod Burn Length</th>
                  <th>Travel Speed</th>
                  <th>Efficieny (%)</th>
                  <th>Deposit Rate</th>
                  <th>Electrode</th>
                  <th>Electrode Inches</th>
                  <th>Electrode (Wasted Weight)</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: hot }).map((value, idx) => {
                  return (
                    <tr key={idx}>
                      <td>3/16</td>
                      <td>120-200</td>
                      <td>21-34</td>
                      <td>
                        <input type="text" />
                      </td>
                      <td>
                        <input type="text" />
                      </td>
                      <td>
                        <input type="text" />
                      </td>
                      <td>
                        <input type="text" />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>{' '}
          </>
        )}
      </div>
    </div>
  );
};
export default CreateTable;
