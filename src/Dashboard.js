import React,{useState,useEffect,useContext} from 'react';
import './Dashboard.css';
import {useSelector} from "react-redux";
import {Link,useNavigate } from 'react-router-dom';
import { UserContext } from './App';


const Dashboard = () => {
  const {state,dispatch} = useContext(UserContext)
  const [selectedImage, setSelectedImage] = useState();
  const [userdetails,setUserDetails] = useState("");
  const [userPostCount,setUserPostCount] = useState("");
  const State = useSelector(state=> state.changeFollowers)
  const navigate = useNavigate();
  const userPosts = async() => {
    try {
      const res = await fetch("user-post",{
        method:"GET",
        headers:{
        Accept:"application/json",
        "Content-Type":"application/json"
        },
        credentials:"include"
        });
      const data = await res.json();
      setUserPostCount(data);
      
    } catch (error) {
      console.log(error);
    }

  }
  const userLogout = async() => {
    try {
      const res = await fetch("logout",{
        method:"GET",
        headers:{
        Accept:"application/json",
        "Content-Type":"application/json"
        },
        credentials:"include"
        });
        dispatch({type:"USER",payload:false});
        navigate("/login");
      
    } catch (error) {
      console.log(error);
    }

  }
  const userDashboard = async() => {
    try {
      const res = await fetch("dashboard",{
        method:"GET",
        headers:{
        Accept:"application/json",
        "Content-Type":"application/json"
        },
        credentials:"include"
        });
        const data = await res.json();
        setUserDetails(data);
        data.profileImage = "http://localhost:5000/static/uploads/" + data.profileImage;
        setSelectedImage(data.profileImage);
        
        console.log(selectedImage);
        console.log(data.profileImage)
        if (!res.status === 200) {
          const error = new Error(res.error);
          throw error;
          
        } else {
          
        }
      
    } catch (error) {
      console.log(error);
      navigate("/login");
    }

  }
  useEffect(()=>{
    userDashboard();
  },[])
  return (
    <div className='dashboardPage'>
      <div className='dashboard'>
        <div className='dashboard-profile-image'>
          <img src={selectedImage}/>
        </div>
        <div className='dashboard-user-details'>
          <div className='username'>
            <h3>{userdetails.username}</h3>
            <div className='btn'>
              <button><Link to="/edit-profile">Edit profile</Link></button>
            </div>

          </div>
         
          <div className='user-icons'>
            <div className='posts'>
              <span>{userPostCount}</span>
              <span>posts</span>
                
            </div>
            <div className='followers'>
            <span>followers</span>

            </div>
            <div className='following'>
            <span>{State} </span>
            <span>following</span>
              
            </div>

          </div>
          <div className='user-name'>
          <h3>{userdetails.name}</h3>
          </div>
          <div className='user-bio'>
              <p>{userdetails.bio}</p>
          </div>
          <div className='logout-btn'>
            <button onClick={userLogout}>Logout</button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Dashboard