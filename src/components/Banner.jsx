

export default function Banner() {
    return (
        <div className="max-w-7xl mx-auto ">
            <div
                className="hero h-[500px] "
                style={{
                    backgroundImage: "url(https://www.marshfinance.com/hubfs/Navigating%20Cost%20of%20Living%20Car%20Servicing%20%281%29.png)", borderRadius: '20px'
                }}>
                <div className="hero-overlay bg-opacity-30 rounded-[20px]"></div>
                <div className="hero-content text-neutral-content text-start">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold text-white">Affordable Price For Car Servicing</h1>
                        <p className="mb-5 text-white">
                            There are many variations of passages of  available, but the majority have suffered alteration in some form
                        </p>
                        <div className="flex gap-5">
                            <button className="btn btn-outline hover:bg-orange-600 text-white">Discover More</button>
                            <button className="btn btn-outline hover:bg-orange-600  text-white">Latest Project</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
