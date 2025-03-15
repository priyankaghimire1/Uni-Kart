import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './WishList.css';

function MyOrders(props){
  const navigate=useNavigate();
    const [products, setProducts] = useState([]);
    const [seller, setseller]=useState([]);
    const[page,setPage]=useState(1);
    useEffect(()=>{
        const url='http://localhost:8080/my-orders';
        const data={userId: localStorage.getItem('userId')}
        axios.post(url, data)
        .then((res)=>{
            //console.log(res) ;
            if(res.data.myOrders){
             setProducts(res.data.myOrders);
             setseller(res.data.users);//array of products
             //console.log(res.data.users);
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
    const handleCancel=(pid)=>{
      console.log(pid);
      const url='http://localhost:8080/my-orders-cancel';
        const data={productid: pid};
        axios.post(url, data)
        .then((res)=>{
            console.log(res) ;
            if(res.data.message){
             alert(res.data.message);
             navigate('/profile');//array of products
            }
         })
         .catch((err)=>{
            console.log(err)
             //alert('SERVER ERR')
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
               );
             }
             // Skip rendering items beyond the first two
           })}
          
      
       <div className="nested-card">
              <Link to="/my-orders" className="view-link">All products</Link>
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
                const matchingSeller = seller.find(seller => seller._id === item.userId);
                    return(
                    <div key={item._id} className="wishlist-display">
                    <img width="300px" height ="300px" src={'http://localhost:8080/'+ item.pimage}/>
                    <p> {item.pname} | {item.category}</p> 
                    <h3> Rs. {item.price}</h3>
                    <p> {item.pdesc}</p> 
                    {item.isSwapaccepted&&(<p>Swap and trade</p>)}
                    {matchingSeller && (
                        <>
                          <p>Seller: {matchingSeller.name}</p>
                          <p>Contact: {matchingSeller.number}</p>
                        </>
                    )}
                    {!item.isSold&&(<button onClick={()=>handleCancel(item._id)}>Cancel order</button>)}
                    {item.isSold&&(<p>Already bought</p>)}
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
export default MyOrders;