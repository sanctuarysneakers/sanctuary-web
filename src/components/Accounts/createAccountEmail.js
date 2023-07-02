import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { hideHomeSearch, setUser } from '../../redux/actions'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebaseConfig'
import Footer from '../Other/footer'

export default function CreateAccountEmail () {
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const authenticateUser = async () => {
    setErrorMessage('')
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password)
      dispatch(setUser(user.user))
      document.location.href = '/'
    } catch (error) {
      if (error.code === 'auth/invalid-email') {
        setErrorMessage('Email not recognized')
      } else if (error.code === 'auth/email-already-in-use') {
        setErrorMessage('Email already in use')
      } else if (error.code === 'auth/weak-password') {
        setErrorMessage('Password must be at least 6 characters')
      } else {
        setErrorMessage('Internal error')
        console.log('error: ', error)
      }
    }
  }

  dispatch(hideHomeSearch())

  return (
    <div className='email-form'>
      <div className='email-form-content'>
        <div className='email-form-header'>
          <h2> Sign Up </h2>
          <p> Create your Sanctuary profile for a brand new </p>
          <p> experience, personalized just for you. </p>
        </div>

        {errorMessage && <p className='email-form-error'>
          {errorMessage}
        </p>}

        <div className='email-form-input-create-account'>
          <div className='email-input'>
            <input
              className="inputBox"
              placeholder="Email"
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
          </div>

          <div className='password-input'>
            <input
              className="inputBox"
              type="password"
              placeholder="Password"
              value={password}
              onChange={event => setPassword(event.target.value)}
            />
          </div>
        </div>

        <div className='email-form-bottom'>

          <button onClick={authenticateUser}>
            Sign Up
          </button>

          <div className='switch-form'>
            <p> Already have an account? </p>
            <Link to="/sign-in-email"> Log in. </Link>
          </div>

          <div className='account-terms-policy'>
            <p> By creating an account, you agree to Sanctuary&apos;s </p>
            <div className='terms-policy-text'>

              <Link to="/privacy-policy" className='terms-policy-pop-up'>
                Privacy Policy
              </Link>

              <p> and </p>

              <Link to="/terms-of-use" className='terms-policy-pop-up'>
                Terms of Use.
              </Link>

            </div>
          </div>

        </div>
      </div>

      <Footer color={'white'} />

    </div>
  )
}
