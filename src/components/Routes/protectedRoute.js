import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export default function ProtectedRoute({isEnabled, ...props}) {
    if (isEnabled)
        return <Route {...props} />

    if (props.path.includes('sign-in/')) {
        return <Route path="/sign-in/:redirect?"
            render={props => <Redirect to={`/profile/${props.match.params.redirect}`} />}
        />
    } else if (props.path.includes('sign-in-email/')) {
        return <Route path="/sign-in-email/:redirect?"
            render={props => <Redirect to={`/profile/${props.match.params.redirect}`} />}
        />
    } else if (props.path.includes('create-account/')) {
        return <Route path="/create-account/:redirect?"
            render={props => <Redirect to={`/profile/${props.match.params.redirect}`} />}
        />
    } else if (props.path.includes('create-account-email/')) {
        return <Route path="/create-account-email/:redirect?"
            render={props => <Redirect to={`/profile/${props.match.params.redirect}`} />}
        />
    } else if (props.path.includes('profile/')) {
        return <Route path="/profile/:redirect?"
            render={props => <Redirect to={`/sign-in/${props.match.params.redirect}`} />}
        />
    } else {
        return <Redirect to="/" />
    }
}
