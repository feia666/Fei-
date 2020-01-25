import {useState, useEffect} from 'react'
import * as firebase from "firebase/app"
import "firebase/firestore"
import "firebase/storage"

let store
const coll = 'messages'

function useDB(room) {
    const [messages, setMessages] = useState([])
    function add(m) {
        setMessages(current => {
            const msgs = [m, ...current]
            msgs.sort((a,b)=> b.ts.seconds - a.ts.seconds)
            return msgs
        })
    }
    function remove(id) {
        setMessages(current=> current.filter(m=> m.id!==id))
    }
    useEffect(() => {
        store.collection(coll)
        .where('room','==',room)
        .onSnapshot(snap=> snap.docChanges().forEach(c=> {
            const {doc, type} = c
            if (type==='added') add({...doc.data(),id:doc.id})
            if (type==='removed') remove(doc.id)
        }))
    }, [])
    return messages
}

const db = {}
db.send = function(msg) {
    return store.collection(coll).add(msg)
}
db.delete = function(id) {
    return store.collection(coll).doc(id).delete()
}

export { db, useDB }

const firebaseConfig = {
    apiKey: "AIzaSyBwHU4UUQMv5RAnXa5YUK4v2GkeGqjIbx4",
    authDomain: "chaaat-6205d.firebaseapp.com",
    databaseURL: "https://chaaat-6205d.firebaseio.com",
    projectId: "chaaat-6205d",
    storageBucket: "chaaat-6205d.appspot.com",
    messagingSenderId: "873746141394",
    appId: "1:873746141394:web:4f74b2b591412c2cf21d0b",
    measurementId: "G-MSBJDNXNVT"
}

firebase.initializeApp(firebaseConfig)
store = firebase.firestore()