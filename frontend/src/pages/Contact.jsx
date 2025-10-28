import React from "react";
import { assets } from "../assets/assets";
import Footer from "../components/Footer/Footer";

const Contact = () => {
  return (
    <div className="px-20">
      <div className="text-center text-2xl pt-10 ">
        <p className="uppercase">
          Contact <span className="font-extrabold">US</span>
        </p>
      </div>

      <div className="flex my-10 flex-col justify-center md:flex-row gap-10 mb-28 text-sm">
        <img
          src={assets.contact_image}
          alt=""
          className="w-full md:max-w-[360px]"
        />
        <div className="flex flex-col justify-center gap-6 items-start">
          <p className="font-semibold">OUR OFFICE</p>
          <p>00000 Willms Station Suite 000, Washington, USA</p>
          <p>Tel: (000) 000-0000 Email: greatstackdev@gmail.com</p>
          <p className="font-semibold text-lg ">CAREERS AT MEDIGEN</p>
          <p>Learn more about our teams and job openings.</p>
          <button className="btn border px-8 py-4 text-sm hover:bg-primary">Explore Jobs</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
