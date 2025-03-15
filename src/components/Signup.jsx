import { Link } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";
import "./Signup.css"
import logo from "./Images/final_logo_processed.png"
import usePasswordToggle from '../hook/usePasswordToggle'; 
import { useNavigate } from 'react-router-dom';
import check from './Images/check.png'
import avatar1 from "./Images/avatar1.jpg"
import avatar2 from "./Images/avatar2.jpg"
import avatar3 from "./Images/avatar3.jpg"

function Signup() {
    const [username, setusername] = useState('');//initial value of variable types
    const [password, setpassword] = useState('');//initial value of variable types
    const [namee, setnamee]=useState('');
    const [verificationCode, setVerificationCode] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [number, setnumber]=useState('');
    const [image, setImage] = useState(null);
    const [PasswordInputType, ToggleIcon] = usePasswordToggle();
    const navigate = useNavigate();
    const [imageOption, setImageOption] = useState("preset");
    const [selectedImage, setSelectedImage] = useState(avatar1);
const [selectedPresetId, setSelectedPresetId] = useState("1");
const presetImages = [
  { src: avatar1, id: 1 },
  { src: avatar2, id: 2 },
  { src: avatar3, id: 3 },
];
  //   const signuppopup=()=>{
  //     document.querySelector('.signup-popup').classList.add('opensignuppopup')   
  // }
  //   const closesignuppopup=()=>{ 
  //     document.querySelector('.signup-popup').classList.remove('opensignuppopup') 
  //     navigate('/login'); //sending to login page
  // } 

    const handleSignup = async() => {
        setMessage("");
        let finalImage = imageOption === "preset" ? selectedPresetId : image;
        console.log(selectedPresetId);
        if (!username || !password) {
            setMessage("Please fill out all fields.");
            return;
          }
        const emailRegex= /^[a-z0-9]+@[a-z]+\.ku\.edu\.np$/;
        if (!emailRegex.test(username)) {
            setMessage("Email must be in the format name@domain.ku.edu.np.");
            return;}
        setLoading(true);
    try {
      let profilePicId;
      if (imageOption === "preset") {
      profilePicId=finalImage;// If preset, send id
      }
    // } else {
    //   profilePicId=finalImage; // If uploaded, send file
    // }
        const res = await axios.post("http://localhost:8080/signup", { username, password, namee, number, profilePicId });
        setLoading(false);
        setMessage(res.data.message);
        if (res.status === 200) {
          setIsVerifying(true);
        }
      } catch (err) {
        setLoading(false);
        setMessage("Error signing up. Please try again.");
      }
    };
    const handleVerification = async () => {
        if (!verificationCode) {
          setMessage("Please check the verification code send to your email.");
          return;
        }
        try {
          const res = await axios.post("http://localhost:8080/verify-email", { username, verificationCode });
          //setMessage(res.data.message);
          if (res.status === 200) {
            //signuppopup();
            navigate("/login");
          }
        } catch (err) {
          setMessage("Invalid verification code. Please try again.");
        }
      };
      const handlePresetImageSelection = (imgObj) => {
        setSelectedImage(imgObj.src);
        setSelectedPresetId(imgObj.id); // Store the corresponding ID
        setImage(null); // Clear uploaded image if a preset is chosen
      };

      const handleBlur = () => {
        if (!/^\d{10}$/.test(number)) { 
          console.log("Invalid input:", number);
          setMessage("Phone number must be exactly 10 digits.");
        } else {
          setMessage("");
        }
      };

      const handlePassword = () => {
        if (!/^\d{6}$/.test(password)) { 
          console.log("Invalid input:", password);
          setMessage("Password must be of 6 digits.");
        } else {
          setMessage("");
        }
      };
    return<>
           
                <div className="image-section">
                    <img src={logo} alt="Uni-Cart Logo" />
                </div>
                
                
                    <h1 className='heading1'>Start your journey with Uni-Kart today!<br/></h1><div className='all'>
                      <h2 className='subheading1'>{isVerifying ? "Verify Your Email" : "Please fill out your credentials."}</h2><div class="line2"></div>
                    {message && <p className="message">{message}</p>}
                    {isVerifying ? (
                    <>
                        <label>Verification Code</label>
                            <input
                            type="text"
                        value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                        />
                 <button className='signupbutton' onClick={handleVerification}>Verify Email</button>

                 {/* <div className='signup-popup' id='popup1'>
                                     <img src={check} width='100px' height='100px'/>
                                     <h2>Happy Shopping!</h2>
                                     <p>Redirecting to Login...</p>
                                     <button type='button2' onClick={closesignuppopup}>OK</button>
                                    </div> */}
            </>
          ) :(<><div>
                        <label className='signuplabel'>Username</label>
                        <input className='signupinput' placeholder='Enter your username' type="text" value={namee}
                            onChange={(e) => {
                                setnamee(e.target.value)
                            }} />
                    </div>

                       <label className='signuplabel'>Phone Number</label>
                       <input className='signupinputphone' placeholder='Enter your phone number' type="text" value={number}
                            onBlur={handleBlur} // Validate on losing focus
                            maxLength={10} // Hard limit of 10 characters
                            minLength={10}
                            onChange={(e) => {
                                setnumber(e.target.value)
                            }} />
                    <div>
                        <label className='signuplabel'>Email</label>
                        <input className='signupinput' placeholder='Enter your email address' type="text" value={username}
                            onChange={(e) => {
                                setusername(e.target.value)
                            }} />
                    </div>
                    <div>
                      <div className='password-container'>
                        <label className='signuplabel'>Password</label>
                        <input className='signupinput' type={PasswordInputType} placeholder='Enter a password' value={password} onBlur={handlePassword}
                            onChange={(e) => {
                                setpassword(e.target.value)
                            }} />
                            {/* <span className='password-toggle-icon1'>{ToggleIcon}</span> */}
                       </div>
                    </div>
                    <div>
                            <label className='signuplabel'>Profile Picture</label>
                            {/* <input className='signupinput' type="file" accept="image/*"
                                onChange={(e) => setImage(e.target.files[0])} /> */}
                            {/* Toggle between preset images and file upload */}
  {/* <div className="image-selection">
    <input
      type="radio"
      id="preset"
      name="imageOption"
      value="preset"
      checked={imageOption === "preset"}
      onChange={() => setImageOption("preset")}
    />
    <label htmlFor="preset">Choose from preset images</label>
    <input
      type="radio"
      id="upload"
      name="imageOption"
      value="upload"
      checked={imageOption === "upload"}
      onChange={() => setImageOption("upload")}
    />
    <label htmlFor="upload">Upload your own image</label>
  </div> */}
  {/* If user chooses preset images */}
  {/* {imageOption === "preset" && ( */}
    <div className="preset-images"> 
      {presetImages.map((imgObj) => (
        <img
        width='200px'
        key={imgObj.id}
        src={imgObj.src}
        alt={`Preset ${imgObj.id}`}
        className={`preset-image ${selectedImage === imgObj.src ? "selected" : ""}`}
          onClick={() => handlePresetImageSelection(imgObj)}
        />
      ))}
    </div>
  {/* )} */}
  {/* If user chooses to upload their own image */}
  {/* {imageOption === "upload" && (
    <input
      className='signupinput'
      type="file"
      accept="image/*"
      onChange={(e) => setImage(e.target.files[0])}
    />
  )}     */}
                        </div>
                        <button className='signupbutton'onClick={handleSignup} disabled={loading || message}>{loading ? "Signing Up..." : "Sign Up"}</button>
                    {!isVerifying && (
                    <p className='signupparagraph'>
                        Already Have An Account? Login <Link to="/login">here</Link>.
                    </p>)}
                
            </>
          )}</div>
          </>
    
    
}
export default Signup;

