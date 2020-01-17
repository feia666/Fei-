import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  //onClick={()=>{Props.onSend(text) setText('')}
  
  function TextInput(props) {
    const [text, setText] = useState('')
    return (
        <div className="text-input"> 
          <input className="input-box" 
            value={text}
            placeholder="  hi there" 
            onChange={e=> setText(e.target.value)}
            />

          <button className="button" onClick={() => setText('')}>
          <img className= "arrow" alt="arrow"
          src="https://image.flaticon.com/icons/svg/25/25649.svg"></img>
          </button>
        </div>)
  }

  return (
    <main>
        <header>
            <img className= "logo" alt="logo"
                src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Android_O_Preview_Logo.png"/>
               chaaat
        </header>
        <body>
          
          {TextInput()}
        </body>
    </main>)
}

export default App;