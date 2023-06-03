// import React, { useEffect } from 'react'
// import { useAuth0 } from '@auth0/auth0-react'
// import Footer from '../Other/footer'

// export default function Profile () {
//   const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0()
//   useEffect(() => {
//     if (!isAuthenticated) {
//       loginWithRedirect()
//     }
//   }, [isAuthenticated, user])

//   return (
//     <div className='profile-page'>

//       {!isAuthenticated && <div className='not-signed-in'>
//       </div>}

//       {user && <div className='profile-page-container'>

//         <div className='profile-page-title'>
//           <h1> Profile </h1>
//           <p> BETA </p>
//         </div>

//         <div className='profile-page-header'>

//           <div className='profile-picture'>
//             <div className='profile-picture-container'>
//               {user.picture !== null &&
//               <img src={user.picture} alt='Profile' />
//               }
//             </div>
//           </div>

//           <div className='profile-text'>
//             <h1> {user.name} </h1>
//             <p> {user.email} </p>
//           </div>

//         </div>

//         <div className='profile-page-options'>
//           <div className='profile-page-options-container'>

//             <div className='profile-sign-out' onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
//               <p> Sign Out </p>
//             </div>
//           </div>
//         </div>

//       </div>}

//       <Footer color={'white'} />
//     </div>
//   )
// }
