import { useState } from "react";
// import Carousel from "../components/Carousel";
import Carousel2 from "./components/Carousel2";
// import Carousel3 from "../components/Carousel3";
// import LoadingBar from "../components/LoadingBar";

function DemoA() {
  const [window,setWindow] = useState();
  const [go,setGo] = useState(false);
  
  const processForm = (e) => {
    e.preventDefault(); // stop refresh
    if (window > 11 || window < 2){
      alert("window size must be between 2 and 11")
    }
    else setGo(!go);
  };

  return (
    <div styles={{border: '3px solid black'}}>
      Carousel App 
      <div style={{marginBottom: '30px'}}>
        What is the window size? - (range: [2 - 11] ; click again to reset)
        <form>
          <input 
            style={{marginLeft: '5px'}}
            type="number" 
            id="window_size" 
            name="window_size"
            value={window}
            placeholder="enter window size"
            required
            onChange={(e) => setWindow(e.target.value)}
          />
          <button 
            style={{marginLeft: '5px'}}
            onClick={(event) => processForm(event)}
          >
            Submit
          </button>
        </form>
      </div>
      {/* <div 
        style={{
        marginLeft: "20%", 
        marginRight: "20%",
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center'
        }}
      > */}
        {/* <LoadingBar 
          starts={1}
          ends={3}
        /> */}
      {/* </div> */}

      {go ?
        <Carousel2 winSize={window}/>
        : null
      }
      {/* {go ?
        <Carousel3 winSize={window}/>
        : null
      } */}
    </div>
  );
}

export default DemoA;
