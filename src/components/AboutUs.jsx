/* eslint-disable react/no-unescaped-entities */
import boy from "../assets/boy.png"
import boyDown from "../assets/boyDown.png"

export default function AboutUs() {
    return (
        <div className="max-w-7xl mx-auto my-16 grid grid-cols-2 gap-14">
            <div className="relative max-w-2xl">
                <img src={boy} alt="" className="w-96 h-96" />
                <img src={boyDown} alt="" className="w-72 h-72 absolute -bottom-16 right-28" />
            </div>
            <div className="flex flex-col items-start justify-center gap-8">
                <p className="text-2xl font-bold text-orange-600">About Us</p>
                <h1 className="font-bold text-4xl max-w-md">We are qualified & of experience in this field</h1>
                <p className="text-[#737373] max-w-lg">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. <br />the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.  </p>
                <button className="btn btn-outline bg-orange-600 text-white">More Info</button>
            </div>
        </div>
    )
}
