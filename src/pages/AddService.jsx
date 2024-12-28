/* eslint-disable no-undef */
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import HeadingImage from "../components/HeadingImage";
import headingImage from "../assets/headingImage.png"
import { useState } from "react";
import AddFacilityModal from "../components/AddFacilityModal";
import Swal from "sweetalert2";



export default function AddService() {

    const [showModal, setShowModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [facility,setFacility] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const title = e.target.title.value
        const img = e.target.img.value
        const price = e.target.price.value
        const description = e.target.description.value
        const form = {
            title, img, price, description,facility
        }
        setLoading(true)
        try {
            const response = await fetch('https://car-doc-server.onrender.com/addService', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
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
        catch (err) {
            console.log(err)
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className="max-w-7xl mx-auto">
                <div>
                    <HeadingImage heading={'Add New Service'} headingImage={headingImage} />
                </div>
                <form onSubmit={handleSubmit} className="bg-slate-200 px-24 p-20 rounded-lg my-10 flex flex-col items-center justify-center  gap-5 w-full">
                    <div className="grid grid-cols-2 gap-5 w-full">
                        <input name="title" type="text" placeholder="Service Name" className="input w-full" required />
                        <input name="img" type="text" placeholder="Image URL" className="input w-full" required />
                        <input name="price" type="text" placeholder="Price" className="input w-full" required />
                        <div onClick={()=>setShowModal(true)} className="btn w-full bg-white justify-start">
                            Add Facility
                        </div>

                    </div>
                    <textarea name="description" className="textarea w-full" placeholder="Your Message"></textarea>
                    {
                        loading ? <button className="btn btn-outline w-full bg-orange-600 text-white"><AiOutlineLoading3Quarters className="animate-spin" /></button> : <button className="btn btn-outline w-full bg-orange-600 text-white">Add Service</button>
                    }

                </form>

            </div>

            <AddFacilityModal showModal={showModal} setShowModal={setShowModal} facility={facility} setFacility={setFacility}/>
        </>
    )
}
