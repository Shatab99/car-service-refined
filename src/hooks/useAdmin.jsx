import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../provider/AuthProvider"


export default function useAdmin() {
    const { user,btnLoading } = useContext(AuthContext)
    const [adminLoading, setAdminLoading] = useState(true)
    const [admin, setAdmin] = useState({})
    useEffect(() => {
        
        const fetchAdmin = async () => {
            setAdminLoading(true)
            try {
                const response = await fetch(`https://car-doc-server.onrender.com/users/${user?.email}`)
                setAdmin(await response.json())
            }
            catch (err) {
                console.log(err)
            }
            finally {
                setAdminLoading(false)
            }
        }
        if(btnLoading){
            return
        }
        fetchAdmin()
    }, [user?.email, btnLoading])

    return {admin,adminLoading}
}
