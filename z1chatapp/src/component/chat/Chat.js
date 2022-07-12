import React,{useEffect, useState} from 'react'
import {user} from "../join/Join"
import socketIO from "socket.io-client";
import "./Chat.css"
import sendlogo from "../../images/send.png"
import Message from "../Message/Message"
import ReactScrollToBottom from "react-scroll-to-bottom";
import closeIcon from "../../images/closeIcon.png"

let socket;


const ENDPOINT="http://localhost:4500/";

const Chat = () => {
    const [id, setid] = useState("")

    const [messages, setmessages] = useState([])


    const send=()=>{
        const message=document.getElementById('chatInput').value;
        socket.emit('message',{message,id});
        document.getElementById('chatInput').value="";
    }

   
    useEffect(() => {
         socket =socketIO(ENDPOINT,{transports:['websocket']} )
        socket.on("connect",()=>{
         alert("connected");
         setid(socket.id);
        })

        socket.emit('joined',{user})
        socket.on('welcome',(data)=>{
            setmessages([...messages,data])
            console.log(data.user,data.message);
        })

        socket.on('user joined',(data)=>{
            setmessages([...messages,data])
            console.log(data.user, data.message);
        })

        socket.on('leave',(data)=>{
            setmessages([...messages,data])
            console.log(data.user, data.message);
        })
      
        return () => {
            socket.emit("disconnect1")
            socket.off();
          
        }
      }, [])

    useEffect(() => {
        socket.on('sendmessage',(data)=>{
            setmessages([...messages,data])
            console.log(data.user, data.message,data.id);
        })
    
      return () => {
        socket.off()
      }
    }, [messages])
    

  return (
    <div className="chatPage">
        <div className="chatContianer">
        <div className="header">
            <h2>ZChat</h2>
           <a href="/"><img src={closeIcon} alt="Close"/></a> 
        </div>
        <ReactScrollToBottom className="chatBox">
            {messages.map((item,i) => <Message user={item.id===id?'':item.user} message={item.message}  classs={item.id===id?'right':'left'}/>)}
        </ReactScrollToBottom>
        <div className="inputBox">
            <input type="text" id="chatInput"/>
            <button onClick={send} className="sendbtn" ><img src={sendlogo}alt="Send"/></button>
        </div>
        </div>
    </div>
  )
}

export default Chat