import { Outlet } from "react-router-dom";

import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/NAvbar";


const Root = () => {
    return (
      <div>
        <Navbar />
        <div>
          <div className="min-h-[calc(100vh-306px)] w-full">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    );
};

export default Root;