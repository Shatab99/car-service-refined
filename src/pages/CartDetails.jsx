import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Loading from "../components/Loading";
import HeadingImage from "../components/HeadingImage";
import cartDetailsPic from "../assets/cartDetailsPic.png"
import CancelOrderButton from "../components/CancelOrderButton";
export default function CartDetails() {

    const { user} = useContext(AuthContext)
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchOrder = async () => {
            setLoading(true)
            try {
                const response = await fetch(`https://car-doc-server.onrender.com/userorder/${user?.email}`)
                setOrders(await response.json())
            }
            catch (err) {
                console.log(err)
            }
            finally {
                setLoading(false)
            }
        }
        fetchOrder()
    }, [user.email])

    const refetchOrder = async () => {
        setLoading(true)
        try {
            const response = await fetch(`https://car-doc-server.onrender.com/userorder/${user?.email}`)
            setOrders(await response.json())
        }
        catch (err) {
            console.log(err)
        }
        finally {
            setLoading(false)
        }
    }

    const total = orders.reduce((acc, current) => acc + Number(current.price), 0)

   

    return (
        <div className="max-w-7xl mx-auto my-12">
            <div>
                <HeadingImage heading={'Cart Details'} headingImage={cartDetailsPic}/>
            </div>
            <div className="my-16 text-right">
                <p className="font-bold text-xl font-Rancho">Total : {total} Tk</p>
            </div>
            <div className="overflow-x-auto">
                {
                    loading ? <Loading /> : <>
                        <table className="table">

                            <tbody>
                                {/* row 1 */}
                                {
                                    orders.map(order => <>
                                        <tr>
                                            <th>
                                                <label>
                                                <CancelOrderButton order={order} refetchAllOrder={refetchOrder}/>
                                                </label>
                                            </th>
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <div className="avatar">
                                                        <div className="rounded-lg w-20 h-20">
                                                            <img
                                                                src={order.img}
                                                                alt="Avatar Tailwind CSS Component" className=""/>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="font-bold">{order.title}</div>
                                                        <div className="text-sm opacity-50">{order.carName}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="font-bold">{order.price} tk</td>
                                            <td className="font-bold">{order.orderedDate}</td>
                                            <th>
                                                {
                                                    order.status === 'pending' ? <button className="btn btn-sm bg-red-600 text-white">Pending</button> : <button className="btn btn-sm bg-green-600 text-white">Confirmed</button>
                                                }
                                            </th>
                                        </tr>
                                    </>)
                                }

                            </tbody>

                        </table>
                    </>
                }
            </div>
        </div>
    )
}
