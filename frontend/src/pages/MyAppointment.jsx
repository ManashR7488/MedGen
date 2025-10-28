import React from "react";
import { useAppStore } from "../Store/useAppStore";
import Footer from "../components/Footer/Footer";

const MyAppointment = () => {
  const { doctors } = useAppStore();

  return (
    <div className="px-20">
      <p className="pb-3 mt-12 font-medium border-b">My appointment</p>
      <div>
        {doctors.slice(0, 3).map((item, idx) => (
          <div key={idx} className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 border-b py-2">
            <div>
              <img src={item.image} alt="" className="w-32 bg-secondary" />
            </div>
            <div className="flex-1 text-sm">
              <p className="text-neutral font-semibold">{item.name}</p>
              <p>{item.speciality}</p>
              <p className="font-medium mt-1">Address:</p>
              <p className="text-xs">{item.address.line1}</p>
              <p className="text-xs">{item.address.line2}</p>
              <p className="text-sm mt-1">
                <span className="text-sm font-medium">Date & Time:</span> 25, july, 2024 | 8:30 PM
              </p>
            </div>
            <div></div>
            <div className="flex flex-col gap-2 justify-end">
              <button className="btn text-sm text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-base-100 transition-all duration-300">Pay Online</button>
              <button className="btn text-sm text-center sm:min-w-48 py-2 border rounded  hover:bg-red-600 hover:text-base-100 transition-all duration-300">Cancle appointment</button>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default MyAppointment;
