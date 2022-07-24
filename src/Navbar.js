import React,{useContext} from 'react';
import './Navbar.css';
import {Link } from 'react-router-dom';
import { UserContext } from './App';

export const Navbar = () => {
  const {state,dispatch} = useContext(UserContext)
  
  const RenderMenu = () =>  {
    if (state) {
      return(<>
          <li><Link to="/"><i className="fa fa-solid fa-house"></i></Link></li>
          <li><Link to="/message"><i className="fa fa-regular fa-paper-plane"></i></Link></li>
          <li><Link to="/posts"><i className="fa-regular fa-square-plus"></i></Link></li>
          <li><Link to="/dashboard"><i class="fa-regular fa-circle-user"></i></Link></li>
          <li><Link to="/login">Log In</Link></li>
          <li><Link to="/signup">Sign Up</Link></li>
      </>)
    } else {
     return( <>
          <li><Link to="/"><i className="fa fa-solid fa-house"></i></Link></li>
          <li><Link to="/message"><i className="fa fa-regular fa-paper-plane"></i></Link></li>
          <li><Link to="/posts"><i className="fa-regular fa-square-plus"></i></Link></li>
          <li><Link to="/dashboard"><i class="fa-regular fa-circle-user"></i></Link></li>
          <li><Link to="/login">Log In</Link></li>
          <li><Link to="/signup">Sign Up</Link></li>
      </>)
      
    }
  }

  return (
    <>
    <nav>
      <div className='nav-logo'>
        <h1>ShareMemories</h1>
      </div>
      <div className='nav-searchbar'>
        <input type="text" name='search' placeholder='Search'/>
      </div>
      <div className='nav-links'>
        <ul>
          <RenderMenu/>
        </ul>
       
      </div>


    </nav>
    </>
  )
}
