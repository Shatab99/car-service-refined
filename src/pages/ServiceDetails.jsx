import { Link, useParams } from "react-router-dom";
import HeadingImage from "../components/HeadingImage";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import download from "../assets/download.png"
import { IoMdArrowForward } from "react-icons/io";
import headingImage from "../assets/headingImage.png"


export default function ServiceDetails() {
    const { id } = useParams()
    const [serviceDetails, setServiceDetails] = useState({})
    const [loading, setLoading] = useState(false)
    const [titleLoading, setTitleLoading] = useState(false)
    const [services, setServices] = useState([])
    const [serviceId,setServiceId] = useState(id)


    useEffect(() => {
        const fetchServices = async () => {
            setTitleLoading(true)
            try {
                const response = await fetch('https://car-doc-server.onrender.com/services')
                const data = await response.json()
                setServices(data)
            }
            catch (err) {
                console.log(err)
            }
            finally {
                setTitleLoading(false)
            }
        }
        fetchServices()
    }, [])


    useEffect(() => {
        const serviceDetails = async () => {
            setLoading(true)
            try {
                const response = await fetch(`https://car-doc-server.onrender.com/services/${serviceId}`)
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
    }, [serviceId])

    return (
        <div className="max-w-7xl mx-auto">
            <HeadingImage heading={"Service Details"} headingImage={headingImage}/>
            <div className="grid grid-cols-3 gap-5 my-16 ">
                {
                    loading ? <Loading /> :
                        <>
                            <div className="col-span-2 flex flex-col gap-5">
                                <img src={serviceDetails.img} alt="" className="rounded-xl" />
                                <h1 className="text-2xl font-bold">{serviceDetails.title}</h1>
                                <p className="text-sm">{serviceDetails.description}</p>
                                <div className="grid grid-cols-2 gap-5">
                                    {
                                        serviceDetails?.facility?.map(item => <>
                                            <div className="bg-slate-300 border-t-orange-500 border-2 p-4 rounded-lg">
                                                <p className="text-xl font-bold">{item.name}</p>
                                                <p className="text-sm">{item.details}</p>
                                            </div>
                                        </>)
                                    }
                                </div>
                            </div>

                            <div className="flex flex-col gap-5">
                                <div className="bg-slate-200 p-4 rounded-xl flex flex-col gap-3">
                                    <h1 className=" font-bold text-xl text-center">Services</h1>
                                    {
                                        titleLoading ? <div className="skeleton h-32 w-32"></div> :
                                            services.map(title => <>
                                                <div onClick={()=>setServiceId(title._id)} className={`p-3 flex justify-between items-center hover:cursor-pointer rounded-xl ${serviceId===title._id ? 'bg-orange-600 text-white' : 'bg-white '}`}>
                                                    <p >{title.title}</p>
                                                    <p><IoMdArrowForward className={`${serviceId===title._id ? 'text-white': 'text-orange-600'}  `} /></p>
                                                </div>
                                            </>)
                                    }
                                </div>
                                <div>
                                    <img src={download} alt="" className="w-full" />
                                </div>
                                <div className="bg-slate-200 p-4 flex flex-col items-center justify-center gap-4 rounded-lg">
                                    <h1 className="text-2xl font-bold">Price : {serviceDetails.price} tk</h1>
                                    <Link to={`/checkout/${serviceDetails._id}`} className="btn btn-outline bg-orange-600 text-white">Proceed Checkout</Link>
                                </div>
                            </div>
                        </>
                }
            </div>
        </div>
    )
}
