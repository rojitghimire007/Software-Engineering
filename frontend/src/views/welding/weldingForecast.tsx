import { color, fontSize, width } from '@mui/system';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import img1 from './pipe.png';
import img2 from './weldingArea.png';
import './weildingForecast.css';

const WeldingForcast = () => {
  const [rootOpening, setRootOpening] = useState('');
  const [typedTextRO, setTypedTextRO] = useState('');
  const [landThickness, setLandThickness] = useState('');
  const [capHeight, setCapHeight] = useState('');
  const [steelDensity, setSteelDensity] = useState('');
  const [angleOfBevel, setAngleOfBevel] = useState('');

  const [rodBornLength, setRodBornLength] = useState('');
  const [pipeGange, setPipeGange] = useState({
    rootPass: 0,
    grindingHelpers: 0,
    hotPass: 0,
    buffingHelpers: 0,
    secondPass: 0,
  });

  const [rpDailyReading, setRpDailyReading] = useState({
    curentRange: '',
    voltageRange: '',
    numOfRod: '',
    welderArea: '',
  });
  const [area, setArea] = useState<number>(0);
  const [area2, setArea2] = useState<number>(0);
  const [area3, setArea3] = useState<number>(0);
  const [totalCross, setTotalCross] = useState<number>(0);

  console.log('rootOpening: ' + rootOpening);
  const rows = 4;
  const handleSubmit = (e: any) => {
    e.preventDefault(); // stop refresh
  };

  function calculateArea() {
    var area = parseInt(rootOpening) * (12 + parseInt(landThickness));
    setArea(area);
  }

  function calculateArea2() {
    var area2 =
      (parseFloat(angleOfBevel) / 2) *
      (3.1415 / 180) *
      (12 - parseFloat(landThickness)) ** 2;
    setArea2(area2);
  }

  function calculateArea3() {
    var area3 =
      (parseFloat(angleOfBevel) / 2) * (3.1415 / 180) * 12 -
      parseFloat(landThickness) +
      1.25 * parseFloat(landThickness);
    setArea3(area3);
  }

  function totalCrossSectionalArea() {
    var area4 = area + area2 + area3;
    setTotalCross(area4);
  }

  const foo = (b: any, c: any) => {
    var calculations = b + c;
    return calculations;
  };

  const onPipeGangeInputChange = (e: any) => {
    let newPipeGange = { ...pipeGange, [e.target.name]: e.target.value };
    setPipeGange(newPipeGange);
  };

  const onRootPassChange = (e: any) => {
    setRodBornLength(e.target.value);
  };

  return (
    <div
      style={{
        height: '200vh',
        boxSizing: 'border-box',
        display: 'flex',
      }}
    >
      <div
        style={{
          width: '24%',
          backgroundColor: '#89CFF0',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          fontSize: '55px',
        }}
        id="col1"
      >
        Single V-Butt Welding
        <img src={img1} />
        <div></div>
      </div>{' '}
      {/* end column 1 */}
      <div
        style={{
          width: '78%',
          backgroundColor: '#89CFF0',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
        id="col2"
      >
        WELDING PROCEDURE SPECIFICATION NUMBER
        <br></br>
        <br></br>
        <br></br>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {/* div parent for flexbox */}
            <div>
              <div>
                <span>
                  Root Opening
                  <input
                    value={rootOpening}
                    id="rootOpening"
                    name="rootOpening"
                    onChange={(e) => setRootOpening(e.target.value)}
                  />
                </span>
                <span>
                  Land Thickness
                  <input
                    value={landThickness}
                    id="landThickness"
                    name="landThickness"
                    onChange={(e) => setLandThickness(e.target.value)}
                  />
                </span>
                <span>
                  Cap height
                  <input
                    value={capHeight}
                    id="capHeight"
                    name="capHeight"
                    onChange={(e) => setCapHeight(e.target.value)}
                  />
                </span>
                <span>
                  Angle Of Bevel
                  <input
                    value={angleOfBevel}
                    id="angleOfBevel"
                    name="angleOfBevel"
                    onChange={(e) => setAngleOfBevel(e.target.value)}
                  />
                </span>
                <span>
                  {' '}
                  penetration (e) <input type="text" id="penetration" />
                </span>
                <span>
                  Steel Density
                  <input
                    value={steelDensity}
                    id="steelDensity"
                    name="steelDensity"
                    onChange={(e) => setSteelDensity(e.target.value)}
                  />
                </span>
                <br></br>
                <div>Pipe joint details</div>
                <br></br>

                <button
                  onClick={calculateArea}
                  style={{ width: '150px', backgroundColor: '#FFFF2E' }}
                  font-size="125%"
                >
                  Calculate Area1 Details
                </button>
                <br></br>
                <button
                  onClick={calculateArea2}
                  style={{ width: '150px', backgroundColor: '#FFBF00' }}
                  font-size="115%"
                >
                  Calculate Area2 Details
                </button>
                <br></br>
                <button
                  onClick={calculateArea3}
                  style={{ width: '150px', backgroundColor: '#228B22' }}
                  font-size="95%"
                >
                  Calculate area3 Details
                </button>
                <br></br>
                <button
                  onClick={totalCrossSectionalArea}
                  style={{ width: '175px', backgroundColor: '#228B22' }}
                  font-size="95%"
                >
                  Total Cross Sectional Area
                </button>
              </div>
              {/* div children ends */}
              {/* right div flexbox */}
              <div>Area: {area}</div>
              <div>Area2: {area2}</div>
              <div>Area3: {area3}</div>
              <div>Total Cross: {totalCross}</div>
            </div>
            {/* div parent ends for flexbox */}

            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <table style={{ width: '75%' }}>
              <thead>
                <tr>
                  <th>Electrode Diameter Size</th>
                  <th>Electrode diameter size (mm)</th>
                  <th>Electrode Product Name</th>
                  <th>Welding Current Range</th>
                  <th>Welding Voltage Range</th>
                  <th>Root Bead</th>
                  <th>Hot pass</th>
                  <th>2nd Hot Pass</th>
                  <th>Fill and Strip</th>
                  <th>Cap</th>
                  <th>Electrode Length</th>
                  <th>Electrode Weight per Rod</th>
                </tr>
              </thead>
              <tr>
                <td>1/16</td>
                <td>1.6</td>
                <td>
                  <input type="text" style={{ width: '93%' }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: '93%' }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: '93%' }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: '93%' }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: '87%' }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: '87%' }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: '87%' }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: '87%' }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: '95%' }}></input>
                </td>
              </tr>
              <tr>
                <td>5/64</td>
                <td>2.0</td>
                <td>
                  <input type="text" style={{ width: '93%' }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: '93%' }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: '93%' }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: '93%' }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: '87%' }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: '87%' }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: '87%' }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: '87%' }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: '95%' }}></input>
                </td>
              </tr>
              <tr>
                <td>3/32</td>
                <td>2.4</td>
                <td>
                  <input type="text" style={{ width: '93%' }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: '93%' }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: '93%' }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: '93%' }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: '87%' }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: '87%' }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: '87%' }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: '87%' }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: '95%' }}></input>
                </td>
              </tr>
              <tr>
                <td>1/8</td>
                <td>3.2</td>
                <td>
                  <input type="text" style={{ width: '93%' }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: '93%' }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: '93%' }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: '93%' }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: '87%' }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: '87%' }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: '87%' }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: '87%' }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: '95%' }}></input>
                </td>
              </tr>
              <tr>
                <td>5/32</td>
                <td>4.0</td>
                <td>
                  <input type="text" style={{ width: '93%' }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: '93%' }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: '93%' }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: '93%' }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: '87%' }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: '87%' }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: '87%' }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: '87%' }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: '95%' }}></input>
                </td>
              </tr>
              <tr>
                <td>3/16</td>
                <td>4.8</td>
                <td>
                  <input type="text" style={{ width: '93%' }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: '93%' }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: '93%' }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: '93%' }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: '87%' }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: '87%' }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: '87%' }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: '87%' }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: '95%' }}></input>
                </td>
              </tr>
              <tr>
                <td>7/32</td>
                <td>5.6</td>
                <td>
                  <input type="text" style={{ width: '93%' }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: '93%' }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: '93%' }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: '93%' }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: '87%' }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: '87%' }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: '87%' }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: '87%' }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: '95%' }}></input>
                </td>
              </tr>
              <tr>
                <td>1/4</td>
                <td>6.4</td>
                <td>
                  <input type="text" style={{ width: '93%' }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: '93%' }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: '93%' }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: '93%' }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: '87%' }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: '87%' }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: '87%' }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: '87%' }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: '95%' }}></input>
                </td>
              </tr>
              <tr>
                <td>5/16</td>
                <td>7.9</td>
                <td>
                  <input type="text" style={{ width: '93%' }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: '93%' }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: '93%' }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: '93%' }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: '87%' }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: '87%' }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: '87%' }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: '87%' }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: '95%' }}></input>
                </td>
              </tr>
            </table>
            <div className="pipe-gange">
              <div className="pipe-row">
                <label>Root Pass Welders</label>
                <select
                  id="Root Pass Welders"
                  onChange={onPipeGangeInputChange}
                  name="rootPass"
                >
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
              <div className="pipe-row">
                <label>Grinding Helpers:</label>

                <select
                  id="Grinding Helpers"
                  onChange={onPipeGangeInputChange}
                  name="grindingHelpers"
                >
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
              <div className="pipe-row">
                <label>Hot pass welders</label>

                <select
                  id="Hot pass welders"
                  onChange={onPipeGangeInputChange}
                  name="hotPass"
                >
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
              <div className="pipe-row">
                <label>Buffing helpers</label>

                <select
                  id="Buffing Helpers"
                  onChange={onPipeGangeInputChange}
                  name="buffingHelpers"
                >
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
              <div className="pipe-row">
                <label> Second pass welders </label>
                <select
                  id="second pass welders"
                  onChange={onPipeGangeInputChange}
                  name="secondPass"
                >
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
            </div>
            <Link
              to={`/welding/create-table/${pipeGange.rootPass},${pipeGange.grindingHelpers},${pipeGange.hotPass},${pipeGange.buffingHelpers},${pipeGange.secondPass}`}
            >
              <button style={{ width: '250px', height: '30px' }}>Next</button>
            </Link>

            <br></br>
            {/* <div id="single-vbutt">
              {pipeGange.rootPass != 0 && (
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
                      {Array.from({ length: pipeGange.rootPass }).map(
                        (value, idx) => {
                          return (
                            <tr key={idx}>
                              <td>5/32</td>
                              <td>80-150</td>
                              <td>20-33</td>
                              <td>
                                <input
                                  type="text"
                                  name="currentRange"
                                  onChange={onRootPassChange}
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
                              <td>{rodBornLength}</td>
                            </tr>
                          );
                        }
                      )}
                    </tbody>
                  </table>
                </>
              )}
              {pipeGange.grindingHelpers != 0 && (
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
                      {Array.from({ length: pipeGange.grindingHelpers }).map(
                        (value, idx) => {
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
                        }
                      )}
                    </tbody>
                  </table>
                </>
              )}
              {pipeGange.hotPass != 0 && (
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
                      {Array.from({ length: pipeGange.hotPass }).map(
                        (value, idx) => {
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
                        }
                      )}
                    </tbody>
                  </table>{' '}
                </>
              )}
            </div> */}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}></div>
        </div>
      </div>
      {/* end oulmn 2 */}
      <div></div>
      <div></div> {/* end column 3 */}
    </div> //end of page
  );
};

export default WeldingForcast;
