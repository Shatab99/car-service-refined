import { Link } from "react-router-dom";
import carDoctor from "../assets/carDoctor.png"
import { GoSearch } from "react-icons/go";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import useAdmin from "../hooks/useAdmin";


export default function Navber() {

    const {user,logOut} = useContext(AuthContext)
    const {admin,adminLoading} = useAdmin()

    const handleLogOut = ()=>{
        Swal.fire({
            title: "Are you sure?",
            text: "",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, sign out!"
          }).then((result) => {
            if (result.isConfirmed) {
                logOut()
              Swal.fire({
                title: "Signed Out",
                icon: "success"
              });
            }
          });
    }

    
    
    return (
        <div className="max-w-7xl mx-auto py-5 flex items-center justify-between">
            <img src={carDoctor} alt="" className="w-28 h-16 px-5" />
            <div className="flex items-center justify-center gap-5">
                <Link to={'/'} className="text-lg font-semibold">Home</Link>
                <Link to={'/'} className="text-lg font-semibold">About</Link>
                <Link to={'/'} className="text-lg font-semibold">Service</Link>
                {
                    admin.role === 'admin' && <Link to={'/addService'} className="text-lg font-semibold">Add Service</Link>
                }
            </div>
            
            {
                user ? <div className="flex items-center justify-center gap-5">
                <p><GoSearch /></p>
                {
                    adminLoading ? <button className="btn btn-outline w-full bg-orange-600 text-white"><AiOutlineLoading3Quarters className="animate-spin"/></button> : admin?.role === 'admin' ? <Link to={'/allUserOrders'} className="btn btn-outline btn-sm hover:bg-orange-500">User Orders</Link>: <Link to={'/cartDetails'} className="btn btn-outline btn-sm hover:bg-orange-500">Appointment</Link>
                }
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src={user.photoURL}/>
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li>
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        
                        <li><a onClick={()=>handleLogOut()}>Sign Out</a></li>
                    </ul>
                </div>
            </div> : 
            <Link to={'/auth'} className="btn btn-outline btn-sm text-orange-500 hover:bg-orange-500 hover:border-0">Sign In</Link>

            }
             
        </div>
    )
}
