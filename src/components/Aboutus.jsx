import React from "react";
import "./Aboutus.css";
import Furniture from './Images/cupboard1.png';
import Books from './Images/book.png';
import Table from './Images/kitchen1.png';

const Aboutus = () => {
  return (
    <div className="container">
      <div className="text-section">
        <h1 className="heading">
          Our Sustainability Journey
        </h1>
        <p className="description">
        At Uni-Kart, we believe that sustainability is not just a trend but a responsibility we embrace wholeheartedly.<br/><br/>
         From the very beginning, our goal has been to create an impact that is both positive and lasting — not just for the students who benefit from our platform, but for the planet we share.
        <br/><br/>As a platform dedicated to second-hand goods, we are proud to play an active role in promoting the circular economy. By facilitating the reuse and recycling of items, we reduce waste and extend the lifespan of products, helping to conserve resources and reduce overall consumption.
        </p>
        {/* <div className="button">
          <button className="get-started">Get Started</button>
        </div> */}
      </div>
      <div className="image-section">
        <div className="image-cards">
          <img src={Furniture} alt="Furniture" className="image image1" />
          <img src={Books} alt="Books" className="image image2" />
          <img src={Table} alt="Table" className="image image3" />
        </div>
      </div>
    </div>
  );
};

export default Aboutus;