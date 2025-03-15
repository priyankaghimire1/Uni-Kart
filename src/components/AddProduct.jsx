import { useEffect } from "react";
import{ useNavigate, Link } from 'react-router-dom';
import Header from "./Header";
import { useState } from "react";
import axios from "axios";
import './AddProduct.css'
import Categories from "./CategoriesList";
function AddProduct(){
    const navigate= useNavigate();
    const[pname,setpname]=useState(' ');
    const[pdesc,setpdesc]=useState(' ');
    const[price,setprice]=useState(' ');
    const [mainCategory, setMainCategory] = useState("");
    const [subCategory, setSubCategory] = useState("");
    const [swap, setswap] = useState(false);
    const[pimage,setpimage]=useState(' ');
    const [message, setMessage]=useState("");
    const url='http://localhost:8080/add-product';
    useEffect(()=>{
        if(!localStorage.getItem('token')){
            navigate('/login') 
        }
    },[])
    const handleMainCategoryChange = (category) => {
      setMainCategory(category);
      //setSubCategory(""); 
      console.log(category);
    }
    

    const handleApi=()=>{
        const formData= new FormData();
        formData.append('pname',pname)
        formData.append('pdesc',pdesc)
        formData.append('price',price)
        formData.append('category',mainCategory)
        formData.append('subCategory',subCategory)
        formData.append('pimage',pimage) 
        formData.append('swap', swap) 
        formData.append('userId',localStorage.getItem('userId'))
        axios.post(url,formData)
        .then((res) => {
            console.log(res)
            if(res.data.message){
                alert(res.data.message);
                navigate('/')
            }
        })
        .catch((err)=>{
            console.log(err);
            alert("Please fill out all of the important details.");
        })
    }
    const handleBlur = () => {
      if (!/^\d+(.\d+)?$/.test(price)) {
        setMessage("Price must be numeric value.");
      } else {
        setMessage("");
      }
    };
    return <>
        <div>
            <Header />
            <div className="p-3"> 
              
            <h2 class="add-items-heading">ADD ITEMS</h2>
            <div class="line"></div>
            <br/>
            {message && <p className="message">{message}</p>}

            <div className="form-group">
            <label>Name of the product</label>
            <input className="form-control" type="text" value={pname} placeholder='Important'
            onChange={(e)=>{
                setpname(e.target.value)
            }} /><br/>
            </div>
           
           <div className="form-group-2">
            <label>Price</label>
            <input className="form-control" type="text" inputMode="numeric" value={price} onBlur={handleBlur} placeholder="Important"
             onChange={(e)=>{
                setprice(e.target.value)
            }}
            /><br/>
            </div>

            <div className="form-group-3">
            <label>Product Description</label>
            <input className="form-control" type="text" value={pdesc}
              onChange={(e)=>{
                setpdesc(e.target.value)
            }}
             /><br/>
            </div>
 
            <br/>
            <label>Select Categories:</label>
            <div>
            <div className="main" style={{ marginLeft: "0px", marginTop: "5px" }}>
              {Object.keys(Categories).map((category) => (
                <div key={category}>
                  <label>
                    <input
                      type="radio"
                      name="mainCategory"
                      checked={mainCategory === category}
                      onChange={() => handleMainCategoryChange(category)}
                    />
                    {category}
                  </label>

                  
                  
                    <div style={{ marginLeft: "30px", marginTop: "5px" }}>
                      {Categories[category].map((sub) => (
                        <label key={sub} style={{ display: "block", margin: "5px 0" }}>
                          <input
                            type="radio"
                            name="subCategory"
                            checked={subCategory === sub}
                            onChange={() => {
                              setSubCategory(sub);
                              console.log(sub);
                              handleMainCategoryChange(category);
                            }}
                          />
                          {sub}
                        </label>
                      ))}
                    </div>
                </div>
              ))}
            </div>


            <div>
          
          <div className="all1">
          
          <label  ><input type="checkbox" value="swap" onChange={()=>{setswap(!swap); }}/>Would you like to keep your items for swap and trade?</label><br/>
         
            <input className="form-control" type="file"
             onChange={(e)=>{
              //setpimage(e.target.files[0])
              const file = e.target.files[0];
  if (file) {
    const maxSize = 25 * 1024 * 1024; // 25MB in bytes
    if (file.size > maxSize) {
      alert("File size exceeds 25MB. Please choose a smaller file.");
    } else {
      setpimage(file);
    }
  }
          }}
            />
        
        <button onClick ={handleApi} disabled={message} className="btn btn-primary mt-3">ADD</button>
        </div>   
        </div>     
            
          
           
        </div>
      </div>
      </div>
    </>
}
export default AddProduct;