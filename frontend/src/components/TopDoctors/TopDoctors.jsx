import React from "react";
// import { doctors } from "../../assets/assets";
import { GoDotFill } from "react-icons/go";
import "./a.css";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../Store/useAppStore";
const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useAppStore();

  return (
    <div className="flex flex-col items-center gap-4 my-16 md:mx-10 px-20">
      <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors.
      </p>
      <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {doctors.slice(0, 10).map((doctor, idx) => (
          <div
            key={idx}
            onClick={() => {navigate(`/appointment/${doctor._id}`); scrollTo(0,0);}}
            className="border border-base-300 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-300"
          >
            <img src={doctor.image} alt={doctor.name} className="bg-base-200" />

            <div className="p-4">
              <div className="flex items-center gap-2 text-sm text-center text-green-500">
                <p>
                  <GoDotFill />
                </p>
                <p className="">Appointment</p>
              </div>
              <p className="text-lg font-medium">{doctor.name}</p>
              <p className="text-sm ">{doctor.speciality}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => navigate("/doctors")}
        className="btn px-12 py-3 rounded-full mt-10 bg-base-200"
      >
        More
      </button>
    </div>
  );
};

export default TopDoctors;
