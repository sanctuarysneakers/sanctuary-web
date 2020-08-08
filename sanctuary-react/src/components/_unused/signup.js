// import React, { useState } from 'react'
// import img from '../assets/images/placeholder.jpg'

// export default function SignUp() {
//     const [email, changeEmail] = useState('')

//     function handleChange(event) {
//         changeEmail(event.target.value)
//     }

//     function handleSubmit() {
//         alert(`${email} has been signed up to the newsletter`)
//     }

//     return (
//         <div className='signUp'>
//             <div className='comingSoon'>
//                 <h1>More Products Coming Soon</h1>
//                 <h3>We continously update our database with the latest shoes just for you.</h3>
//                 <p>Sign up for early access to new arrivals, promotions, and more.</p>
//                 <form onSubmit={handleSubmit}>
//                     <input className="inputBox" type="text" value={email} onChange={handleChange}/>
//                     <input className="submitButton" type="submit" value="Sign Up"/>
//                 </form>
//             </div>
//             <img src={img} alt="product"/>
//         </div>
//     )
// }