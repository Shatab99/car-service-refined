/* eslint-disable react/prop-types */
import { useState } from "react";
import { ImCross } from "react-icons/im";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function AddFacilityModal({ showModal, setShowModal, facility, setFacility }) {
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('')
    const [details, setDetails] = useState('')
    const addFacility = () => {
        const newFacility = { name, details }
        setFacility([...facility, newFacility])
        setName('')
        setDetails('')
    }


    return (
        <div>
            {
                showModal && <div className="fixed bg-opacity-30 top-0 bg-black flex items-center justify-center max-w-full h-screen w-full ">
                    <div className="max-w-4xl flex flex-col gap-5 items-center justify-center bg-slate-100 w-full p-16 rounded-2xl relative">
                        <p className="text-2xl font-bold mb-10">Add Facilities</p>
                        <p onClick={() => setShowModal(false)} className="absolute top-5 right-5 hover:cursor-pointer"><ImCross /></p>
                        <div className="flex items-center justify-center gap-5 w-full">
                            <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Facility Name" className="input w-full" required />
                            <input value={details} onChange={(e) => setDetails(e.target.value)} type="text" placeholder="Facility Details" className="input w-full" required />
                            <button onClick={() => addFacility()} className="btn btn-sm bg-green-600 text-white font-bold ">ADD</button>
                        </div>
                        <div className="grid grid-cols-2 gap-8 w-full my-10">
                            {
                                facility.map(facility =>
                                    <>
                                        <div className=" bg-orange-100 rounded-lg p-10 border-2 text-center">
                                            <p className="font-semibold">Name : {facility.name}</p>
                                            <p className="font-semibold">Details : {facility.details}</p>
                                        </div>
                                    </>
                                )
                            }
                        </div>

                        <button onClick={()=>setShowModal(false)} className="btn btn-sm bg-orange-600 text-white font-bold w-full">Submit</button>

                    </div>
                </div>
            }
        </div>
    )
}
