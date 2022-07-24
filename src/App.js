import React, { createContext,useReducer } from 'react';
import './App.css';
import { Navbar } from './Navbar';
import { Route,Routes } from 'react-router-dom';
import LogIn from './LogIn';
import SignUp from './SignUp';
import Home from './Home';
import Message from './Message';
import Posts from './Posts';
import Dashboard from './Dashboard';
import {useSelector,useDispatch} from "react-redux";
import { initialState,reducer } from './Reducer/Usereducer';
import EditProfile from './EditProfile';
import CommentSection from './CommentSection';

export const UserContext = createContext();

function App() {

  const [state, dispatch] = useReducer(reducer, initialState);
  

  return (
    <>
    <UserContext.Provider value={{state,dispatch}}>
    <Navbar/>
    <Routes>
      <Route path="/"exact element={<Home/>}/>
      <Route path="/message"exact element={<Message/>}/>
      <Route path="/posts"exact element={<Posts/>}/>
      <Route path="/dashboard"exact element={<Dashboard/>}/>
      <Route path="/edit-profile"exact element={<EditProfile/>}/>
      <Route path="/comments"exact element={<CommentSection/>}/>
      <Route path="/login"exact element={<LogIn/>}/>
      <Route path="/signup"exact element={<SignUp/>}/>
    </Routes>
    </UserContext.Provider>
    </>
  );
}

export default App;
