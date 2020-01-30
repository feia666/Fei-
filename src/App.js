import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import NamePicker from './namePicker';
import {db, useDB} from './db';
import { BrowserRouter, Route } from 'react-router-dom';
import Camera from 'react-snap-pic';
import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import {MdCameraAlt} from 'react-icons/md';




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
  const[showCamera, setShowCamera] = useState(false)
  
  async function takePicture(img) {
    setShowCamera(false)
    const imgID = Math.random().toString(36).substring(7)
    var storageRef = firebase.storage().ref()
    var ref = storageRef.child(imgID + '.jpg')
    await ref.putString(img, 'data_url')
    db.send({ 
      img: imgID, name, ts: new Date(), room 
    })
  }
    return ( <main>

    {showCamera && <Camera takePicture={takePicture} />}  

        <header>
            <img className= "logo" alt="logo"
                src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Android_O_Preview_Logo.png"/>
               chaaat
          <NamePicker onSave={setName}/>
        </header>



      <div className="messages">
        {messages.map((m,i)=><Message key={i} m={m} name={name}/>
         
         )}
      </div>

          <TextInput 
          showCamera={()=>setShowCamera(true)}
          onSend= {(text) =>{
            db.send({
            text,name, ts:new Date(), room
          })
        }}/> 
        
    </main>)
 
 const bucket = 'https://firebasestorage.googleapis.com/v0/b/chaaat-6205d.appspot.com/o/'
 const suffix = '.jpg?alt=media'
 
function Message({m, name}){
  return <div className="message-wrap" from={m.name===name? 'you':'me'}>
  <div className="message">
    <div className="msg-name">{m.name}</div>
    <div className="msg-text">{m.text}
    {m.img && <img src={bucket + m.img + suffix} alt="pic" />}
    </div>

  </div>
</div>
  
}
  function TextInput(props) {
    const [text, setText] = useState('')
    return (
        <div className="text-input"> 
           <button className="camera" 
              onClick={props.showCamera}
             style={{position:'absolute', left:2, top:10}}>
            <MdCameraAlt style={{height:15, width:15}} />
          </button>
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