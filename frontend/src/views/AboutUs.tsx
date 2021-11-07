import { Backdrop } from "@material-ui/core";
import React from "react";
import AppBar from "./AppBar";
import { SketchPicker } from 'react-color';

const AboutUs = () => {
    return (
        <>
            <AppBar></AppBar>
            {/* <Backdrop open={true}>
                <div>
                    <ul style={{color: 'white'}}>
                        <li>Pipe Inventory</li>
                        <li>Fitttings Inventory</li>
                    </ul>
                </div>
            </Backdrop>  */}
            <div>
                 <h2>Honor Guard Inspection</h2>
            </div>
             <div>
                <h3>Guided by our values</h3>
                <p>Here at Honor Guard Inspections, LLC, we have made it our mission...</p>
            </div>
            <div>
                <h3>What We Do</h3>
                <p>Here at Honor Guard Inspections, LLC, we have made it our mission...</p>
            </div>
        </>
    )
}

export default AboutUs;