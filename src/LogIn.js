import React,{useState,useEffect,useContext} from 'react'
import './LogIn.css';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './App';

const LogIn = () => {
  const {state,dispatch} = useContext(UserContext)
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  let navigate = useNavigate();
  const sendData = async(e)=>{
    e.preventDefault();
   
    try {
        const res = await fetch("login",{
        method:"POST",
        headers:{
        "Accept":"application/json",
        "Content-Type":"application/json"
        },
        body: JSON.stringify({
        email:email,password:password
        })
        });
        const data = await res.json();
        if(!data){
          window.alert("Invalid Credentials. Pls try again later.")
        }
        else{
          dispatch({type:"USER",payload:true});
          navigate('/dashboard');
          
        }
      } 
    catch (error) {
    console.log(error)
    
    }

}
    

  return (
    <>
    <div className='LogIn-form'>
      <div className="signin-form">
          <form method="POST">
              <h1>Log In to your Account</h1>
              <input type="text" name="email" placeholder="Enter your email address" value={email} onChange={(e) => setEmail(e.target.value)}/>
              <input type="password" name="password" className="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
              <div className="forgotPassword">
                  <a href="/forgot-password">Forgot Password</a>
              </div>
              <div className="signin">
                  <a href="http://localhost:5000/google" className="signin-google"><i className="fa fa-brands fa-google"></i></a>
                  <a href="http://localhost:5000/auth/facebook" className="signin-facebook"><i className="fa fa-brands fa-facebook"></i>  </a>
                  <a href="http://localhost:5000/auth/twitter" className="signin-twitter"><i className="fa fa-brands fa-twitter"></i> </a>
                  <a href="http://localhost:5000/github" className="signin-github"><i className="fa fa-brands fa-github"></i></a>
              </div>
              <button onClick={()=>sendData()}>Log In</button>
              <h3>Don't have an account?<Link to="/signup"> Sign Up</Link></h3>
          </form>
      </div>
    </div>
    </>
  )
}

export default LogIn