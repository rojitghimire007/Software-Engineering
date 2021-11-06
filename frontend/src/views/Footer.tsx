import React from "react";
import 'style/FooterStyles.css';

const Footer = () => {
    return (
        <div className="footer-container">
            <div className="footer">
                <div className="footer-heading footer-1">
                    <h2>Honor Guard Inspections</h2>
                    <p>318-355-2938</p>
                    <p>401 Keystone Road</p>
                    <p>Monroe, LA 71202</p>
                </div>
                <div className="footer-heading footer-2">
                    <h2>About Us: </h2>
                    <a href="#">Services</a>
                    <a href="#">Training</a>
                    <a href="#">Careers</a>
                </div>
                {/*<div className="footer-heading footer-3">
                    <h2>Social Media</h2>
                    <a href="#">Facebook</a>
                    <a href="#">Instagram</a>
                    <a href="#">YouTube</a>
                </div>
                <div className="footer-email-form">
                    <h2>Join our newsletter</h2>
                    <input type="email" placeholder="Enter your email address" id="footer-email"></input>
                    <input type="submit" value="Sign Up" id="footer-email-btn"></input>
                 </div>*/}
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