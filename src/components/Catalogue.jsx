import { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import Categories from "./CategoriesList";
import './Catalogue.css';
import Search from './Images/Search.png';
import items from './Images/items.png';
import Pagination from "./Pagination";
import { useParams } from "react-router-dom";
function Catalogue(){
  const navigate= useNavigate();
  const[search, setsearch] =useState([]);
  const [mainCategory, setMainCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [isApply, setisApply]= useState(false);
  const[issearch, setissearch] =useState(false);
  const[cproducts, setcproducts] =useState([]);
  const[products, setproducts]=useState([]);
  const[page,setPage]=useState(1);
  const [resultPage, setresultpage]=useState(1); 
  const [count, setCount] = useState(0);
  const [swap, setswap] = useState(false);
  const [render, setRender]=useState(1);
  const itemsPerPage = 7;
  const p= useParams();
  console.log(p.category);
  const handlesearch = (value) => {
        setsearch(value);
    };
  useEffect(() => {
       // if (mainCategory.length > 0 || subCategory.length > 0) {
        if (p.category){
          setMainCategory((prev) => [...prev, p.category]);
          setRender(2);
          setisApply(true);
        }
          axios
            .get("http://localhost:8080/apply", {
              params: {
                mainCategory,
                subCategory,
                swap
              },
            })
            .then((res) => {
              setproducts(res.data.products);
              setRender(1);
            })
            .catch(() => {
              alert("SERVER ERR");
            });
        }
, [count, p.category, render]);
  const handleApply=()=>{
        setissearch(false);
        setisApply(true);
        setCount(count + 1);
      }
  const handleClick=()=>{
        const url='http://localhost:8080/search?search=' + search;
        axios.get(url)
        .then((res)=>{
            setcproducts(res.data.products);
            setissearch(true);
            setisApply(false);
         })
         .catch((_err)=>{
             alert('SERVER ERR')
         })}
  const handleMainChange = (event) => {
          const { value, checked } = event.target;
          console.log(value);
      
          if (checked) {
            setsearch([]);
            // Add the value to the array if checked
            setMainCategory((prev) => [...prev, value]);
          } else {
            // Remove the value from the array if unchecked
            setMainCategory((prev) => prev.filter((item) => item !== value));
          }
        };
  const handleSubChange = (event) => {
          const { value, checked } = event.target;
      
          if (checked) {
            setsearch([]);
            // Add the value to the array if checked
            setSubCategory((prev) => [...prev, value]);
          } else {
            // Remove the value from the array if unchecked
            setSubCategory((prev) => prev.filter((item) => item !== value));
          }
        };
  const handleProduct = (id) =>{
          navigate('/product/'+ id )
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
                }
             })
             .catch((err)=>{
                 alert('SERVER ERR')
             })
           }
           const selectPageHandler = (selectedPage) => {
            setPage(selectedPage);
          };
          
          const selectapplyPageHandler = (selectedPage) => {
            setresultpage(selectedPage);
          };
      
    return <>
    <Header/>
    <div className='title'> 
     <img className="title-img" src={items} alt="Items Logo" /><div className="top">
      {/* <div class="line"></div> */}
      WHAT ARE YOU LOOKING FOR TODAY?
      {/* <div class="line1"></div> */}
      </div>
     
     </div>
     
    <div className="search">
    <img src={Search} alt="Search Logo" height="40px" width="40px" />
    <input type='text' value={search} onChange={(e)=>handlesearch(e.target.value)}/>
     <button className="searchbutton" onClick={handleClick}>Search</button> 
    </div>
     
    <div>
      <div className="filter">
       <label className="insidefilter">  Filters </label> 
       <label className="swapbutton"><input type="checkbox" value="swap" onChange={()=>{setswap(!swap); }}/>Swap and Trade Items</label>
       <button className='hello' onClick={handleApply}>Apply</button> <br/></div><br/> 
        <div className="main">
              {Object.keys(Categories).map((category) => (
                <div key={category}>
                  <label>
                    <input
                      type="checkbox"
                      name="mainCategory"
                      value={category}
                      onChange={handleMainChange}
                    />
                    {category}
                  </label>

                  
                  
                    <div style={{ marginLeft: "20px", marginTop: "5px" }}>
                      {Categories[category].map((sub) => (
                        <label key={sub} style={{ display: "block", margin: "5px 0" }}>
                          <input
                            type="checkbox"
                            name="subCategory"
                            value={sub}
                            onChange={handleSubChange}
                          />
                          {sub}
                        </label>
                      ))}
                    </div>
                    
                </div>
              ))}<div></div>
            </div>
           
            </div>
    {issearch && cproducts && cproducts.length > 0 && (
    <><div className="card2" >
    {cproducts.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((item, index) => {
      return (
        
          <div className="display2" key={item._id}>
            {/* <div onClick={() => handleLike(item._id)} className="icon-con">
              <FaHeart className="icons" />
            </div>
            <img width="300px" height="300px" src={'http://localhost:8080/' + item.pimage} />
            <p>{item.pname} | {item.category}</p>
            <h3>Rs. {item.price}</h3>
            <p>{item.pdesc}</p> */}
            <div className="icon-conn2"> 
                    <img
                    className="product-image2"
                     width="300px"
                     height="300px"
                     src={'http://localhost:8080/' + item.pimage}
                     alt={item.pname}
                   />
                        
                    </div>
                  
                   <p className="product-name2" onClick={() => handleProduct(item._id)}>{item.pname}  |  {item.category}</p>
                   <p className="product-price2">Rs. {item.price}</p><FaHeart className="icons2"  onClick={()=>handleLike(item._id)}/> 
                   {/* <p>{item.pdesc}</p>  */}
          </div>
        
      );
    })}</div>
     <Pagination
          totalItems={cproducts.length}
          itemsPerPage={itemsPerPage}
          currentPage={page}
          onPageChange={selectPageHandler}
        />
    </>
    )}
    {isApply && products && products.length > 0 && (
    <><div className="card2" >
    {products .slice((resultPage - 1) * itemsPerPage, resultPage * itemsPerPage).map((item, index) => {
      return (
        
          <div className="display2" key={item._id}>
            {/* <div onClick={() => handleLike(item._id)} className="icon-con">
              <FaHeart className="icons" />
            </div>
            <img width="300px" height="300px" src={'http://localhost:8080/' + item.pimage} />
            <p>{item.pname} | {item.category}</p>
            <h3>Rs. {item.price}</h3>
            <p>{item.pdesc}</p> */}
               <div className="icon-conn2"> 
                    <img
                    className="product-image2"
                     width="300px"
                     height="300px"
                     src={'http://localhost:8080/' + item.pimage}
                     alt={item.pname}
                   />
                        
                    </div>
                  
                   <p className="product-name2" onClick={() => handleProduct(item._id)}>{item.pname}  |  {item.category}</p>
                   <p className="product-price2">Rs. {item.price}</p><FaHeart className="icons2"  onClick={()=>handleLike(item._id)}/> 
                   {/* <p>{item.pdesc}</p>  */}

          </div>
        
      );
    })}</div>
      
      <Pagination
          totalItems={products.length}
          itemsPerPage={itemsPerPage}
          currentPage={resultPage}
          onPageChange={selectapplyPageHandler}
        />
    </>
)}
    </>
}
export default Catalogue;