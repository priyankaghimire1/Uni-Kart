import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import './ProductDetails.css';
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
function ProductDetails(){
    const navigate=useNavigate();
    const [product, setProduct]=useState();
    const [swap, setswap] = useState(false);
     const p= useParams()
     console.log(p.productId);
     useEffect(()=>{
        const url='http://localhost:8080/get-product/'+ p.productId;
        axios.get(url)
        .then((res)=>{
            if(res.data.product){
                setProduct(res.data.product)
            }
         })
         .catch((_err)=>{
             alert('SERVER ERR')
         })
    },[])
    
    const handleLike=(productId)=>{
        let userId= localStorage.getItem('userId');
        console.log('userId',userId,'productId ',productId)
        const url='http://localhost:8080/like-product'
        const data ={userId,productId}
        axios.post(url,data)
        .then((res)=>{
            console.log(res) ;
            if(res.data.message){
             alert('You have successfully liked the product');
             //navigate('/');
            }
         })
         .catch((err)=>{
             alert('SERVER ERR')
         })
        }
    //  Assuming a route pattern like /posts/:postId is matched by /posts/123 then params.postId will be "123".
    const handleAddtoCart=()=>{
      if(!localStorage.getItem('token')){
        navigate('/login') 
      return}
        const pid=p.productId;
        console.log(swap);
       
        const userId=localStorage.getItem('userId');
        axios
            .get("http://localhost:8080/add-to-cart", {
              params: {
                pid,
                userId
              }})
        
        .then((res)=>{
            if(res.data.message){
                alert(res.data.message);
                navigate('/cart');
            }
         })
         .catch((_err)=>{
             alert('SERVER ERR')
         })
         if(swap){
            axios.post("http://localhost:8080/add-to-swap",  {
                  pid
                }
                
            )
            .then((res)=>{
                if(res.data.message){
                    alert(res.data.message);
                    navigate('/cart');
                }
             })
             .catch((_err)=>{
                 alert('SERVER ERR')
             })
        }
    }
    return(
    <div> 
    <Header/> 
    <div>
    {
    product && <div className="product-details" >
    <div>
        <img className="product-details-image" width="300px" height="300px" src={'http://localhost:8080/'+product.pimage} alt="product image"/>
    </div>
    <div className="everything"> 
    <h3 className="product-details-name"> {product.pname} </h3> 
    <p className="product-details-price" > Rs.{product.price}/-  <FaHeart className="icons2" onClick={()=>handleLike(product._id)}/></p>
                    <br/><div className="line3"></div>
                    <p className="product-details-category">Category : {product.category}<br/><br/> Subcategory : {product.category}</p>
                    <p className="product-details-description" >Description : {product.pdesc}</p> 
                    <p></p> 
                    {/* { if(product.userid!=localStorage.getItem('userId')){
                    {product.swap&&(<label className="swap2"> {/*<input className="swap2" type="checkbox">*/ }
                    {/* Would You like to swap and trade for this product? */}
                     {/* </input><input type="checkbox" value="swap" onChange={()=>{setswap(!swap); }}/></label>)}
                     <button className="add-to-cart" onClick={()=>{handleAddtoCart()}}>ADD TO CART</button> <img className='cart-pic' ></img>}} */}
{product.userId !== localStorage.getItem("userId") && (
  <>
    {product.swap && (
      <label className="swap2">
        Would you like to swap and trade for this product?
        <input 
          type="checkbox" 
          value="swap" 
          onChange={() => setswap(!swap)} 
        />
      </label>
    )}
    
    <button className="add-to-cart" onClick={handleAddtoCart}>
      ADD TO CART
    </button>
    
    {/* <img className="cart-pic" alt="Cart Icon" /> */}
  </>
)}

    </div> 
   
    </div>
   } 
    </div>
   {/* <button onClick={()=>{handleAddtoCart()}}>ADD TO CART</button> */}
    </div>
   

    )
}
export default ProductDetails;