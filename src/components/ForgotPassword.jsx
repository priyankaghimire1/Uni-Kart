
// import { Link, useNavigate } from 'react-router-dom';
// import { useState } from 'react';
// import axios from 'axios';
// import './Login.css';
// import logo from './Images/final_logo_processed.png';
// import login from './Images/loginimage.png';

// function ForgotPassword() {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState('');
//   const [error, setError] = useState('');
//   const [verificationCode, setVerificationCode] = useState('');
//   const [isVerifying, setIsVerifying] = useState(false);
//   const [message, setMessage] = useState('');

//   const emailRegex = /^[a-z0-9]+@[a-z]+\.(?:ku\.edu\.np)$/i;

//   const handleApi = async () => {
//     setError('');
//     if (!username) {
//       setError('Please enter your email.');
//       return;
//     }
//     if (!emailRegex.test(username)) {
//       setError('Invalid email format. Please use your university email.');
//       return;
//     }

//     try {
//       const url = 'http://localhost:8000/forgot-password';
//       const res = await axios.post(url, { username });

//       if (res?.data?.Status === 'Success') {
//         alert(res.data.message);
//         setIsVerifying(true);
//       } else {
//         setError(res.data.message || 'Please check your credentials.');
//       }
//     } catch (err) {
//       setError('Server error. Please try again later.');
//     }
//   };

//   const handleVerification = async () => {
//     if (!verificationCode) {
//       setMessage('Please enter the verification code sent to your email.');
//       return;
//     }
//     try {
//       const res = await axios.post('http://localhost:8000/verify-otp', { username, verificationCode });
//       setMessage(res.data.message);
//       if (res.status === 200) {
//         navigate('/login');
//       }
//     } catch (err) {
//       setMessage('Invalid verification code. Please try again.');
//     }
//   };

//   return (
//     <>
//       <div className="App">
//         <div className="overlay"></div>

//         <div className="image-section">
//           <img src={logo} alt="Uni-Kart Logo" />
//         </div>

//         <div className="form">
//           <div className="image">
//             <img src={login} alt="Login Logo" />
//           </div>
//           <div className="form1">
//             <h1 className="heading1">
//               Welcome To Uni-Kart!
//               <br />
//               <span className="subheading">Your ideal marketplace for all second-hand treasures!</span>
//             </h1>

//             {!isVerifying ? (
//               <>
//                 <input
//                   type="text"
//                   placeholder="E-mail address"
//                   value={username}
//                   onChange={(e) => {
//                     setUsername(e.target.value);
//                     setError('');
//                   }}
//                 />
//                 <button className="login-button" onClick={handleApi}>
//                   SEND
//                 </button>
//               </>
//             ) : (
//               <>
//                 <label>Verification Code</label>
//                 <input
//                   type="text"
//                   value={verificationCode}
//                   onChange={(e) => setVerificationCode(e.target.value)}
//                 />
//                 <button className="login-button" onClick={handleVerification}>Verify Email</button>
//               </>
//             )}
//           </div>
//         </div>
//       </div>

//       <div>
//         {error && <p className="error-message">{error}</p>}
//         {message && <p className="success-message">{message}</p>}
//         <p className="paragraph">
//           New here? Create an account <Link to="/signup">here</Link>!
//         </p>
//       </div>
//     </>
//   );
// }

// export default ForgotPassword;
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import './ForgotPassword.css';
import logo from './Images/final_logo_processed.png';
import login from './Images/loginimage.png';

function ForgotPassword() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const emailRegex = /^[a-z0-9]+@[a-z]+\.(?:ku\.edu\.np)$/i;

  const handleApi = async () => {
    setError('');
    setMessage('');

    if (!username) {
      setError('Please enter your email.');
      return;
    }
    if (!emailRegex.test(username)) {
      setError('Invalid email format. Please use your university email.');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:8080/forgot-password', { username });

      if (res?.data?.Status === 'Success') {
        setMessage(res.data.message);
        setIsVerifying(true);
      } else {
        setError(res.data.message || 'Please check your credentials.');
      }
    } catch (err) {
      setError('Server error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerification = async () => {
    setError('');
    setMessage('');

    if (!verificationCode) {
      setError('Please enter the verification code sent to your email.');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:8080/verify-otp', { username, verificationCode });

      if (res.status === 200) {
        setMessage(res.data.message);
        setIsResetting(true);
      } else {
        setError('Invalid verification code. Please try again.');
      }
    } catch (err) {
      setError('Invalid verification code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setError('');
    setMessage('');

    if (!newPassword || !confirmPassword) {
      setError('Please fill in both password fields.');
      return;
    }
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:8080/reset-password', { username, newPassword });
      console.log("Response:", res); // Debugging
      if (res.status === 200) {
        setMessage('Password successfully reset. Redirecting to login...');
        setTimeout(() => navigate('/login'), 3000);
      } else {
        setError('Failed to reset password. Please try again.');
      }
    } catch (err) {
        console.error("Error response:", err.response); // Log full error response
      setError('Server error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="overlay"></div>

      <div className="image-section">
        <img src={logo} alt="Uni-Kart Logo" />
      </div>

      <div className="form">
        <div className="image">
          <img src={login} alt="Login Logo" />
        </div>
        <div className="form1">
          <h1 className="heading1">
            Please enter your e-mail id.
            <br />
            <span className="subheading">
              You will receive a code in following mail.
            </span>
          </h1>

          {!isVerifying && !isResetting && (
            <>
              <input
                type="text"
                placeholder="E-mail address"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError('');
                }}
              />
              <button className="login-button" onClick={handleApi} disabled={loading}>
                {loading ? 'Sending...' : 'Send'}
              </button>
            </>
          )}

          {isVerifying && !isResetting && (
            <>
              <label>Verification Code</label>
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
              <button className="login-button" onClick={handleVerification} disabled={loading}>
                {loading ? 'Verifying...' : 'Verify'}
              </button>
            </>
          )}

          {isResetting && (
            <>
              <label>New Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />

              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <button className="login-button" onClick={handleResetPassword} disabled={loading}>
                {loading ? 'Resetting...' : 'Reset'}
              </button>

              <div>
        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}
        {/* <p className="paragraph">
          New here? Create an account <Link to="/signup">here</Link>!
        </p> */}
      </div>
            </>
          )}
        </div>
      </div>

      
    </div>
  );
}

export default ForgotPassword;