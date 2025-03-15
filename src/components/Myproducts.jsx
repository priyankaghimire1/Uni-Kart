import Header from "./Header";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './WishList.css';

function Myproducts(props){
    const navigate=useNavigate();
    const [products, setProducts] = useState([]);
    const [buyer, setbuyer]=useState([]);
    const[page,setPage]=useState(1);
    const [display, setdisplay]=useState(false);
    useEffect(()=>{
      if (props.pid){
        setdisplay(true);
      }
      if(!props.pid){
        setdisplay(false);
      }
        const url='http://localhost:8080/my-items';
        const data={userId: localStorage.getItem('userId')}
        axios.post(url, data)
        .then((res)=>{
            if(res.data.myItems){
             setProducts(res.data.myItems);
             setbuyer(res.data.buyers);//array of products
            }
         })
         .catch((err)=>{
            console.log(err)
             //alert('SERVER ERR')
         })
    },[])
    const selectPageHandler=(selectedPage)=>{
      if (selectedPage >= 1 && selectedPage <= Math.ceil(products.length / 1) && selectedPage !== page) {
          setPage(selectedPage);
          console.log(page);
        }
  };
    const acceptSwap=(pid)=>{
      console.log(pid);
      const url='http://localhost:8080/update-swap';
        const data={swapid: pid, userId: localStorage.getItem('userId'), pid: props.pid}
        axios.post(url, data)
        .then((res)=>{
            navigate('/my-orders');
         })
         .catch((err)=>{
            console.log(err)
             alert('SERVER ERR')
         })
    }
    const confirmSwap=(id, swapid)=>{
      const url='http://localhost:8080/seller-confirmation';
        const data={pid: id, swapid: swapid}
        axios.post(url, data)
        .then((res)=>{
            navigate('/');
         })
         .catch((err)=>{
            console.log(err)
             alert('SERVER ERR')
         })
    }
    const rejectSwap=(id)=>{
      const url='http://localhost:8080/seller-rejection';
        const data={pid: id}
        axios.post(url, data)
        .then((res)=>{
            navigate('/');
         })
         .catch((err)=>{
            console.log(err)
             alert('SERVER ERR')
         })
    }
    
return<>
         {(props.profile)? (
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
                //  <div key={item._id} className="display">
                //    <img
                //      width="300px"
                //      height="300px"
                //      src={'http://localhost:8080/' + item.pimage}
                //      alt={item.pname}
                //    />
                //    <p>{item.pname} | {item.category}</p>
                //    <h3>Rs. {item.price}</h3>
                //    {item.isSold&&(
                //     <p>Item Sold</p>
                //    )}
                //    {!item.isSold&& item.isSwapaccepted &&(<p>Swap interested</p>)}
                //    {/* <Link to={`/product-edit/${item._id}`}>Edit</Link> */}
                //  </div>
               );
             }
            
            //  return null; // Skip rendering items beyond the first two
           })}
            <><div className="nested-card">
              <Link to="/my-products" className="view-link">All products</Link>
              <span className="arrow">➜</span>
          </div>
          </>
       </div>
       </div>
       </>
    
        ):
<>
<div className="wishlist-card">
            {products&& products.length>0 &&
            products.slice(page*1-1,page*1).map((item,index)=>{
              console.log(item.swapproduct);
              const matchingBuyer = buyer.find(buyer => buyer._id === item.buyer);
                    return(
                    <div key={item._id} className="wishlist-display">
                    <img width="300px" height ="300px" src={'http://localhost:8080/'+ item.pimage}/>
                    <p> {item.pname} | {item.category}</p> 
                    <h3> Rs. {item.price}</h3>
                    <p> {item.pdesc}</p>
                    {(!item.isSold || !item.isSwapaccepted) && (<Link to={`/product-edit/${item._id}`}>Edit</Link>)} 
                    {display&& !item.isSold&&  (<button onClick={()=>acceptSwap(item._id)}>Select</button>)}
                    {matchingBuyer && item.isSwapaccepted && !item.isSold&&(
                      <>
                      <p>Buyer: {matchingBuyer.name}</p>
                      <p>Contact: {matchingBuyer.number}</p>
                      <Link to={`/product/${item.swapproduct}`}>Product</Link>
                      <p>Do you accept?</p>
                      <button onClick={()=>confirmSwap(item._id, item.swapproduct)}>Accept</button>
                      <button onClick={()=>rejectSwap(item._id)}>Reject</button>
                    </>
                    )}
                    {matchingBuyer && item.isSwapaccepted && item.isSold&&(
                      <>
                      <p>Buyer: {matchingBuyer.name}</p>
                      <p>Contact: {matchingBuyer.number}</p>
                      <Link to={`/product/${item.swapproduct}`}>Product</Link>
                      <p>Sold</p>
                    </>
                    )}
                    {matchingBuyer && item.isSold && !item.isSwapaccepted&&(
                        <>
                          <p>Buyer: {matchingBuyer.name}</p>
                          <p>Contact: {matchingBuyer.number}</p>
                          <p>Sold</p>
                        </>
                    )}
                   
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
export default Myproducts;