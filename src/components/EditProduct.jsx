import Header from "./Header";
import { useEffect } from "react";
import{ useNavigate, Link , useParams} from 'react-router-dom';
import { useState } from "react";
import axios from "axios";
import './AddProduct.css'
import Categories from "./CategoriesList";
function EditProduct(){
    const navigate= useNavigate();
    const[pname,setpname]=useState('');
    const[pdesc,setpdesc]=useState('');
    const[price,setprice]=useState('');
    const [mainCategory, setMainCategory] = useState("");
    const [subCategory, setSubCategory] = useState("");
    const [swap, setswap] = useState(false);
    const [image, setImage] = useState(null);
    const[pimage,setpimage]=useState('');
    const [product, setProduct]=useState();
    const p= useParams();
    useEffect(()=>{
        if(!localStorage.getItem('token')){
            navigate('/login') 
        }
        const url= 'http://localhost:8080/get-product/'+ p.productid;
        axios.get(url)
        .then((res)=>{
            if (res.data.product){
                setProduct(res.data.product);
                const product=res.data.product;
                console.log(res.data.product);
                setpname(product.pname);
                setpdesc(product.pdesc);
                setprice(product.price);
                setMainCategory(product.category);
                setSubCategory(product.subCategory);
                setImage(product.pimage);
                setswap(product.swap);
            }
        })
        
    },[])
    const handleMainCategoryChange = (category) => {
      setMainCategory(category);
      //setSubCategory(""); 
      console.log(category);
    }
    

    const handleApi=()=>{
        const url='http://localhost:8080/edit-product';
        console.log(image);
        const pid= p.productid;
        const formData= new FormData();
        formData.append('pid', pid)
        formData.append('pname',pname)
        formData.append('pdesc',pdesc)
        formData.append('price',price)
        formData.append('category',mainCategory)
        formData.append('subCategory',subCategory)
        formData.append('pimage',pimage) 
        formData.append('swap', swap) 
        formData.append('userId', localStorage.getItem('userId'))
        console.log(formData.entries);
        axios.post(url,formData)
        .then((res) => {
            console.log(res)
            if(res.data.message){
                alert(res.data.message);
                navigate('/')
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    const deleteItem=(id)=>{
        console.log(id);
        const url='http://localhost:8080/delete-product';
        const userId= localStorage.getItem('userId');
        const data={pid: id, userId: userId};
        axios.post(url, data)
        .then((res) => {
          if(res.data.message){
              alert(res.data.message);
              navigate('/my-products');
          }
      })
      .catch((err)=>{
          console.log(err)
      })

    }
    return <>
         <div>
            <Header />
            <div className="p-3"> 
              
            <h2 class="add-items-heading">EDIT ITEMS</h2>
            <div class="line"></div>
            <br/>

            <div className="form-group">
            <label>Name of the product</label>
            <input className="form-control" type="text" value={pname}
            onChange={(e)=>{
                setpname(e.target.value)
            }} /><br/>
            </div>
           
           <div className="form-group-2">
            <label>Price</label>
            <input className="form-control" type="text" inputMode="numeric" value={price}
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
          
          <label ><input type="checkbox" checked={swap} onChange={()=>{setswap(!swap); }}/>Would you like to keep your items for swap and trade?</label><br/>
         
            <input className="form-control" type="file"
             onChange={(e)=>{
                setpimage(e.target.files[0])
            }}
            /><br/>
           <img
                     width="100px"
                     height="100px"
                     src={'http://localhost:8080/' + image}
                     alt={pname}
                   />
                <br/>
        
        <button onClick ={handleApi} className="btn-primary mt-3">Change</button><br/><br/>
        <button onClick={()=>{deleteItem(p.productid)}} className="btn-primary mt-3-delete">DELETE</button>
        </div>   
        </div>     
            
          
           
        </div>
      </div>
      </div>
    </>
}
export default EditProduct;