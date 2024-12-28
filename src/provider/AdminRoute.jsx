/* eslint-disable react/prop-types */
import { useContext} from "react";
import { AuthContext } from "./AuthProvider";
import Loading from "../components/Loading";
import { Navigate } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";


export default function AdminRoute({children}) {
    const { user, btnLoading } = useContext(AuthContext)
    const {admin,adminLoading} = useAdmin()
    

    
    if( adminLoading){
        return <Loading/>
    }
    if( btnLoading){
        return <Loading/>
    }


    if(user && admin.role === 'admin'){
        return children
    }

    return <Navigate to={'/'} replace/>





}
