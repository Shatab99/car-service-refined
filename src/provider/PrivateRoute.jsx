/* eslint-disable react/prop-types */
import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate } from "react-router-dom";
import Loading from "../components/Loading";


export default function PrivateRoute({children}) {
 
    const {user,btnLoading} = useContext(AuthContext)

    if(btnLoading){
        return <Loading/>
    }
    
    if(user){
        return children
    }
    return <Navigate to={'/auth'} replace/>
}
