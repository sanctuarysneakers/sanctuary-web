import React, {useState} from 'react'
import firebase from '../../services/firebase.js'

export default function LoginSignUp() {
    // TODO: Change these initial values to empty strings LOL
    const [email, setEmail] = useState('s.shahid@mail.utoronto.ca')
    const [password, setPassword] = useState('ILoveAvery')

    const signUpEmailPassword = () => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(r => alert("This user has uid: " + r.user.uid))
            .catch(e => alert(e));
    }

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
        <button onClick={loginEmailPassword} style={{display: 'flex', margin: '50px auto 50px auto', fontSize: '30px'}}>Sign In</button>
        // <button onClick={loginGoogle}style={{display: 'flex', margin: '50px auto 50px auto', fontSize: '30px'}}>Sign In With Google</button>
    )
}
