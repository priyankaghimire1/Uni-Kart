import Header from "./Header";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import './WishList.css';
import { Link } from "react-router-dom";

function WishList(props){
    const navigate=useNavigate();
    const[products, setproducts] =useState([]);
    const[page,setPage]=useState(1);
    useEffect(()=>{
        const url='http://localhost:8080/liked-products'
        let data={userId: localStorage.getItem('userId')}
        axios.post(url,data)
        .then((res)=>{
            //console.log(res) ;
            if(res.data.products){
             setproducts(res.data.products);//array of products
             //setTotalpages(res.data.products.length);
             //console.log(res.data.products);
            }
         })
         .catch((err)=>{
            // console.log(err)
             alert('SERVER ERR')
         })
    },[])
    const handleDislike=()=>{
        
    }
    const selectPageHandler=(selectedPage)=>{
        if (selectedPage >= 1 && selectedPage <= Math.ceil(products.length / 1) && selectedPage !== page) {
            setPage(selectedPage);
            console.log(page);
          }
    };
    const handleProduct = (id) =>{
        navigate('/product/'+ id )
  }
    return <>
         {(props.wishlist)? (
        <>
        <div className="profile-card">
        <div className="nested-cards">
        {products && products.length > 0 &&
          products.map((item, index) => {
          
            if (index < 3) { // Ensure only the first two items are displayed
              return (
               <div className="nested-cards">
               
               <div className="nested-card">
                   <div className="nested-card" key={item._id}>
                   <img
                     width="300px"
                     height="300px"
                    src={'http://localhost:8080/' + item.pimage}
                  alt={item.pname}
               />
                   </div>
               </div>
           </div>
              );
            }
          })}
     
      <div className="nested-card">
             <Link to="/wishlist" className="view-link">All products</Link>
             <span className="arrow">➜</span>
         </div>
         </div>
         </div>
      </>
    
        ):
<>
<div className="wishlist-card">
            {products&& products.length>0 &&
            products.slice(page*1-1,page*1).map((item,index)=>{
                    return(
                    <div key={item._id} className="wishlist-display"onClick={() => handleProduct(item._id)}>
                    <img width="300px" height ="300px" src={'http://localhost:8080/'+ item.pimage}/>
                    <p> {item.pname} | {item.category}</p> 
                    <h3> Rs. {item.price}</h3>
                    <p> {item.pdesc}</p> 
                    </div>

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

}
</>
}
export default WishList;