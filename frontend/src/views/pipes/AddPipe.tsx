import api from 'api';
import React, { useState } from 'react';
import '../../style/AddPipe.css';

const AddPipe = () => {
  const [answers, setAnswers] = useState({ material_type: 'steel' });
  const [isvoid, setIsVoid] = useState(false);
  const [next, setNext] = useState(0);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | any
    >
  ) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
  };

  const generateDiameterOptions = () => {
    let diameters = [
      '1/8″',
      '1/4″',
      '3/8″',
      '1/2″',
      '3/4″',
      '1″',
      '1 1/4″',
      '1 1/2″',
      '2″',
      '2 1/2″',
      '3″',
      '3 1/2″',
      '4″',
      '4 1/2″',
      '5″',
      '6″',
      '7″',
      '8″',
      '9″',
      '10″',
      '11″',
      '12″',
      '14″',
      '16″',
      '18″',
      '20″',
      '22″',
      '24″',
      '26″',
      '28″',
      '30″',
      '32″',
      '34″',
      '36″',
      '42″',
      '46″',
      '48″',
      '54″',
      '60″',
    ];

    return diameters.map((item, i) => <option key={i}>{item}</option>);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    api
      .addPipe({ ...answers, isVoid: isvoid })
      .then((res) => alert('Success'))
      .catch((err) => alert(err.message));

    console.log(answers);
    console.log(isvoid);
  };
  return (
    <div className="add-screen">
      <h1>Add New Pipe</h1>
      <form action="" className="add-form" onSubmit={handleSubmit}>
        <label htmlFor="">Location: </label>
        <input
          onChange={handleChange}
          name="location"
          type="text"
          id="add-field"
        />
        <br />
        <span>Is the pipe void? </span>
        <input
          onClick={() => setIsVoid(false)}
          type="radio"
          name="void"
          id="0"
          checked
        />
        <label htmlFor="0">No</label>
        <input
          onClick={() => setIsVoid(true)}
          type="radio"
          name="void"
          id="1"
        />
        <label htmlFor="1">Yes</label>
        <br />
        <label htmlFor="coil_no">Pipe coil no: </label>
        <input
          onChange={handleChange}
          name="coil_no"
          type="text"
          id="add-field"
        />
        <br />
        <label htmlFor="heat_no">Pipe Heat No: </label>
        <select name="heat_no" id="add-field" onChange={handleChange}>
          <option hidden disabled selected>
            -- select an option --
          </option>
          <option value="633797">633797</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </select>
        <br />
        <label htmlFor="diameter">Diameter: </label>
        <input list="heat_no" id="add-field" onChange={handleChange} />
        <datalist id="heat_no">
          <option hidden disabled selected>
            -- select an option --
          </option>
          {generateDiameterOptions()}
        </datalist>
        <br />
        <br />
        {next === 0 && (
          <button id="add-button" onClick={() => setNext(1)}>
            Next
          </button>
        )}
        {next >= 1 && (
          <>
            <label htmlFor="schedule">Schedule and Class: </label>
            <input
              onChange={handleChange}
              name="schedule"
              type="text"
              id="add-field"
            />
            {/**Convert to select input */}
            <br />
            <label htmlFor="wall_thickness">Wall Thickness: </label>
            <input
              onChange={handleChange}
              name="wall_thickness"
              type="text"
              id="add-field"
            />
            {/**Convert to select input */}
          </>
        )}
        <br />
        <br />
        <label htmlFor="grade">Grade: </label>
        <select name="grade" id="add-field" onChange={handleChange}>
          <option value="Gr. A">Gr. A</option>
          <option value="Gr. B">Gr. B</option>
          <option value="X42">X42</option>
          <option value="X45">X45</option>
          <option value="X46">X46</option>
          <option value="X50">X50</option>
          <option value="X52">X52</option>
          <option value="X56">X56</option>
          <option value="X60">X60</option>
          <option value="X65">X65</option>
          <option value="X70">X70</option>
          <option value="X80">X80</option>
          <option value="X100">X100</option>
        </select>
        <br />
        <br />
        <label htmlFor="length">Length: </label>
        <input
          onChange={handleChange}
          name="length"
          type="text"
          id="add-field"
        />
        <label htmlFor="coating">Coating: </label>
        <input
          onChange={handleChange}
          name="coating"
          type="text"
          id="add-field"
        />
        <br />
        <label htmlFor="coating_color">Coating Color: </label>
        <select name="coating_color" id="add-field" onChange={handleChange}>
          <option hidden disabled selected>
            -- select an option --
          </option>
          <option value="Red" style={{ backgroundColor: 'red' }}>
            Red
          </option>
          <option value="White" style={{ backgroundColor: 'white' }}>
            White
          </option>
          <option value="Lite Gray" style={{ backgroundColor: 'lightgray' }}>
            Lite Gray
          </option>
          <option value="Lite Green" style={{ backgroundColor: 'lightgreen' }}>
            Lite Green
          </option>
          <option value="Yellow" style={{ backgroundColor: 'yellow' }}>
            Yellow
          </option>
        </select>
        <br />
        <label htmlFor="material_type">Material Type: </label>
        <select name="material_type" id="add-field" onChange={handleChange}>
          <option value="steel">Steel</option>
        </select>
        <br />
        <label htmlFor="po_number">PO Number: </label>
        <input
          onChange={handleChange}
          name="po_number"
          type="text"
          id="add-field"
        />{' '}
        {/**Change to select */}
        <br />
        <br />
        <label htmlFor="smart_label">Smart Label: </label>
        <input
          onChange={handleChange}
          name="smart_label"
          type="text"
          id="add-field"
        />
        <br />
        <div>
          <p>Comments: </p>
          <textarea
            onChange={handleChange}
            name="comments"
            id=""
            cols={30}
            rows={10}
          ></textarea>
        </div>
        <input type="submit" value="Submit" id="add-button" />
      </form>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default AddPipe;
