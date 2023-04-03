import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import firebase from '../../services/firebase.js'
import { useHistory, Link } from 'react-router-dom'

import { setRedirectUrl, hideHomeSearch } from '../../redux/actions'
import Footer from '../Other/footer'

export default function SignInEmail () {
  const dispatch = useDispatch()
  const history = useHistory()

  const redirect = useSelector(state => state.redirect)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const signInEmailPassword = () => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(async (r) => {
        if (redirect) {
          const redirectCopy = redirect
          dispatch(setRedirectUrl(null))
          const jwt = await r.user.getIdToken()
          window.location.href = `${redirectCopy}id_token=${jwt}&refresh_token=${r.user.refreshToken}`
        }
        history.push('/')
      }).catch(e => {
        setErrorMessage(e.message)
      })
  }

  dispatch(hideHomeSearch())

  return (
    <div className='email-form'>
      <div className='email-form-content'>
        <div className='email-form-header'>
          {/* <img src={sanctuary} alt='Sanctuary' /> */}
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
            <Link className='forgot-password-text' to="/sign-in-forgot-password">
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

      <Footer colour={'white'} />

    </div>
  )
}
