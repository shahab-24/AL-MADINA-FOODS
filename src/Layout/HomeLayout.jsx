import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useContext } from "react";
import { ThemeContext } from "../Context/ThemeProvider";


const HomeLayout = () => {
    const {theme} = useContext(ThemeContext)
	return (
		<div   className={`min-h-screen ${
            theme === "light"
              ? "bg-white text-primary-light"
              : "bg-navbarDark text-textDark"
          } transition-colors duration-300`}>
			<Navbar></Navbar>
            <main className="min-h-[calc(100vh-60px)] container mx-auto">
            <Outlet></Outlet>
            </main>
			
			<Footer></Footer>
		</div>
	);
};

export default HomeLayout;