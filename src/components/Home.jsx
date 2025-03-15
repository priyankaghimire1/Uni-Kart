import { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Home.css'
import Display from "./Display";
import  HomeBanner from "./Homebanner";
import Aboutus from './Aboutus';
import Footer from './Footer';

import homeimage from './Images/homeimage.png';
import avatar1 from './Images/avatar.png';
function Home(){
    const navigate= useNavigate();
    const[products, setproducts] =useState([]);
    //useEffect (() => {
        //if(!localStorage.getItem('token')){
            //navigate('/login')
        //}
    //}, [])
    return<>
        <Header/>
        <HomeBanner/>
        <div className="headingaboveproducts">&lt;&nbsp;&nbsp;Fresh Finds&nbsp;&nbsp;&gt;</div>
        <Display search={null}/>
        <section class="skills" id="skills">
        <div class="max">
        <img src={homeimage} width='900px' height='500px'/>
                <div class="box">
                    <div class="content-home"><h3>What is Uni-Kart?</h3>
                    <div class="text-home"><p>Uni-Kart is the ultimate second-hand marketplace designed specifically for students! <br/><br/>Whether you're looking to sell textbooks, furniture, electronics, or other student essentials, Uni-Kart connects you with a vibrant community of like-minded individuals.
<br/><br/>
By joining, you become part of a movement that promotes sustainable living, financial savings, and a stronger student community. Start listing your items or browse today—let’s make student life more affordable, accessible, and eco-friendly.</p><br/> <button className="start-browsing">Start Browsing &gt;</button>

                    </div></div>
                </div>
               </div>
</section><Aboutus/><section class="skills1" id="skills1">
        {/* <div class="max1">
                    <div class="content-home1"><h3>Meet the Team behind Uni-Kart</h3>
                    <div className="teammates">
                        <img src={avatar1} width='200px'></img>
                        <img src={avatar1} width='200px'></img>
                        <img src={avatar1} width='200px'></img>
                        <img src={avatar1} width='200px'></img>
                        <img src={avatar1} width='200px'></img>
                    </div>
                </div>
               </div> */}
</section>
<Footer/>
    </>
    
}
export default Home;