import './Header.css'
import final_logo_processed from './Images/final_logo_processed.png'
import { Link, useNavigate} from 'react-router-dom'
import cart from './Images/cart.png'

function Header(){
    const navigate = useNavigate()
    const handleAdd=()=>{
        if(!localStorage.getItem('token')){
            navigate('/login')
        }
        else{
            navigate('/add-product')
        }
    }
    const handleCart=()=>{
        if(!localStorage.getItem('token')){
            navigate('/login')
        }
        else{
            navigate('/cart')
        }
    }
    return(<>
        <div className="header"><Link to="/"><img src={final_logo_processed} alt="Uni-Cart Logo" height="90px" width="170px" padding="10px"/> </Link><p className='logo'></p>
        <div className='links'>
        <Link to="/" className='nav-link'>Home</Link>
        <Link to="/catalogue" className='nav-link'>Catalogue</Link>
        
        {!localStorage.getItem('token')?
        <Link to="/login" className='nav-link'>Login </Link>:
        <Link to="/profile" className='nav-link'>Profile</Link>}
        <img  className='cart-icon' src={cart} width='40px' height='40px'onClick={handleCart}/>
        
        </div>
        
        <button onClick={handleAdd}>+Add Items</button>
        </div>
        </>
    )
}
export default Header;