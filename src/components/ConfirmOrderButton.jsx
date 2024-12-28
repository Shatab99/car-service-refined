/* eslint-disable react/prop-types */

import { useState } from "react"
import Swal from "sweetalert2"


export default function ConfirmOrderButton({order,refetchAllOrder}) {

    const [buttonLoading, setButtonLoading] = useState(false)

    const handleConfirm = async (id) => {
        setButtonLoading(true)
        try {
          const response = await fetch(`https://car-doc-server.onrender.com/userorder/${id}`, {
            method: "PATCH",
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify({ status: 'confirmed' })
          })
          console.log(response)
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Order Approved !!",
            showConfirmButton: false,
            timer: 1500
          });
          refetchAllOrder()
        }
        catch (err) {
          console.log(err)
        }
        finally {
          setButtonLoading(false)
        }
    
    
      }

      

    return (
        <div>
            {
                buttonLoading ? <button disabled className="btn btn-sm bg-green-600 text-white">Confirm</button> :
                    order.status === 'confirmed' ? <button className="btn btn-sm bg-green-600 text-white">Approved</button> : <button onClick={() => handleConfirm(order._id)} className="btn btn-sm bg-green-600 text-white">Confirm</button>


            }
        </div>
    )
}
