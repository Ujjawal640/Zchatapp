/*import socketIO from "socket.io-client";*/
import './App.css';
import {BrowserRouter as Router ,Route,Routes} from "react-router-dom";
import Join from "./component/join/Join";
import Chat from "./component/chat/Chat";

/*
const ENDPOINT="http://localhost:4500/";
const socket =socketIO(ENDPOINT,{transports:['websocket']} )
*/
function App() {
  /*socket.on("connection",()=>{
        <Route exact path="/Chat"  component={Chat}/>onClick={sendUser}

  })*/
  return (
    
      <Router>
        
     
        <Routes>
        <Route exact path="/" element={<Join/>} />
        <Route  path="/Chat"  element={<Chat/>}/>
        </Routes>



       

      </Router>
    
  );
}

export default App;

