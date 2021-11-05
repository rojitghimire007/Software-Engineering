import React from "react";
import 'style/FooterStyles.css';

const Footer = () => {
    return (
        <div className="footer-container">
            <div className="footer">
                <div className="footer-heading footer-1">
                    <h2>Honor Guard Inspections</h2>
                        <p>555-555-555</p>
                        <p>Address</p>
                        <p>City, State, Zip</p>                    
                </div>
                <div className="footer-heading footer-2">
                    <h2>About Us </h2>
                    {/* <a href="#">Jobs</a> */}
                    <a href="#">Technical Support</a>
                    <a href="#">Email Us</a>
                </div>
            </div>
                
                <div className="row">
                    <div className="col-sm">
                        &copy;{new Date().getFullYear()} Honor Guard Inspections | All Rights Reserved | Terms of Service | Privacy
                    </div>
                </div>
        </div>
    )
}
export default Footer;