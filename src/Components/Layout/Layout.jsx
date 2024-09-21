import Navbar from "./../Navbar/Navbar";
import Footer from "./../Footer/Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto my-8 max-w-screen-xl">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