// import { Link } from 'react-router-dom';
// import { useState } from "react";
// import axios from "axios";
// import "./Signup.css"
// import logo from "./Images/final_logo_processed.png"
// import avatar1 from "./Images/avatar1.jpg"
// import avatar2 from "./Images/avatar2.jpg"
// import avatar3 from "./Images/avatar3.jpg"
// import { useNavigate } from 'react-router-dom';
// function Signup() {
//     const [username, setusername] = useState('');//initial value of variable types
//     const [password, setpassword] = useState('');//initial value of variable types
//     const [namee, setnamee]=useState('');
//     const [verificationCode, setVerificationCode] = useState("");
//     const [isVerifying, setIsVerifying] = useState(false);
//     const [image, setImage] = useState(null);
//     const [message, setMessage] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [number, setnumber]=useState('');
//     const [imageOption, setImageOption] = useState("preset"); // Default to preset images
// //const [selectedImage, setSelectedImage] = useState(avatar1);
// const [selectedPresetId, setSelectedPresetId] = useState(null); // To store the selected preset ID
// const presetImages = [

//   { src: avatar1, id: 1 },
//   { src: avatar2, id: 2 },
//   { src: avatar3, id: 3 },
// ];
//     const navigate = useNavigate();
//     const handleSignup = async() => {
//         setMessage("");
//         //let finalImage = imageOption === "preset" ? selectedPresetId : image; // Choose preset image or uploaded file
//         //console.log("Final image before submission:", finalImage); // Debugging line
//         if (!username || !password || !selectedPresetId) {
//           setMessage("Please fill out all fields and select or upload an image.");
//           return;
//       }
//         const emailRegex= /^[a-z0-9]+@[a-z]+\.ku\.edu\.np$/;
//         if (!emailRegex.test(username)) {
//             setMessage("Email must be in the format name@domain.ku.edu.np.");
//             return;}
//         setLoading(true);

