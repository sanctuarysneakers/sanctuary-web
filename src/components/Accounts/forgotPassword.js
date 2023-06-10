import React, { useState } from 'react'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../../firebaseConfig'
import Footer from '../Other/footer'
import sanctuary from '../../assets/images/logos/sanctuary-bird-black.png'

export default function ForgotPassword () {
  const [email, setEmail] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const resetPassword = async () => {
    try {
      setErrorMessage('')
      await sendPasswordResetEmail(auth, email)
      setSuccessMessage('Thank You! We\'ve sent you an email with further instructions to reset your password.')
      setEmail('')
    } catch (error) {
      if (error.code === 'auth/invalid-email') {
        setErrorMessage('Email not recognized')
      }
    }
  }

  return (
    <div className='email-form'>
      <div className='email-form-content'>
        <div className='email-form-header'>
          <img src={sanctuary} alt='Sanctuary' />
          <h2> Forgot Password </h2>
          <p> Enter your email address </p>
          <p> to reset your password. </p>
        </div>

        {successMessage && <p className='email-form-success'>
          {successMessage}
        </p>}

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
        </div>

        <div className='email-form-bottom'>
          <button onClick={resetPassword}>
            Reset Password
          </button>
        </div>
      </div>

      <Footer color={'white'} />
    </div>
  )
}
