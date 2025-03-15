import { useEffect, useId, useState } from "react";
import{ useNavigate, Link, data } from 'react-router-dom';
import Header from "./Header";
import axios from "axios";
import Categories from "./Categories";
import "./Home.css"
import { CiHeart } from "react-icons/ci";
import './Header.css'
import { IoIosAddCircleOutline } from "react-icons/io";
function LikedProducts(){
    const[products, setproducts] =useState([]);
    const[page,setPage]=useState(1);
    const[search, setsearch] =useState([]); 
    const[cproducts, setcproducts] =useState([]); //the list of the products is over-ridden every time so euta category ko products only are stored
    // useEffect(()=>{
    //     if(!localStorage.getItem('token')){
    //         navigate('/login') //if token is not there then 1st login then come to homepage
    //     }
    // },[]) //use effect with epmty array
    //with use effect homepage ma aaune bittikai products would be seen homepage or any other page where use effect is used the effect will be seen as the page loads

    useEffect(()=>{
        const url='http://localhost:8000/liked-products'
        let data={userId: localStorage.getItem('userId')}
        axios.post(url,data)
        .then((res)=>{
            if(res.data.products){
             setproducts(res.data.products);//array of products
             //setTotalpages(res.data.products.length);
            }
         })
         .catch((err)=>{
            // console.log(err)
             alert('SERVER ERR')
         })
    },[])
    const selectPageHandler=(selectedPage)=>{
        if (selectedPage >= 1 && selectedPage <= Math.ceil(products.length / 10) && selectedPage !== page) {
            setPage(selectedPage)
          }
    };



    const handlesearch=(value)=>{
        //console.log('hhh', value);
        setsearch(value);
    }
    const handleClick=()=>{
       // console.log('clicked');
       //console.log('products',products); //here we have the list of products now can find the one
        let filteredProducts=products.filter((item)=>{
            if(item.pname.toLowerCase().includes(String(search).toLowerCase())|| item.pdesc.toLowerCase().includes(String(search).toLowerCase())|| item.category.toLowerCase().includes(String(search).toLowerCase())){
                return item; //after the first step filtered products=item and setproducts(item ) works making the home look like a filtered search
            }
        })
       setcproducts(filteredProducts)
    }
    const handleCategory=(value)=>{
        //console.log(value)
        let filteredProducts=products.filter((item)=>{
            if( item.category.toLowerCase() ==(value.toLowerCase())){
                return item; //after the first step filtered products=item and setproducts(item ) works making the home look like a filtered search
            }
        })
       setcproducts(filteredProducts)
       

    }
    const handleLike=(productId)=>{
        let userId= localStorage.getItem('userId');
        console.log('userId',userId,'productId ',productId)
        const url='http://localhost:8000/like-product'
        const data ={userId,productId}
        axios.post(url,data)
        .then((res)=>{
            console.log(res) ;
            if(res.data.message){
             alert('You have successfully liked the product')
            }
         })
         .catch((err)=>{
            // console.log(err)
             alert('SERVER ERR')
         })
       }
    return (
        <div> 
            <Header search={search} handlesearch={handlesearch} handleClick={handleClick} />
            <h1> WELCOME to home...</h1>
            <Categories handleCategory={handleCategory} />
            {localStorage.getItem('token') &&<Link  to="/add-product"><button className="logout-btn mt-3 mb-3"> Add Product<IoIosAddCircleOutline className="icons"/></button> </Link>}
            {/* <h2>
                MY PRODUCTS:
            </h2> */}
            <h5>Search Result</h5>
            <div className="d-flex justify-content-center flex-wrap">
            {cproducts && products.length>0 &&
            cproducts.map((item,index)=>{
                return( 
                    <div key={item._id} className="card  m-3 "> 
                    <div onClick={()=>handleLike(item._id)} className="icon-con"> 
                        <CiHeart className="icons"/> 
                    </div>
                    
                {/* siuf whatever we type here will be shown on the homepage and we want to show the products on the homepage, if written within curlybraces then it is infact dynamic in nature*/}
                    <img width="300px" height ="300px" src={'http://localhost:8000/'+ item.pimage} alt={item.pname}/>
                    <p className="m-2"> {item.pname} | {item.category}</p> 
                    <h3 className="m-2 text-danger" > Rs. {item.price}</h3>
                    <p className="m-2 text-success" > {item.pdesc}</p> 
                     
                    
                    
                    </div>



                )
            })
            }
            
         </div>
         <h5> ALL RESULTS</h5>
            <div className="d-flex justify-content-center flex-wrap">
            {products && products.length>0 &&
            products.slice(page*10-10,page*10).map((item,index)=>{
                return( 
                    <div key={item._id} className="card  m-3 "> 
                    <div onClick={()=>handleLike(item._id)} className="icon-con">
                        {/* this gives the product id */}
                        <CiHeart className="icons"/> 
                    </div>
                   
                {/* siuf whatever we type here will be shown on the homepage and we want to show the products on the homepage, if written within curlybraces then it is infact dynamic in nature*/}
                    <img width="300px" height ="300px"  alt={item.pname}src={'http://localhost:8000/'+ item.pimage}/>
                    <p className="m-2"> {item.pname} | {item.category}</p> 
                    <h3 className="m-2 text-danger" > Rs. {item.price}</h3>
                    <p className="m-2 text-success" > {item.pdesc}</p> 
                     
                    
                    
                    </div>

/*here slice(0,2) slices the array to show from index 0 to 2-1 */

                )
            })
            }
         </div>
         {
            products.length>0 && <div className="pagination">
                <span onClick={()=>selectPageHandler(page-1) } className={page > 1 ? "" : "pagination__disable"}>👈</span>
                {
                    [...Array(Math.ceil(products.length/10))].map((_,i)=>{
                        return <span  className={page === i + 1 ? "pagination__selected" : ""} onClick={()=>selectPageHandler(i+1)} key={i}>
                            {i+1}
                        </span>
                       
                    })
                }
                <span onClick={()=>selectPageHandler(page+1) }className={page < Math.ceil(products.length / 10) ? "" : "pagination__disable"}>👉</span>
                </div>
         }
        </div>
    )
}
export default LikedProducts;//this when only one file to be imported if multiples then something else