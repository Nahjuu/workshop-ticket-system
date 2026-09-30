import react from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

function MainLayout(){
    return (
        <div>
            <Navbar />
            <main className="ml-64">
                <Outlet />
            </main>
        </div>
    )
}

export default MainLayout;