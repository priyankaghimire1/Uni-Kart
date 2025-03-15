import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import './Display.css';
function Display(){
    const navigate=useNavigate();
    const[products, setproducts] =useState([]);
    useEffect(()=>{
        const url='http://localhost:8080/get-products'
        axios.get(url)
        .then((res)=>{
            if(res.data.products){
             setproducts(res.data.products);//array of products
            }
         })
         .catch((err)=>{
            console.log(err)
         })
    },[])
    const navigation=()=>{
        navigate('/catalogue')
    }
    const handleLike=(productId)=>{
        let userId= localStorage.getItem('userId');
        console.log('userId',userId,'productId ',productId)
        const url='http://localhost:8080/like-product'
        const data ={userId,productId}
        axios.post(url,data)
        .then((res)=>{
            console.log(res) ;
            if(res.data.message){
             alert('You have successfully liked the product')
             navigate('/')
            }
         })
         .catch((err)=>{
             alert('SERVER ERR')
         })
        }
    const handleProduct = (productId) =>{
        console.log(productId);
        navigate('/product/'+productId);
    }
return<>
{/*     
        {(isVisible)? (
            <>
            <div className="card">
            {cproducts&& products.length>0 &&
                cproducts.slice(resultPage*1-1,resultPage*1).map((item,index)=>{
                    return(
                    <div  key={item._id} className="display">
                    <div onClick={()=>handleLike(item._id)} className="icon-con"> 
                        <FaHeart className="icons"/> 
                    </div>
                    <img width="300px" height ="300px" src={'http://localhost:8080/'+ item.pimage}alt={item.pname}/>
                    <p> {item.pname} | {item.category}</p> 
                    <h3> Rs. {item.price}</h3>
                    <p> {item.pdesc}</p> </div>
                )})}</div>
                {
                    cproducts.length>0 && <div className="pagination">
                        <span onClick={()=>selectresultpagehandler(resultPage-1) } className={resultPage > 1 ? "" : "pagination__disable"}>👈</span>
                        {
                            [...Array(Math.ceil(cproducts.length/1))].map((_,i)=>{
                                return <span  className={resultPage === i + 1 ? "pagination__selected" : ""} onClick={()=>selectresultpagehandler(i+1)} key={i}>
                                    {i+1}
                                </span>
                               
                            })
                        }
                        <span onClick={()=>selectresultpagehandler(resultPage+1) }className={resultPage < Math.ceil(cproducts.length / 1) ? "" : "pagination__disable"}>👉</span>
                        </div>
            }
        </>
        ):
        <>
        <div className="card">
        {products&& products.length>0 &&
        products.slice(page*1-1,page*1).map((item,index)=>{
                return(
                <div key={item._id} className="display">
                <div onClick={()=>handleLike(item._id)} className="icon-con"> 
                        <FaHeart className="icons"/> 
                    </div>
                <img width="300px" height ="300px" src={'http://localhost:8080/'+ item.pimage}/>
                <p> {item.pname} | {item.category}</p> 
                <h3> Rs. {item.price}</h3>
                <p> {item.pdesc}</p> </div>
            )})}</div>
        {
                products.length>0 && <div className="pagination">
                    <span onClick={()=>selectPageHandler(page-1) } className={page > 1 ? "" : "pagination__disable"}>👈</span>
                    {
                        [...Array(Math.ceil(products.length/1))].map((_,i)=>{
                            return <span  className={page === i + 1 ? "pagination__selected" : ""} onClick={()=>selectPageHandler(i+1)} key={i}>
                                {i+1}
                            </span>
                           
                        })
                    }
                    <span onClick={()=>selectPageHandler(page+1) }className={page < Math.ceil(products.length / 1) ? "" : "pagination__disable"}>👉</span>
                    </div>
                    
        }
    </>
    } */}
    <div className="card1">
    {products && products.length > 0 &&
           products.map((item, index) => {
             if (index < 5) { // Ensure only the first two items are displayed
               return (
                 <div key={item._id} className="display1">
                    <div className="icon-conn"> 
                    <img
                    className="product-image1"
                     width="300px"
                     height="300px"
                     src={'http://localhost:8080/' + item.pimage}
                     alt={item.pname}
                   />
                        
                    </div>
                  
                   <p className="product-name1" onClick={() => handleProduct(item._id)}>{item.pname} | {item.category}</p>
                   <p className="product-price1">Rs. {item.price}</p><FaHeart className="icons1"  onClick={()=>handleLike(item._id)}/> 
                   {/* <p>{item.pdesc}</p>  */}
                 </div>
               );
             }
             return null; // Skip rendering items beyond the first two
           })}<img className="view-all"  onClick={() => navigation()}/>
           </div>
        {/* {products&& products.length>0 &&
        products .slice((page - 1) * itemsPerPage, page * itemsPerPage).map((item,index)=>{
                return(
                <div key={item._id} className="display" onClick={() => handleProduct(item._id)}>
                <div onClick={()=>handleLike(item._id)} className="icon-con"> 
                        <FaHeart className="icons"/> 
                    </div>
                <img width="300px" height ="300px" src={'http://localhost:8080/'+ item.pimage}/>
                <p> {item.pname} | {item.category}</p> 
                <h3> Rs. {item.price}</h3>
                <p> {item.pdesc}</p> </div>
            )})}</div>
       <Pagination
            totalItems={products.length}
            itemsPerPage={itemsPerPage}
            currentPage={page}
            onPageChange={selectPageHandler}
       /> */}

    </>}
export default Display;