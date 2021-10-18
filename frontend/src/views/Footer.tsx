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
                    <a href="#">Jobs</a>
                    <a href="#">Support</a>
                    <a href="#">Email Us</a>
                </div>
                <div className="footer-heading footer-3">
                    <h2>Social Media</h2>
                    <a href="#">Facebook</a>
                    <a href="#">Instagram</a>
                    <a href="#">YouTube</a>
                </div>
                <div className="footer-email-form">
                    <h2>Join our newsletter</h2>
                    <input type="email" placeholder="Enter your email address" id="footer-email"></input>
                    <input type="submit" value="Sign Up" id="footer-email-btn"></input>
                </div>
                
                <div className="row">
                    <p className="col-sm">
                        &copy;{new Date().getFullYear()} Honor Guard Inspections | All Rights Reserved | Terms of Service | Privacy
                    </p>
                </div>
            </div>
        </div>
    )
}
export default Footer;