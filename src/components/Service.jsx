/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { IoMdArrowForward } from "react-icons/io";
import Loading from "./Loading";
import { Link } from "react-router-dom";

export default function Service() {
    const [loading, setLoading] = useState(false)
    const [services, setServices] = useState([])

    useEffect(() => {
        const fetchServices = async () => {
            setLoading(true)
            try {
                const response = await fetch('https://car-doc-server.onrender.com/services')
                const data = await response.json()
                setServices(data)
            }
            catch (err) {
                console.log(err)
            }
            finally {
                setLoading(false)
            }
        }
        fetchServices()
    }, [])
    console.log(services)
    return (
        <div className="flex flex-col items-center justify-center max-w-7xl mx-auto" >
            <div className="flex flex-col items-center justify-center gap-3 py-16">
                <p className="text-2xl font-bold text-orange-600">About Us</p>
                <h1 className="text-2xl font-bold">Our Service Area</h1>
                <p className="text-[#737373] max-w-xl text-center">the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. </p>
            </div>
            {
                loading ? <Loading /> :
                    <>
                        <div className="grid grid-cols-3 gap-10 w-full">
                            {
                                services.map(service => <>

                                    <div className="card card-compact bg-base-100  shadow-xl">
                                        <figure>
                                            <img
                                                src={service.img}
                                                alt="Shoes" className="h-52 w-full"/>
                                        </figure>
                                        <div className="card-body">
                                            <h2 className="card-title text-xl font-bold">{service.title}</h2>
                                            
                                            <div className="card-actions flex justify-between">
                                                <p className="text-orange-600 font-bold">Price:{service.price} </p>
                                                <Link to={`/serviceDetails/${service._id}`} className="btn btn-sm"><IoMdArrowForward className="text-orange-600" /></Link>
                                            </div>
                                        </div>
                                    </div>

                                </>)
                            }
                        </div>
                    </>
            }
        </div>
    )
}
