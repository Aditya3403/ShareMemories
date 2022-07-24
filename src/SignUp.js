import React,{useState} from 'react';
import './SignUp.css';
import {Link,useNavigate} from 'react-router-dom';


const SignUp = () => {
  const navigate = useNavigate();
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [continent,setContinent] = useState("");
    const [password,setPassword] = useState("");
    const sendData= async(e)=>{
        e.preventDefault();
        try {
            const res = await fetch("signup",{
            method:"POST",
            headers:{
            "Accept":"application/json",
            "Content-Type":"application/json"
            },
            body: JSON.stringify({
            name:name,email:email,continent:continent,password:password
            })
            });
            const data = await res.json();
            
            navigate('/login');
          } 
          catch (error) {
            console.log(error)
        
          }

  }
  return (
    <>
      <div className='signUp-form'>
        <form method="POST">
            <h1>Get yourself Registered!</h1>
            <p>Create your account. It's free and only takes few minutes.</p>
            <input type="text" name="name" placeholder="Enter your Username" value={name} onChange={(e) => setName(e.target.value)} required/>
            <input type="text" name="email" placeholder="Enter your Email ID" value={email} onChange={(e) => setEmail(e.target.value)} required/>
            <select name="continent" value={continent} onChange={(e) => setContinent(e.target.value)} required>
                <option value="" disabled selected hidden>Select your continent</option>
                <option value="Asia">Asia</option>
                <option value="Africa">Africa</option>
                <option value="Antartica">Antartica</option>
                <option value="Australia">Australia</option>
                <option value="Europe">Europe</option>
                <option value="NorthAmerica">North America</option>
                <option value="SouthAmerica">South America</option>
            </select>
            <input type="password" name="password" class="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
            <button onSubmit={sendData}>Sign Up</button>
            <h3>Already having an account?<Link to="/login"> Log In</Link></h3>
        </form>
      </div>
    </>
  )
}

export default SignUp;