import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import NamePicker from './namePicker';
import {db, useDB} from './db';
import { BrowserRouter, Route } from 'react-router-dom';

// import { MdRoom } from 'react-icons/md';


function App(){
  useEffect(()=>{
    const {pathname} = window.location
    if(pathname.length<2) window.location.pathname='home'
  }, [])
  return <BrowserRouter>
    <Route path="/:room" component={Room}/>
  </BrowserRouter>
}

function Room(props) {
  const {room} =props.match.params
  const[name, setName]=useState('')
  const messages = useDB(room)

    return ( <main>
        <header>
            <img className= "logo" alt="logo"
                src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Android_O_Preview_Logo.png"/>
               chaaat
          <NamePicker onSave={setName}/>
        </header>

      <div className="messages">
        {messages.map((m,i)=>{
          return <div key={i} className="message-wrap" from={m.name===name? 'you':'me'}>
            <div className="message">
              <div className="msg-name">{m.name}</div>
              <div className="msg-text">{m.text}</div>
            </div>
          </div>
        })}
      </div>
          <TextInput onSend= {(text) =>{
           db.send({
            text,name, ts:new Date(), room
          })
        }}/> 
        
    </main>)
 


  function TextInput(props) {
    const [text, setText] = useState('')
    return (
        <div className="text-input"> 
          <input className="input-box" 
            value={text}
            placeholder="  hi there" 
            onChange={e=> setText(e.target.value)}
            onKeyPress={e=> {
              if(e.key==='Enter') props.onSend(text) }}
            />

          <button className="button" onClick={() => {if(text)
            props.onSend(text) 
            setText('')}}
            disabled={!text}>

          <img className= "arrow" alt="arrow"
          src="https://image.flaticon.com/icons/svg/25/25649.svg"></img>
          
          </button>
        </div>)
  }
}

export default App;