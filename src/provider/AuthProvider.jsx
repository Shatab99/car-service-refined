/* eslint-disable react/prop-types */
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"
import { createContext, useEffect, useState } from "react"
import { auth } from "../firebase/firebase.config"

export const AuthContext = createContext(null)
export default function AuthProvider({children}) {

    const [user,setUser] = useState(null)
    const [btnLoading,setBtnLoading] = useState(true)
    const provider = new GoogleAuthProvider();

    const createUser = (email,password) => {
        setBtnLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
            console.log(currentUser)
            setUser(currentUser)
            setBtnLoading(false)
        })
        return () =>{
            return unsubscribe()
        }
    },[])

    const signInUser = (email,password) =>{
        setBtnLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    const logOut = ()=>{
        return signOut(auth)
    }

    const signInGoogle = ()=>{
        setBtnLoading(true)
        return signInWithPopup(auth,provider)
    }

    const info = {
        btnLoading,setBtnLoading, createUser,user,signInUser,logOut,signInGoogle
    }

  return (
    
    <AuthContext.Provider value={info}>
        {children}
    </AuthContext.Provider>
  )
}
