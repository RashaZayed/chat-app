import React, { useState, useEffect } from "react";
import 'socket.io-client'
import io from "socket.io-client";
import '@material-ui/core'
import { TextField } from '@material-ui/core';

import "./App.css";

const socket = io.connect("http://localhost:4000");

function App() {
  const [state, setState] = useState({ message: "", name: "" }); //current message and name
  const [chat, setChat] = useState([]); //array of all names and their messages

  useEffect(()=> {
    socket.on('message' , ({name , message}) => {
      console.log(chat)
      setChat([...chat, {name , message} ] ) 
    });
    // console.log(chat)
    
   
  })

  const onTextChange = (e)=> {
    setState({ ...state, [e.target.name]: e.target.value} );


  }
  const onMessageSubmit = (e) =>{
    e.preventDefault();
    const {name , message} = state;
    socket.emit('message' , {name , message})
    setState({message: "" , name})
  }

  const renderChat = ()=> {
    return chat.map(({name , message}, i)=> {
      return (
        <div key={i}>
          <h3>{name}: <span>{message}</span></h3>



        </div>
      
     ) })
  }
  return (
    <div className="card">
      <form onSubmit={onMessageSubmit}>
        <h1>Massenger</h1>
        <div className="name-field">
          <TextField
            name="name"
            onChange={(e) => onTextChange(e)}
            value={state.name}
            label="Name"
          />
        </div>
        <div>
          <TextField
            name="message"
            variant="outlined"
            id="outlined-multiling-static"
            onChange={(e) => onTextChange(e)}
            value={state.message}
            label="Message"
          />
        </div>
        <button>Send Message</button>
      </form>
      <div className="render-chat">
        <h1>Chat Log</h1>
        {renderChat()}
      </div>
    </div>
  );
}

export default App;
