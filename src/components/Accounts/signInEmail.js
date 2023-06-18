import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { hideHomeSearch, setUser } from '../../redux/actions'
import { Link } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebaseConfig'
import Footer from '../Other/footer'

export default function SignInEmail () {
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const signInEmailPassword = async () => {
    try {
      setErrorMessage('')
      let user
      try {
        user = await signInWithEmailAndPassword(auth, email, password)
        dispatch(setUser(user._tokenResponse))
        document.location.href = '/'
      } catch (error) {
        if (error.code === 'auth/invalid-email') {
          setErrorMessage('Email not recognized')
        } else if (error.code === 'auth/wrong-password') {
          setErrorMessage('Incorrect password')
        } else if (error.code === 'auth/too-many-requests') {
          setErrorMessage('Account temporarily blocked due to too many failed login attempts. Reset password or try again later.')
        } else {
          setErrorMessage('Internal error')
          console.log('error:', error)
        }
      }
    } catch (error) {
      console.log(error.code, error.message)
    }
  }

  dispatch(hideHomeSearch())

  return (
    <div className='email-form'>
      <div className='email-form-content'>
        <div className='email-form-header'>
          <h2> Log in </h2>
          <p> Welcome back, </p>
          <p> your perfect pair of shoes awaits you. </p>
        </div>

        {errorMessage && <p className='email-form-error'>
          {errorMessage}
        </p>}

        <div className='email-form-input'>
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

          <div className='forgot-password'>
            <Link className='forgot-password-text' to="/forgot-password">
              Forgot Password?
            </Link>
          </div>
        </div>

        <div className='email-form-bottom'>

          <button onClick={signInEmailPassword}>
            Log in
          </button>

          <div className='switch-form'>
            <p> Don&apos;t have an account? </p>
            <Link to="/create-account-email"> Sign Up. </Link>
          </div>

          <div className='account-terms-policy'>
            <p> By signing in, you agree to Sanctuary&apos;s </p>
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
