import React from "react";

const Footer = () => {
  return (
    <div className="px-20 md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <div className="flex items-center mb-5">
            <img src="/fav.png" alt="" className="w-15" />
            <h1 className="text-4xl font-[900] -translate-y-1">EDIGEN</h1>
          </div>
          <p className="w-full md:w-2/3 leading-6">
            Smart Health Chain & Health Financial Portal revolutionizes
            healthcare with real-time monitoring, secure blockchain storage, and
            AI-driven insights. It empowers patients, enhances provider support,
            and streamlines insurance operations. Experience a smarter, more
            efficient, and sustainable healthcare ecosystem.
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2">
            <li>Home</li>
            <li>About Us</li>
            <li>Coontact Us</li>
            <li>Privicy Policy</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2">
            <li>+0-000-000-000</li>
            <li>example@gmail.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="py-5 text-sm text-center">Copyright 2025 @ Greatstack.dev - All Right Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
