import React from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap bg-base-200 rounded-lg px-8 md:px-10 lg:px-15 mt-5 ">
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]">
        <div className="text-3xl md:4xl lg:text-5xl font-semibold leading-tight md:leading-tight lg:leading-tight' ">
          <h1>Empower Your Health Journey,</h1> 
          <h1>Connect with Trusted Doctors on a Secure
          Platform</h1>
        </div>
        <div className="md:flex">
          <img className="flex-nowrap " src={assets.group_profiles} alt="" />
          <p>
            Welcome to your health journey. Here you can book appointments,
            track your health data in real time, and access expert care at your
            fingertips.
          </p>
        </div>
        <Link className="px-6 py-3 bg-primary rounded-full group text-base-100 hover:scale-105 transition-all duration-300">Book appointment <FaArrowRightLong className="inline group-hover:-rotate-12"/></Link>
        <Link to={"/moniter"} className="px-6 py-3 bg-primary rounded-full group text-base-100 hover:scale-105 transition-all duration-300">Moniter <FaArrowRightLong className="inline group-hover:-rotate-12"/></Link>
      </div>
      <div className="w-1/2 flex justify-center items-center ">
        <img className="rounded-lg" src={"https://cdni.iconscout.com/illustration/free/thumb/free-doctor-checking-patient-illustration-download-in-svg-png-gif-file-formats--girl-lady-nurse-medical-healthcare-illustrations-2040619.png"} alt="" />
      </div>
    </div>
  );
};

export default Header;
