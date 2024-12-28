import { useContext, useEffect, useState } from "react";
import HeadingImage from "../components/HeadingImage";
import { AuthContext } from "../provider/AuthProvider";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import headingImage from "../assets/headingImage.png"


export default function Checkout() {
    const {id} = useParams()
    const {user} = useContext(AuthContext)
    const [loading,setLoading] = useState(false)
    const [serviceDetails, setServiceDetails] = useState({})
    const date = new Date()
    const day = String(date.getDate()).padStart(2,'0')
    const month = String(date.getMonth()+1).padStart(2,'0')
    const year = String(date.getFullYear())
    const orderedDate = `${day}-${month}-${year}`
    

    useEffect(() => {
        const serviceDetails = async () => {
            setLoading(true)
            try {
                const response = await fetch(`https://car-doc-server.onrender.com/services/${id}`)
                setServiceDetails(await response.json())
            }
            catch (err) {
                console.log(err)
            }
            finally {
                setLoading(false)
            }
        }
        serviceDetails()
    }, [id])

    const {title,img,price} = serviceDetails

    const handleSubmit = async (e)=>{
        e.preventDefault()
        const firstName = e.target.firstName.value
        const carName = e.target.carName.value
        const phone = e.target.phone.value
        const email = e.target.email.value
        const message = e.target.message.value
        const form ={
            firstName,carName,phone,email,message,title,img,orderedDate,price,status:'pending'
        }
        setLoading(true)
        try{
            const response = await fetch('https://car-doc-server.onrender.com/userorder',{
                method: "POST",
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(form)
            })
            console.log(response)
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Your item successfully added",
                showConfirmButton: false,
                timer: 1500
              });
            e.target.reset()
        }
        catch(err){
            console.log(err)
        }
        finally{
            setLoading(false)
        }
    }

    return (
        <div className="max-w-7xl mx-auto">
            <div>
                <HeadingImage heading={'Check Out'} headingImage={headingImage}/>
            </div>
            <form onSubmit={handleSubmit} className="bg-slate-200 px-24 p-20 rounded-lg my-10 flex flex-col items-center justify-center  gap-5 w-full">
                <div className="grid grid-cols-2 gap-5 w-full">
                    <input name="firstName" type="text" placeholder="First Name" className="input w-full" required/>
                    <input name="carName" type="text" placeholder="car Name" className="input w-full" required/>
                    <input name="phone" type="text" placeholder="Your Phone number" className="input w-full" required/>
                    <input defaultValue={user.email} name="email" type="text" placeholder="Your Email" className="input w-full" required/>
                    
                </div>
                <textarea name="message" className="textarea w-full" placeholder="Your Message"></textarea>
                {
                    loading ? <button className="btn btn-outline w-full bg-orange-600 text-white"><AiOutlineLoading3Quarters className="animate-spin" /></button> : <button className="btn btn-outline w-full bg-orange-600 text-white">Order Confirm</button>
                }

            </form>
        </div>
    )
}
