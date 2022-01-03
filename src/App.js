import React, {useEffect, useState} from 'react'
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import Pusher from 'pusher-js'
import axios from './axios'

function App() {
  const [messages, setMessages] =  useState([])

  useEffect(() => {
    axios.get("/message/sync").then((response) => {
      setMessages(response.data)
    });
  }, []);

  useEffect(() => {
    var pusher = new Pusher('8d23acba2970b26074c1', {
      cluster: 'eu'
    });

    var channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) => {
      // alert(JSON.stringify(newMessage));
      setMessages([...messages,newMessage])
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages])

  console.log(messages)

  return (
    <div className="app">
      <div className="app_body" >
        <Sidebar />
        <Chat messages={messages}/>
      </div>
    </div>
  );
}

export default App;
