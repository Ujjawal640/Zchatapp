import React, { useState } from 'react';
import {
    
    Link
  } from "react-router-dom";
  import "./Join.css";




let user;
const sendUser=()=>{
  user=document.getElementById('joinInupt').value;
  console.log(user);
  document.getElementById('joinInupt').value = " ";
  

}


  
const Join = () => {
    

 
    const [name,setname]=useState("");
 
   

 

  return (
    <div className="JoinPage">
        <div className="JoinContainer">
        <h1>ZChat</h1>
        <input  onChange={(e)=>setname(e.target.value)}       placeholder="Enter your Name" type="text" id="joinInupt"/>
        <Link    onClick={(event)=> !name? event.preventDefault(): null}      to="/Chat"> <button  onClick={sendUser} className="joinbtn">Log in </button></Link>
         
       
        </div>
    </div>
  )
}

export default Join
export {user}