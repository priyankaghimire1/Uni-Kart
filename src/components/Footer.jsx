import React from "react";
import "./Footer.css";
import Footer from './Images/eco-awareness.png';

const footer = () => {
    return (
        <footer className="footer">
            <div className="footer-image">
                <img src={Footer} alt="Footer Illustration" />
            </div>

            <div className="footer-section email">
                <h3>Start using Uni-Kart today</h3>
                <div className="email-input">
                    <input type="email" placeholder="Your Email" />
                    <button className="send-btn">&#10148;</button>
                </div>
            </div>
            
            <div className="footer-section">
                <h2 className="heading">
                    Trade<br /> With Confidence<br /> With Uni-Kart
                </h2>
            </div>

            <div className="footer-bottom">
                <p>© 2025 Uni-Kart | All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default footer;