// a page for handling auth redirects
 
import React, { useEffect } from 'react'
import { handleAuthRedirect } from "realm-web"

export default function AuthRedirect() {

    useEffect(() => {
        handleAuthRedirect();
    }, []);

    return (
        <div>
            This page is for handling auth redirects!
        </div>
    )
}