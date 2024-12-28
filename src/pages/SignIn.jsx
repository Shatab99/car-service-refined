/* eslint-disable react/prop-types */
import { useContext } from "react";
import signUp from "../assets/signUp.png"
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function SignIn({setShowSignIn}) {
    const {btnloading,setBtnLoading,signInUser,signInGoogle} = useContext(AuthContext)
    const navigate = useNavigate()

    const handleSignIn = (e) =>{
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        signInUser(email,password)
        .then(res=>{
            console.log(res)
            setBtnLoading(false)
            e.target.reset()
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Successfully logged in",
                showConfirmButton: false,
                timer: 1500
              });
            navigate('/')
        })
        .catch(err=>{
            console.log(err)
            setBtnLoading(false)
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: err.message,
              });
        })
    }

    const handleGoogle = ()=>{
        signInGoogle()
        .then(res=>{
            const form = {
                name: res.user.displayName,
                email: res.user.email,
                photo: res.user.photoURL,
                role:'user'
            }
            fetch('https://car-doc-server.onrender.com/create-user',{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form)
            })
            setBtnLoading(false)
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Successfully logged in",
                showConfirmButton: false,
                timer: 1500
              });
            navigate('/')
        })
        .catch(err=>{
            setBtnLoading(false)
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: err.message,
              });
        })
    }

    return (
        <div className="flex flex-col items-center justify-center my-16 gap-20">
            <h1 className="text-4xl font-bold">Sign In</h1>
            <div className="max-w-7xl mx-auto flex items-center justify-center gap-20 ">
                <div><img src={signUp} alt="" className="h-96" /></div>
                <div className="flex flex-col items-center justify-center gap-6 ">
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 border-2">
                        <form onSubmit={handleSignIn} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input name="email" type="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input name="password" type="password" placeholder="password" className="input input-bordered" required />
                                
                            </div>
                            <div className="form-control mt-6">
                                {
                                    btnloading ? <button className="btn btn-outline w-full bg-orange-600 text-white"><AiOutlineLoading3Quarters className="animate-spin"/></button> : 
                                    <button className="btn btn-outline w-full bg-orange-600 text-white">Sign In</button>
                                }
                            </div>
                        </form>
                        <div className="flex flex-col justify-center items-center mb-5 gap-5">
                            {
                                btnloading ? <button disabled onClick={()=>handleGoogle()} className="btn btn-outline btn-wide">Continue with <FcGoogle /> </button> : <button onClick={()=>handleGoogle()} className="btn btn-outline btn-wide">Continue with <FcGoogle /> </button>
                            }
                            <p>{`Don't`} Have Account ? <button onClick={()=>setShowSignIn(false)}  className="font-semibold">Sign Up</button>  </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
