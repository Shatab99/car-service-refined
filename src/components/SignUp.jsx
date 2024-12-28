/* eslint-disable react/prop-types */
import { useContext } from "react"
import signUp from "../assets/signUp.png"
import { AuthContext } from "../provider/AuthProvider"
import { useNavigate } from "react-router-dom"
import { updateProfile } from "firebase/auth"
import Swal from "sweetalert2"
import { AiOutlineLoading3Quarters } from "react-icons/ai"


export default function SignUp({setShowSignIn}) {
    const {btnloading,setBtnLoading,createUser} = useContext(AuthContext)
    const navigate = useNavigate()

    const handleSubmit = (e) =>{
        e.preventDefault()
        const name = e.target.name.value
        const photo = e.target.photo.value
        const email = e.target.email.value
        const password = e.target.password.value
        const form = {
            name,photo,email,role:'user'
        }

        createUser(email,password)
        .then(res=>{
            console.log(res)
            updateProfile(res.user,{
                displayName: name , photoURL: photo
            })
            fetch('https://car-doc-server.onrender.com/create-user',{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form)
            })
            setBtnLoading(false)
            e.target.reset()
            navigate('/')
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Successfully Signed Up",
                showConfirmButton: false,
                timer: 1500
              });
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
    return (
        <div className="flex flex-col items-center justify-center my-16 gap-20">
            <h1 className="text-4xl font-bold">Sign Up</h1>
            <div className="max-w-7xl mx-auto flex items-center justify-center gap-20 ">
                <div><img src={signUp} alt="" className="h-96" /></div>
                <div className="flex flex-col items-center justify-center gap-6 ">
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 border-2
                ">
                        <form onSubmit={handleSubmit} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input name="name" type="text" placeholder="name" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo</span>
                                </label>
                                <input name="photo" type="text" placeholder="Photo URL" className="input input-bordered" required />
                            </div>
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
                                    <button className="btn btn-outline w-full bg-orange-600 text-white">Sign Up</button>
                                }
                            </div>
                        </form>
                        <div className="flex flex-col justify-center items-center mb-5 gap-5">
                            <p>Already Have Account ?  <button onClick={() => setShowSignIn(true)} className="font-semibold">Sign In</button>  </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
