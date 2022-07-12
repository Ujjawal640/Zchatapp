const http=require("http");
const express=require("express");
const cors = require("cors");
const socketio=require("socket.io");

const app=express();

const port=4500 || process.env.PORT;

const server=http.createServer(app);
const users=[{}];

app.use(cors());

app.get("/",(req,res)=>{
    res.send("working");
})

const io=socketio(server);

io.on("connection",(socket)=>{
  console.log("new connection");  
  

  socket.on("joined",({user})=>{
         console.log(`${user} has joined`)
         users[socket.id]=user;
         console.log(`${user} has joined`);
         socket.broadcast.emit('user joined',{user:"Admin",message:`${users[socket.id]} has joined`});
         socket.emit('welcome',{user:"Admin",message:`welcome  to the chat ${users[socket.id]}`})
         socket.broadcast.emit('leave',{user:"Admin",message:`user left`});



  })

  
  socket.on('message',({message,id})=>{
    io.emit('sendmessage',{user:users[id],message,id})
  })

  socket.on('disconnect1',()=>{
    console.log("user left")
  })



})

server.listen(port,()=>{ 
    console.log(`http://localhost:${port } `);
})