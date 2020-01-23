import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import NamePicker from './namePicker'
import {db} from './db';


function App() {
  const[message, setMessages]=useState([])
  const[name, setName]=useState('')

  useEffect(()=>{
    db.listen({
      receive: m=> 
      setMessages(current=>[m, ...current])
    },
    )}, [])

    return ( <main>
        <header>
            <img className= "logo" alt="logo"
                src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Android_O_Preview_Logo.png"/>
               chaaat
          <NamePicker onSave={setName}/>
        </header>
        <div className="msg-group">
          
            {message.map((m,i)=>{
            return<div key={i} className="message" >{m.text} </div>
          })}
          </div>
          <TextInput onSend= {(text) =>{
           db.send({
            text,name, ts:new Date(),
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