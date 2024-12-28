import HeadingImage from "../components/HeadingImage";
import allOrderPic from "../assets/allOrderPic.png"
import Loading from "../components/Loading";
import { useEffect, useState } from "react";
import ConfirmOrderButton from "../components/ConfirmOrderButton";
import CancelOrderButton from "../components/CancelOrderButton";


export default function AllUserOrders() {

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  

  useEffect(() => {
    const fetchAllOrder = async () => {
      setLoading(true)
      try {
        const response = await fetch(`https://car-doc-server.onrender.com/userorder`)
        setOrders(await response.json())
      }
      catch (err) {
        console.log(err)
      }
      finally {
        setLoading(false)
      }
    }
    fetchAllOrder()
  }, [])

  
  const refetchAllOrder = async () => {
    setLoading(true)
    try {
      const response = await fetch(`https://car-doc-server.onrender.com/userorder`)
      setOrders(await response.json())
    }
    catch (err) {
      console.log(err)
    }
    finally {
      setLoading(false)
    }
  }

  

  return (
    <div className="max-w-7xl mx-auto my-12">
      <div >
        <HeadingImage heading={'Manage All Orders'} headingImage={allOrderPic} />
      </div>
      <div className="overflow-x-auto my-14">
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
                          <CancelOrderButton order={order} refetchAllOrder={refetchAllOrder}/>
                        </label>
                      </th>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="rounded-lg w-20 h-20">
                              <img
                                src={order.img}
                                alt="Avatar Tailwind CSS Component" className="" />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{order.title}</div>
                            <div className="text-sm opacity-50">{order.carName}</div>
                          </div>
                        </div>
                      </td>
                      <td className="font-bold">{order.email} </td>
                      <td className="font-bold">{order.orderedDate}</td>
                      <th>
                        <ConfirmOrderButton  order={order} refetchAllOrder={refetchAllOrder}/>
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
