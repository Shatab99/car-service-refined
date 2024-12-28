/* eslint-disable no-undef */
import { useState } from "react"
import SignIn from "./SignIn"
import SignUp from "../components/SignUp"
import { Link } from "react-router-dom"


export default function Authentication() {
    const [showSignIn,setShowSignIn] = useState(true)
  return (
    <div className="relative max-w-5xl mx-auto">
      <Link to={'/'} className="absolute top-4 text-lg font-bold">{'<'} Back to home</Link>
      {
        showSignIn ? <SignIn setShowSignIn={setShowSignIn}/> : <SignUp setShowSignIn={setShowSignIn}/>
      }
    </div>
  )
}
