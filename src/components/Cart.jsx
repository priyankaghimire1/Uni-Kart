import Header from "./Header";
import { useEffect, useState} from "react";
import axios from "axios";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import checkoutpic from './Images/cart2.png';
//import order from './Images/order.png';

const openorderpopup=()=>{
  //document.querySelector('.overlay').classList.add('showoverlay');  
  document.querySelector('.orderpopup').classList.add('open-orderpopup')   
}
const closeorderpopup=()=>{  
  document.querySelector('.orderpopup').classList.remove('open-orderpopup') 
  // navigate('/'); //sending to home page
}
function Cart(){
    const navigate=useNavigate();
    const [refresh, setRefresh]=useState(false);
    const [product, setproduct]=useState([]);
    const userId=localStorage.getItem('userId');
    useEffect(() => {
        console.log(userId);
           axios.get("http://localhost:8080/cart", {
               params: {
                 userId
               },
             })
             .then((res) => {
               setproduct(res.data.product);
             })
             .catch(() => {
               alert("SERVER ERR");
             });
         }
 , [refresh]);
 const handleRemove=(pid)=>{
    axios.get("http://localhost:8080/remove-from-cart", {
        params: {
          pid,
          userId
        },
      })
      .then((res) => {
        //setproduct(res.data.product);
        console.log(res.data.message);
        setRefresh(!refresh);
      })
      .catch(() => {
        alert("SERVER ERR");
      });
 }
 const handleproceed=(pids)=>{
  axios.get("http://localhost:8080/proceed", {
    params: {
        pids,
        userId
      },
    })
    .then((res) => {
      openorderpopup();
      //navigate('/my-orders');
    })
    .catch(() => {
      alert("SERVER ERR");
    });
}
const selectitem=(pid)=>{
    console.log(pid);
    navigate('/my-products/'+pid);
}
    return <>
    <Header/>
    <div className="purchased-item">&lt;Cash Items&gt;</div>
    <div className="cart-box">
    <div className="cart-heading">
                    <div className="cart-subheading">Remove</div>
                    <div className="cart-subheading">S.N</div>
                    <div className="cart-subheading">Product</div>
                    <div className="cart-subheading">Product Name</div>
                    <div className="cart-subheading">Price</div>
                    
                   </div>
    <div className="cart-card">
        {product && product.length > 0 &&
               product.filter((item) => item.isSwapdisplay === false).map((item, index) => {
                  // Ensure only the first two items are displayed
                   return<>
                     <div key={item._id} className="cart-display">
                      <div><button className="cart-item"onClick={()=>{handleRemove(item._id)}}>-</button></div>
                     <div className="cart-item"><p><strong>{index + 1}</strong></p></div>
                       <div className="cart-item"><img
                         width="150px"
                         height="150px"
                         src={'http://localhost:8080/' + item.pimage}
                         alt={item.pname}
                       /></div>
                       <div className="cart-item"><p>{item.pname}</p></div>
                       <div className="cart-item"><p>Rs. {item.price}</p></div>
                     </div>
                   </>
               })}
               </div>
  {product && product.length > 0 && (<>
  <div className="cart-total">
   <br/>
   <h3> Total&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Rs.{" "}
      {product.filter((item) => item.isSwapdisplay === false).reduce((total, item) => total + Number(item.price), 0)}</h3>
    
  </div>
  <button className="checkout"onClick={()=> {const productIds = product.filter((item) => item.isSwapdisplay === false).map((item) => item._id); // Create array of product IDs
        handleproceed(productIds);} // Pass the array to the handler
        }>Checkout</button>
         {/* <img className='checkoutpic' src={checkoutpic}></img> */}
   <div className='orderpopup' id='orderpopup'>
                            <img  width='100px' height='100px'/>
                            <h2>Order placed sucessfully!</h2>
                            <p>You can check your orders and contact information of seller from 'My Orders' section in your profile. ^_^ ~ </p>
                            <button type='button' onClick={closeorderpopup}>OK</button>
                           </div>     
  </>
)}</div>
<div className="purchased-item">&lt;Swap and Trade Items&gt;</div>
<div className="cart-box">
<div className="cart-heading">
                    <div className="cart-subheading">Remove</div>
                    <div className="cart-subheading">S.N</div>
                    <div className="cart-subheading">Product</div>
                    <div className="cart-subheading">Product Name</div>
                    <div className="cart-subheading">Trade Item</div>
                    
                   </div>
        {product && product.length > 0 &&
               product.filter((item) => item.isSwapdisplay === true).map((item, index) => {
                  // Ensure only the first two items are displayed
                   return<>
                     <div key={item._id} className="cart-display">
                        <div><button className="cart-item" onClick={()=>{handleRemove(item._id)}}>-</button></div>
                     <div className="cart-item"><p><strong>{index + 1}</strong></p></div>
                       <div className="cart-item"><img
                         width="100px"
                         height="100px"
                         src={'http://localhost:8080/' + item.pimage}
                         alt={item.pname}
                       /></div>
                       <div className="cart-item"><p>{item.pname}</p></div>
                       <div className="cart-item"><button className="choose-swap" onClick={()=>selectitem(item._id)}>Select your item </button></div>
                     </div>
                   </>
               })}
               </div>

    </>
}
export default Cart;