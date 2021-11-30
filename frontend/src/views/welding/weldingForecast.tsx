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
  const [numPassCaps, setNumPassCaps] = useState({
    numPasses: '1',
    numCaps: '1',
  });
  // const [numCaps, setNumCaps] = useState(0);

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

  const onPassCapChange = (e: any) => {
    let newNumPassCaps = { ...numPassCaps, [e.target.name]: e.target.value };
    setNumPassCaps(newNumPassCaps);
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
        {/* <img src={img1} /> */}
        <div
          id="Circle"
          style={{
            width: '155px',
            height: '155px',
            backgroundColor: '#808080',
            borderRadius: '155px',
            position: 'relative',
            boxShadow: '0 0 0 35px #cfd1d1',
            top: '39px',
            left: '91px',
          }}
        >
          <div style={{ fontSize: '20px' }}>
            <label>PS</label>
            <select id="N" name="FLW">
              <option value="0">0.125</option>
              <option value="1">0.250</option>
              <option value="1">0.375</option>
              <option value="1">0.500</option>
              <option value="1">1</option>
              <option value="1">1.25</option>
              <option value="1">1.50</option>
              <option value="1">2</option>
              <option value="1">2.50</option>
              <option value="1">3</option>
              <option value="1">3.5</option>
              <option value="1">4</option>
              <option value="1">4.5</option>
              <option value="1">5</option>
              <option value="1">6</option>
              <option value="1">8</option>
              <option value="1">4</option>
              <option value="1">10</option>
              <option value="1">11</option>

              <option value="1">16</option>
              <option value="1">20</option>
              <option value="1">22</option>
              <option value="1">24</option>
              <option value="1">30</option>
              <option value="1">32</option>
              <option value="1">36</option>
              <option value="1">42</option>
              <option value="1">46</option>
              <option value="1">48</option>
              <option value="1">50</option>
              <option value="1">54</option>
              <option value="1">60</option>
            </select>
            <div style={{ fontSize: '20px', position: 'relative' }}>
              <label>WT</label>
              <select id="N" name="FLW">
                <option value="0">0.035</option>
                <option value="1">0.049</option>
                <option value="0">0.068</option>
                <option value="1">0.095</option>
                <option value="0">0.188</option>
                <option value="1">0.147</option>
              </select>
            </div>
            <div style={{ fontSize: '20px', position: 'relative' }}>
              <label>circum</label>
              <select id="N" name="FLW">
                <option value="0">2.5447</option>
                <option value="1">3.9329</option>
                <option value="0">4.2412</option>
                <option value="1">5.2779</option>
                <option value="0">6.5973</option>
                <option value="1">8.4226</option>
              </select>
            </div>
          </div>
        </div>
        <div
          style={{ fontSize: '15px', marginTop: '80px', textAlign: 'center' }}
        >
          <div>Menu</div>
          <div>
            <Link to="#">Single - V Butt Weld</Link>
          </div>
          <div>
            <Link to="#">Daily Input Sheet</Link>
          </div>
          <div>
            <Link to="#">Production Wheel</Link>
          </div>
          <div>
            <Link to="#">Data-Log</Link>
          </div>
        </div>
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
        <div style={{ textAlign: 'center' }}>
          Welding Procedure Specification No.
          <div
            style={{
              backgroundColor: 'white',
            }}
          >
            <Link to="/welding-procedure">SMAW-32</Link>
          </div>
        </div>

        <br></br>
        <br></br>
        <br></br>
        <div>
          {/* style={{ display: 'flex', flexDirection: 'row' }} */}

          {/* style={{ display: 'flex', flexDirection: 'column' }} */}
          {/* div parent for flexbox */}
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            Pipe joint details
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {/* input pipe joint details  */}
            <div>
              <div>
                Root Opening
                <input
                  value={rootOpening}
                  id="rootOpening"
                  name="rootOpening"
                  onChange={(e) => setRootOpening(e.target.value)}
                />
              </div>
              <div>
                Land Thickness
                <input
                  value={landThickness}
                  id="landThickness"
                  name="landThickness"
                  onChange={(e) => setLandThickness(e.target.value)}
                />
              </div>
              <div>
                Cap height
                <input
                  value={capHeight}
                  id="capHeight"
                  name="capHeight"
                  onChange={(e) => setCapHeight(e.target.value)}
                />
              </div>
              <div>
                Angle Of Bevel
                <input
                  value={angleOfBevel}
                  id="angleOfBevel"
                  name="angleOfBevel"
                  onChange={(e) => setAngleOfBevel(e.target.value)}
                />
              </div>
              <div>
                {' '}
                penetration (e) <input type="text" id="penetration" />
              </div>
              <div>
                Steel Density
                <input
                  value={steelDensity}
                  id="steelDensity"
                  name="steelDensity"
                  onChange={(e) => setSteelDensity(e.target.value)}
                />
              </div>
              <br></br>

              <br></br>
            </div>
            {/* div children ends */}
            <div style={{ width: '100px' }}></div>

            {/* right div flexbox */}
            <div>
              <button
                onClick={calculateArea}
                style={{
                  width: '150px',
                  backgroundColor: '#FFFF2E',
                  display: 'inline',
                }}
                font-size="125%"
              >
                Calculate Area1 Details
              </button>
              <span> Area: {area}</span>
              <br></br>
              <button
                onClick={calculateArea2}
                style={{ width: '150px', backgroundColor: '#FFBF00' }}
                font-size="115%"
              >
                Calculate Area2 Details
              </button>
              <span> Area2: {area2}</span>
              <br></br>
              <button
                onClick={calculateArea3}
                style={{ width: '150px', backgroundColor: '#228B22' }}
                font-size="95%"
              >
                Calculate area3 Details
              </button>
              <span> Area3: {area3}</span>
              <br></br>
              <button
                onClick={totalCrossSectionalArea}
                style={{ width: '175px', backgroundColor: '#228B22' }}
                font-size="95%"
              >
                Total Cross Sectional Area
              </button>

              <span> Total Cross: {totalCross}</span>
            </div>
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
          <div className="pipe-firing-container">
            <div className="pipe-gange" style={{ marginRight: '10px' }}>
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

            <div className="firing-line">
              <div className="firing-row">
                <label>Firing Line Type</label>
                <select name="FLT">
                  <option value="Leap Frog">Leap Frog</option>
                  <option value="Wagon Train">Wagon Traing</option>
                </select>
              </div>
              <div className="firing-row">
                <label>Number of Firing Line Welders</label>
                <select name="FLW">
                  <option value="0">0</option>
                  <option value="1">1</option>
                </select>
              </div>
              <div className="firing-row">
                <label>Single hand or brother in law </label>
                <select name="SH">
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
              </div>

              {/* fireline ends */}
            </div>
            <div className="pass-caps" style={{ width: '20%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <label> Number of Passes </label>
                <select
                  id="Number of Passes"
                  name="numPasses"
                  value={numPassCaps.numPasses}
                  onChange={onPassCapChange}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                  <option value="13">13</option>
                  <option value="14">14</option>
                  <option value="15">15</option>
                  <option value="16">16</option>
                  <option value="17">17</option>
                  <option value="18">18</option>
                  <option value="19">19</option>
                  <option value="20">20</option>
                  <option value="21">21</option>
                  <option value="22">22</option>
                  <option value="23">23</option>
                  <option value="24">24</option>
                  <option value="25">25</option>
                </select>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <label> Number of caps </label>
                <select
                  id="Number of Caps"
                  name="numCaps"
                  value={numPassCaps.numCaps}
                  onChange={onPassCapChange}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </div>
            </div>
          </div>

          <br />
          <Link
            to={{
              pathname: '/welding/pipe-gange',
              state: { pipeGangeNumber: pipeGange, numPassCaps: numPassCaps },
            }}
          >
            <button style={{ width: '250px', height: '30px' }}>Next</button>
          </Link>
        </div>
      </div>
      {/* end oulmn 2 */}
      <div></div>
      <div></div> {/* end column 3 */}
    </div> //end of page
  );
};

export default WeldingForcast;
