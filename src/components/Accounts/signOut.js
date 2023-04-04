import React from 'react'
import firebase from '../../services/firebase.js'
import { useHistory, useParams } from 'react-router-dom'

export default function SignOut () {
  const history = useHistory()

  const { redirect } = useParams()
  if (redirect && redirect !== 'undefined') {
    firebase.auth().signOut()
      .then(() => {
        window.location.href = decodeURIComponent(redirect)
      })
  } else {
    firebase.auth().signOut()
      .then(history.push('/'))
  }

  return (
    <div></div>
  )
}
