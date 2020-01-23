import React, {useState, useRef, useEffect} from  'react';
import {MdEdit} from 'react-icons/md';
import {MdSave} from 'react-icons/md';

function NamePicker(props){ 
    const [name, setName] = useState('')
    const[showName, setShowName]= useState (false) 
    const inputEl = useRef(null)

    function save(){
        inputEl.current.focus()
        if(name && !showName) {
          props.onSave(name)
          localStorage.setItem('name',name)
        }
        setShowName(!showName)
      }
      
      useEffect(()=>{
        const n = localStorage.getItem('name')
        if(n) {
          setName(n)
          save() 
        }
      }, [])
    
    return(
    <div className="edit-nameInput">
        <input value={name} ref={inputEl}
            className="nameInput"
            style={{display: showName ? 'none' : 'flex'}}
            onChange={e=> setName(e.target.value)}
            onKeyPress={e=> {
                if(e.key==='Enter') save()
              }}
            />
        
        {showName && <div>{name}</div>}

        <button onClick={save} className="name-button">
         {showName ?  <MdEdit /> : 'ok'}
         </button>
           
        
        
    </div>)

}
export default NamePicker