//         const formData = new FormData();
//         formData.append("username", username);
//         formData.append("password", password);
//         formData.append("namee", namee);
//         formData.append("number", number);
//         // Append the correct image (preset or uploaded)
// //     if (imageOption === "preset") {
// //       formData.append("profilePicId", finalImage); // If preset, send id
// //   } else {
// //       formData.append("profilePic", finalImage); // If uploaded, send file
// //   }
// //   for (let [key, value] of formData.entries()) {
// //     console.log(`${key}:`, value);
// // }
// formData.append("profilePicId", selectedPresetId); // Only preset images

//     try {
//         const res = await axios.post("http://localhost:8080/signup",formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//       });
//         setLoading(false);
//         setMessage(res.data.message);
//         if (res.status === 200) {
//           setIsVerifying(true);
//         }
//       } catch (err) {
//         setLoading(false);
//         setMessage("Error signing up. Please try again.");
//       }
//     };
//     const handleVerification = async () => {
//         if (!verificationCode) {
//           setMessage("Please enter the verification code sent to your email.");
//           return;
//         }
//         try {
//           const res = await axios.post("http://localhost:8080/verify-email", { username, verificationCode });
//           setMessage(res.data.message);
//           if (res.status === 200) {
//             navigate("/login");
//           }
//         } catch (err) {
//           setMessage("Invalid verification code. Please try again.");
//         }
//       };
//       // const handlePresetImageSelection = (imgObj) => {
//       //   setSelectedImage(imgObj.src);
//       //   setSelectedPresetId(imgObj.id); // Store the corresponding ID
//       //   setImage(null); // Clear uploaded image if a preset is chosen
//       // };
//       const handleBlur = () => {
//         if (!/^\d+(\.\d+)?$/.test(number) && number.length !== 10) {
//           setMessage("Phone number must be exactly 10 digits.");
//         } else {
//           setMessage("");
//         }
//       };
    
//     return<>
           
//                 <div className="image-section">
//                     <img src={logo} alt="Uni-Cart Logo" />
//                 </div>
                
                
//                     <h1 className='heading1'>Start your journey with Uni-Kart today!<br/></h1><div className='all'>
//                       <h2 className='subheading1'>{isVerifying ? "Verify Your Email" : "Please fill out your credentials."}</h2><br/><br/>
//                     {message && <p className="message">{message}</p>}
//                     {isVerifying ? (
//                     <>
//                         <label>Verification Code</label>
//                             <input
//                             type="text"
//                         value={verificationCode}
//                             onChange={(e) => setVerificationCode(e.target.value)}
//                         />
//                  <button onClick={handleVerification}>Verify Email</button>
//             </>
//           ) :(<><div>
//                         <label className='signuplabel'>Username</label>
//                         <input className='signupinput' placeholder='Enter your username' type="text" value={namee}
//                             onChange={(e) => {
//                                 setnamee(e.target.value)
//                             }} />
//                     </div>

//                        <label className='signuplabel'>Phone Number</label>
//                        <input className='signupinputphone' placeholder='Enter your phone number' type="text" value={number}
//                             onBlur={handleBlur} // Validate on losing focus
//                             maxLength={10} // Hard limit of 10 characters
//                             minLength={10}
//                             onChange={(e) => {
//                                 setnumber(e.target.value)
//                             }} />
//                     <div>
//                         <label className='signuplabel'>Email</label>
//                         <input className='signupinput' placeholder='Enter your email address' type="text" value={username}
//                             onChange={(e) => {
//                                 setusername(e.target.value)
//                             }} />
//                     </div>
//                     <div>
//                         <label className='signuplabel'>Password</label>
//                         <input className='signupinput' placeholder='Enter a password' type="password" value={password}
//                             onChange={(e) => {
//                                 setpassword(e.target.value)
//                             }} />
                       
//                     </div>
//                     <div>
//                             <label className='signuplabel'>Profile Picture</label>
//                             {/* <input className='signupinput' type="file" accept="image/*"
//                                 onChange={(e) => setImage(e.target.files[0])} /> */}

//                             {/* Toggle between preset images and file upload */}
//                             <div className="preset-images">
//                                 {presetImages.map((imgObj) => (
//                                     <img
//                                         key={imgObj.id}
//                                         src={imgObj.src}
//                                         alt={`Preset ${imgObj.id}`}
//                                         className={`preset-image ${selectedPresetId === imgObj.id ? "selected" : ""}`}
//                                         onClick={() => setSelectedPresetId(imgObj.id)}
//                                     />
//                                 ))}
//                             </div>
//                         </div>

//                     <button className='signupbutton'onClick={handleSignup} disabled={loading || message}>{loading ? "Signing Up..." : "Sign Up"}</button>
//                     {!isVerifying && (
//                     <p className='signupparagraph'>
//                         Already Have An Account? Login <Link to="/login">here</Link>.
//                     </p>)}
                
//             </>
//           )}</div>
//           </>
    
    
// }
// export default Signup;