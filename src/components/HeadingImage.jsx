/* eslint-disable react/prop-types */


export default function HeadingImage({heading,headingImage}) {
    return (
        <div
            className="hero max-w-7xl mx-auto h-72 relative"
            style={{
                backgroundImage: `url(${headingImage})`, borderRadius: '20px'
            }}>
            <div className="hero-overlay bg-opacity-60 rounded-[20px] bg-black"></div>
            <div className=" text-neutral-content text-center">
                <div className=" ">
                    <h1 className="mb-5 text-5xl font-bold absolute left-16 top-1/3">{heading}</h1>
                    <button className="max-w-xs bg-orange-600 text-white border-0 absolute bottom-0 left-[40%] text-center px-8 py-2 ">Home/{heading}</button>
                </div>
            </div>
        </div>
    )
}
