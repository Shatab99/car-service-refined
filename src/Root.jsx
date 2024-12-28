import { Outlet } from "react-router-dom";
import Navber from "./components/Navber";
import Footer from "./components/Footer";


export default function Root() {
  return (
    <div>
      <Navber/>
      <Outlet/>
      <Footer/>
    </div>
  )
}
