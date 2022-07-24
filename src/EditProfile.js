import React,{useEffect,useState} from 'react';
import './EditProfile.css';
import {useNavigate} from 'react-router-dom';

const EditProfile = () => {
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState();
    const [userdetails,setUserDetails] = useState("");
    const [bio,setBio] = useState("");
    const [email,setEmail] = useState();
    const [username,setUsername] = useState();
    const imageChange = (e) => {
      if (e.target.files && e.target.files.length > 0) {
        setSelectedImage(URL.createObjectURL(e.target.files[0]));
      }
    };
    const sendData= async(e)=>{
        e.preventDefault();
        try {
            const res = await fetch("edit-profile",{
            method:"POST",
            headers:{
            "Accept":"application/json",
            "Content-Type":"application/json"
            },
            body: JSON.stringify({
            bio:bio,email:email,username:username
            })
            });
            const data = await res.json();
            
            navigate('/edit-profile');
          } 
          catch (error) {
            console.log(error)
        
          }

  }
    const userDashboard = async() => {
        try {
          const res = await fetch("edit-profile",{
            method:"GET",
            headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
            },
            credentials:"include"
            });
            const data = await res.json();
            // console.log(data);
            setUserDetails(data);
            setEmail(data.email);
            setBio(data.bio);
            setUsername(data.username);
          
        } catch (error) {
          console.log(error);
        }
    
      }
      useEffect(()=>{
        userDashboard();
      },[])
      
  return (
    <div className='editProfilePage'>
        <div className='profilePage'>
            <div className='profilePage-profile-image'>
                <img src={selectedImage}/>
                <form action='upload-image' method='POST' encType="multipart/form-data">
                    <input type="file" name="userProfileImage" onChange={imageChange}/>
                    <input type="submit" id='input-submit' />
                </form>
            </div>
        </div>
        <div className='profilePage-userdetails'>
            <form method='POST'>
                <label for="name">Name</label>
                <input type="text" value={userdetails.name} name="name" disabled="true"/>
                <label for="name">Username</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}name="username"/>
                <label for="name">Email</label>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} name="email"></input>
                <label for="name">Bio</label>
                <textarea for = "bio" name='bio' value={bio} defaultValue={userdetails.bio} onChange={(e) => setBio(e.target.value)}></textarea>
                <button onSubmit={sendData}>Submit</button>
            </form>
        </div>
    </div>
  )
}

export default EditProfile;