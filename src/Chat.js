import { Avatar, IconButton } from '@material-ui/core'
import { SearchOutlined, MoreVert, AttachFile } from '@material-ui/icons'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import MicIcon from '@material-ui/icons/Mic'
import React,{useState} from 'react'
import './Chat.css'
import axios from './axios'

const Chat = ({messages}) => {
    const [input, setInput] = useState("")

    const sendMessage = async (e) => {
        e.preventDefault()

        await axios.post("/message/new", {
                message : input,
                name : "Default ",
                timestamp : "Just now!",
                received : false
        });

        setInput("");
    };

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar />

                <div className="chat__headerInfo">
                    <h3>Room name</h3>
                    <p>Last seen at...</p>
                </div>
              
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className="chat__body">
                {messages.map((message) => (
                   
                    <p className={`chat_message ${message.received && "chat_receiver"} `}>
                    <span className="chat_name">{message.name}</span>
                        {message.message}
                    <span className="chat_timestamp">
                        {message.timestamp}
                    </span>
                    </p>
                    
                ))}

                {/* <p className="chat_message chat_receiver">
                    <span className="chat_name">Himesh</span>
                    This is a message
                    <span className="chat_timestamp">
                        {new Date().toUTCString()}
                    </span>
                </p> */}
            </div>

            <div className="chat_footer">
               <InsertEmoticonIcon/> 
               <form>
                   <input 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)} 
                    placeholder="Type a text message" 
                    type="text"/>
                   <button onClick={sendMessage} type="submit">Send a message</button>
               </form>
               <MicIcon />
            </div>
        </div>
    )
}

export default Chat
