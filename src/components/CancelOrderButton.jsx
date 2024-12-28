/* eslint-disable react/prop-types */
import { useState } from "react"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { ImCross } from "react-icons/im"
import Swal from "sweetalert2"


export default function CancelOrderButton({ order, refetchAllOrder }) {

    const [buttonLoading, setButtonLoading] = useState(false)

    const handleCancel = (id) => {
        setButtonLoading(true)


        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancel it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://car-doc-server.onrender.com/userorder/${id}`, {
                    method: "DELETE",
                    headers: {
                        'Content-type': 'application/json'
                    }
                })
               .then(res=>{
                console.log(res)
                refetchAllOrder()
                setButtonLoading(false)
               })
               
                Swal.fire({
                    title: "Deleted!",
                    text: "Your order has been canceled.",
                    icon: "success"
                });
                

            }
        });


    }

    return (
        <div>
            {
                buttonLoading ? <button ><AiOutlineLoading3Quarters className="animate-spin" /></button> :
                    order.status === "pending" && <button onClick={() => handleCancel(order._id)}><ImCross /></button>
            }
        </div>
    )
}
