import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export default function ProtectedRoute({isEnabled, ...props}) {
    if (isEnabled)
        return <Route {...props} />

    if (props.path.includes('sign-in/')) {
        props.path.replace('sign-in/', 'profile/')
        return <Route {...props} />
    } else if (props.path.includes('sign-in-email/')) {
        props.path.replace('sign-in-email/', 'profile/')
        return <Route {...props} />
    } else if (props.path.includes('create-account/')) {
        props.path.replace('create-account/', 'profile/')
        return <Route {...props} />
    } else if (props.path.includes('create-account-email/')) {
        props.path.replace('create-account-email/', 'profile/')
        return <Route {...props} />
    } else if (props.path.includes('profile/')) {
        props.path.replace('profile/', 'sign-in/')
        return <Route {...props} />
    } else {
        <Redirect to="/" />
    }
}
