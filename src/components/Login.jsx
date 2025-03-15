import { Link , useNavigate} from 'react-router-dom'
import { useState } from 'react';
import './Login.css';
import logo from './Images/final_logo_processed.png'
import login from './Images/loginimage.png'
import axios from "axios";
import usePasswordToggle from '../hook/usePasswordToggle';
import check from './Images/check.png'

function Login(){
  const navigate= useNavigate();
  const [message, setMessage] = useState("");
  const[username,setusername]=useState('');//initial value of variable types
  const[password,setpassword]=useState('');
  const [PasswordInputType, ToggleIcon] = usePasswordToggle();
   
  const openpopup=()=>{
    document.querySelector('.overlay').classList.add('showoverlay');  
    document.querySelector('.loginpopup').classList.add('open-loginpopup')   
}
  const closepopup=()=>{  
    document.querySelector('.loginpopup').classList.remove('open-loginpopup') 
    navigate('/'); //sending to home page
} 
const openfail=()=>{
    document.querySelector('.overlay').classList.add('showoverlay');  
    document.querySelector('.loginfail').classList.add('open-loginfail')   
}
  const closefail=()=>{
    document.querySelector('.overlay').classList.remove('showoverlay');  
    document.querySelector('.loginfail').classList.remove('open-loginfail')
}


  const handleApi =async()=>{
    const emailRegex= /^[a-z0-9]+@[a-z]+\.ku\.edu\.np$/;
    console.log(username);
    if (!emailRegex.test(username)) {
        //alert("wrong format");
        openfail();
    }

    else{
    const url='http://localhost:8080/login';
    const data={ username, password}
    axios.post(url,data)
    .then((res)=>{
       console.log(res.data) ;
       if(res.data.message)
       {
        if(res.data.token){
            localStorage.setItem('token',res.data.token)
            localStorage.setItem('userId',res.data.userId)
            openpopup();

        }
        else {
            setMessage(res.data.message || "Login failed. Please check your credentials.");
            openfail();
          }
        
        console.log(res.data.message);
        
       
       }
    
    })
    .catch((err)=>{
      console.log(err)
        alert('SERVER ERR')
    })}}

// const handleApi =async()=>{
//     setError(''); // Reset error message before new login attempt
//     const emailRegex= /^[a-z0-9]+@[a-z]+\.ku\.edu\.np$/;
//     console.log(username);
//     if (!username || !password) {
//         setMessage("All fields are required.");
//         return;
//       }
//     if (!emailRegex.test(username)) {
//         //alert("wrong format");
//         setMessage("Invalid email format. Please use your university email.");
//         openfail();
//     }
   
   
//     try {
//         const url = 'http://localhost:8080/login';
//         const data = { username, password };
//         const res = await axios.post(url, data);
  
//         if (res.data.token) {
//           localStorage.setItem('token', res.data.token);
//           localStorage.setItem('userId', res.data.userId);
//           openpopup();
//         } else {
//           setMessage(res.data.message || "Login failed. Please check your credentials.");
//           openfail();
//         }
//       } catch (err) {
//         setError("Server error. Please try again later.");
//       }
//     };

    return<>
    <div className='overlay'></div>
        <div className="App">
        
                <div className="image-section1">
                    <img src={logo} alt="Uni-Cart Logo" />
                </div>

                <div className='form'>
                    <div className='image'>
                    <img src={login} alt="login Logo" /></div>
                    <div className='form1'>
                    <h1 className='heading1'> Welcome To Uni-Kart!<br/><h8 className='subheading'>Your ideal marketplace for all second-hand treasures!</h8></h1>
                    {message && <p className="message">{message}</p>}
                    <div>
                        {/* <span>Email</span> */}
                        <input type="text" placeholder='e-mail address'value={username}
                            onChange={(e) => {
                                setusername(e.target.value)
                            }} />
                    </div>
                    <div>
                        <div className='password-container'>
                        <input className='input-field' type={PasswordInputType} placeholder='password' value={password} 
                            onChange={(e) => {
                                setMessage('') // Clear error on user input
                                setpassword(e.target.value)
                            }} />
                            <span className='password-toggle-icon'>{ToggleIcon}</span></div>

                    
                    <button className='login-button' onClick={async(e) => { handleApi();}}>
                   Login</button>
                   

                   <div className='loginpopup' id='popup'>
                    <img src={check} width='100px' height='100px'/>
                    <h2>Happy Shopping!</h2>
                    <p>Redirecting to Home page...</p>
                    <button type='button' onClick={closepopup}>OK</button>
                   </div>

                   <div className='loginfail' id='fail'>
                    <h2>Login failed!</h2>
                    <p>Please check your information.</p>
                    <button type='button' onClick={closefail}>OK</button>
                   </div>

                   
             </div>
        <p className='paragraph'>
        <p><Link to="/Forgot-password">Forgot Password?</Link></p>
                        New here? Create an account  <Link to="/signup">here</Link>!
                    </p>
                    </div>
                    
                </div>
            </div>
            
        </>
    
}
export default Login;