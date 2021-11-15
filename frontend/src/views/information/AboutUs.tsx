import { Backdrop } from "@material-ui/core";
import React from "react";
import AppBar from "../../components/AppBar";
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
                <p>Here at Honor Guard Inspections, LLC, we have made it our mission to stay on top of the technological forefront leverages state-of-the-art tools to develop trustworthy and economical client relationships
                It is by utilizing talented personnel with diverse industry backgrounds that we take great pride in our ability to provide comprehensive, innovative and cost conscious solutions for our clients.
                With generations of combined experience, Honor Guard Inspections, LLC consists of highly skilled and detailed-oriented team of individuals dedicated to ensuring the quality and integrity of your oil
                and gas pipelines and facilities. Our primary goal is to be the top consideration as a provider of ethical and profession management services. It is our guarantee that each project will be handledd with the 
                highest level of professionalism and integrity to organize, manage and execute a construction management and inspection services program.
                </p>
            </div>
            <div>
                <h3>What We Do</h3>
                <p>We specialize in all aspects of pipeline and facility construction. We provide highly effective teams of experienced, dedication adn OQ qualified professionals 
                    with in-depth knowledge of the pipeline construction industry.
                </p>
                <p>Our team of professionsal have extensive experience in the inspection of pipeline and facility construction, maintenance, and operations. We are committed to providing 
                    clients with safe, reliable, and environmentally responsible project solutions that drive productivitiy and project success. We ensure that each project is staffed
                    properly with experienced teams, and that each project is completed safely and in compliance with current regulatory requirements. 
                </p>
            </div>
        </>
    )
}

export default AboutUs;