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

  function valueRootPassDetermine(idx: any) {
    console.log(idx);
    if (idx == 0) return 'Top Work';
    else if (idx == 1) return 'Bottom Work';
    else if (idx == 2) return 'Top Ditch';
    else return 'Bottom Ditch';
  }
  return (
    <div style={{ backgroundColor: '#89CFF0', height: '2000px' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ fontSize: '35px', textAlign: 'center', width: '300px' }}>
          <div>Pipe Gang </div>
          <div>Daily Productivity </div>
          Analyzer
        </div>

        <div style={{ display: 'flex', marginTop: '50px' }}>
          <div style={{ marginRight: '30px' }}>
            <div>
              <input id="st" name="st" />
              Start Time{' '}
            </div>
            <div>
              <input id="sw" name="sw" />
              Start Work{' '}
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            60
            <br />
            Breaks/Lunch
          </div>
          <div>
            {' '}
            <div>
              Ending Time <input id="et" name="et" />{' '}
            </div>
            <div>
              Hours worked <input id="hw" name="hw" />{' '}
            </div>
          </div>
        </div>

        <div
          style={{
            marginRight: '50px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
          }}
        >
          <div>
            Station number start <input id="startStation" name="startStation" />
          </div>
          <div>
            Station Number End <input id="endingStation" name="endingStation" />
          </div>
          <div>
            Average Pipe Length <input id="avgLength" name="avgLength" />{' '}
          </div>

          <div>Pipe Gang</div>
          <div>Firing Lane (mph)</div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
          }}
        >
          <div>
            Actual Wield <input id="actualWeild" name="actualWeild" />{' '}
          </div>
          <div>Forcasted Weild's: </div>
          <div>Daily Productivity %</div>
        </div>
      </div>

      <br></br>
      <br></br>

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
                          id={(idx + 1).toString() + 'a'}
                          // onChange={(e) => setState({})}
                        />
                      </td>
                      <td>
                        <input type="text" id={idx.toString() + 'b'} />
                      </td>
                      <td>
                        <input type="text" id={idx.toString() + 'c'} />
                      </td>
                      <td>
                        <input type="text" id={idx.toString() + 'd'} />
                      </td>
                      <td>{valueRootPassDetermine(idx)}</td>
                      <td>{}</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
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
                        <input type="text" id={idx.toString() + 'e'} />
                      </td>
                      <td>
                        <input type="text" id={idx.toString() + 'f'} />
                      </td>
                      <td>
                        <input type="text" id={idx.toString() + 'g'} />
                      </td>
                      <td>
                        <input type="text" id={idx.toString() + 'h'} />
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
                        <input type="text" id={idx.toString() + 'i'} />
                      </td>
                      <td>
                        <input type="text" id={idx.toString() + 'j'} />
                      </td>
                      <td>
                        <input type="text" id={idx.toString() + 'k'} />
                      </td>
                      <td>
                        <input type="text" id={idx.toString() + 'l'} />
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
