import React from "react";
import Slider from "react-slick";
import './Homebanner.css'
import { useNavigate } from "react-router-dom";
import furniture from './Images/furnitures-icon.png';
import stationery from './Images/stationery.png';
import textbook from './Images/itembooks.png';

function HomeBanner () {
    const navigate=useNavigate();
    var settings = {
        dots: false,
        infinite: true,
        speed: 400,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:true,
        autoplay:true
      };
    const handlecategory=(category)=>{
        navigate('/catalogue/'+category);
    }
    return (
        <div className='homeBanner'>
            <Slider {...settings}>
                <div className="itemfurniture">
                <div className="furniture-box"></div>
                <div className="words">
                    <div className="Quality">Quality</div>
                    <div className="Qfurniture">Furnitures</div>
                    <div className="Second">Second hand prices!</div>
                </div>
                <div className="secondwords">
                    Give pre-loved furnitures a new home. o_o<br/>Style your space sustainably and affordably! Browse now! &gt;_o
                </div>
                <img src={furniture} className="furnitures-icon"></img>
                </div>
                <div className="itemstationery">
                <div className="furniture-box"></div>
                <div className="words">
                    <div className="Quality1">Now easier and more affordable!</div>
                    <div className="Qfurniture">Stationery</div>
                    <div className="Second1">Grab em fast!</div>
                </div>
                <div className="secondwords1">
                    <br/>
                    Wanna swap your T-Scale for a Compass set?<br/> Check out our Stationery section for all of the latest deals. ^_^ ~
                </div>
                    {/* <img src={furniture2} className="furnitures-icon2"></img> */}
                    <img src={stationery} className="stationery-icon"></img>
                    {/* <img src={furniture} data-value="Furniture"className="w-100"onClick={(e) => handlecategory(e.target.getAttribute('data-value'))}/> */}
                </div>
                <div className="itemtextbook">
                <div className="furniture-box"></div>
                <div className="words">
                    <div className="Quality2">Check out our awesome notes!</div>
                    <div className="Qfurniture1">Textbooks <br/>&nbsp;&nbsp;&nbsp;&nbsp;and Notes</div>
                    <div className="Second2">Grab em fast!</div>
                </div>
                <div className="secondwords2">
                    <br/>
                    Are you even a KU Student if you haven't browsed our notes section?<br/>This might just be the best place to look for thrifted textbooks. ^_^ ~
                </div>
                <div className="textbook">
                    <img src={textbook} className="stationery-icon"></img></div>
                    {/* <img src={textbook} className="textbook-icon"></img> */}
                    {/* <img src={furniture} data-value="Furniture"className="w-100"onClick={(e) => handlecategory(e.target.getAttribute('data-value'))}/> */}
                </div>
                {/* <div className="item">
                    <img src="https://img.lazcdn.com/us/domino/fdcd7bd7-41cc-4318-b929-6ab65e3f11e3_NP-1976-688.jpg_2200x2200q80.jpg" data-value="Furniture"className="w-100"onClick={(e) => handlecategory(e.target.getAttribute('data-value'))}/>
                </div>
                <div className="item">
                    <img src="https://img.lazcdn.com/us/domino/9ff52f9b574ef5f34975e231516f3cbe.jpg_2200x2200q80.jpg"className="w-100" data-value="Stationary" onClick={(e) => handlecategory(e.target.getAttribute('data-value'))}/>
                </div>
                <div className="item">
                    <img src="https://img.lazcdn.com/us/domino/50b532d0-18b6-4d25-a6a4-9d97fb0b0e89_NP-1976-688.jpg_2200x2200q80.jpg"className="w-100" data-value="Textbooks and Notes" onClick={(e) => handlecategory(e.target.getAttribute('data-value'))}/>
                </div> */}
            </Slider>

        </div>
    )
}
export default HomeBanner;