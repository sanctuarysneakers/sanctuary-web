import React, { useState } from 'react'
import firebase from '../../services/firebase.js'

export default function Login() {
    // TODO: Change these initial values to empty strings LOL
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const loginEmailPassword = () => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(r => alert("This user has uid: " + r.user.uid))
            .catch(e => alert(e));
    }

    const loginGoogle = () => {
        const provider = firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithPopup(provider);
    }

    return (
        <div className='login'>
            <div>
                Some Nice graphic with be here
            </div>
            <button onClick={loginEmailPassword}>
                Login
            </button>
            <input
                className="inputBox"
                placeholder="Enter Email"
                value={email}
                onChange={event => setEmail(event.target.value)}
            />
            <input
                className="inputBox"
                placeholder="Enter Password"
                value={password}
                onChange={event => setPassword(event.target.value)}
            />
            {/* <button onClick={loginGoogle}style={{display: 'flex', margin: '50px auto 50px auto', fontSize: '30px'}}>Sign In With Google</button> */}
        </div>
    )
}
