import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppStore } from "../Store/useAppStore";
import { GoDotFill } from "react-icons/go";
import "../components/TopDoctors/a.css";
import Footer from "../components/Footer/Footer";

const Doctors = () => {
  const { speciality } = useParams();
  const { doctors } = useAppStore();
  const [fillterDoc, setFillterDoc] = useState([]);
  const navigate = useNavigate();

  const applyFilter = () => {
    if (speciality) {
      setFillterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFillterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  return (
    <div className="px-20 ">
      <p>Browse through the doctors specialist.</p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <div className="flex flex-col gap-4 text-sm ">
          <p
            onClick={() => {
              speciality === "General physician"
                ? navigate("/doctors/")
                : navigate("/doctors/General physician");
            }}
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border rounded-lg transition-all duration-300 cursor-pointer border-base-300 ${
              speciality === "General physician"
                ? "bg-primary "
                : "bg-base-300"
            }`}
          >
            General physician
          </p>
          <p
            onClick={() => {
              speciality === "Gynecologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gynecologist");
            }}
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border rounded-lg transition-all duration-300 cursor-pointer border-base-300 ${
              speciality === "Gynecologist"
                ? "bg-primary "
                : "bg-base-300"
            }`}
          >
            Gynecologist
          </p>
          <p
            onClick={() => {
              speciality === "Dermatologist"
                ? navigate("/doctors")
                : navigate("/doctors/Dermatologist");
            }}
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border rounded-lg transition-all duration-300 cursor-pointer border-base-300 ${
              speciality === "Dermatologist"
                ? "bg-primary "
                : "bg-base-300"
            }`}
          >
            Dermatologist
          </p>
          <p
            onClick={() => {
              speciality === "Pediatricians"
                ? navigate("/doctors")
                : navigate("/doctors/Pediatricians");
            }}
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border rounded-lg transition-all duration-300 cursor-pointer border-base-300 ${
              speciality === "Pediatricians"
                ? "bg-primary "
                : "bg-base-300"
            }`}
          >
            Pediatricians
          </p>
          <p
            onClick={() => {
              speciality === "Neurologist"
                ? navigate("/doctors")
                : navigate("/doctors/Neurologist");
            }}
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border rounded-lg transition-all duration-300 cursor-pointer border-base-300 ${
              speciality === "Neurologist"
                ? "bg-primary "
                : "bg-base-300"
            }`}
          >
            Neurologist
          </p>
          <p
            onClick={() => {
              speciality === "Gastroenterologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gastroenterologist");
            }}
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border rounded-lg transition-all duration-300 cursor-pointer border-base-300 ${
              speciality === "Gastroenterologist"
                ? "bg-primary "
                : "bg-base-300"
            }`}
          >
            Gastroenterologist
          </p>
        </div>
        <div className="w-full grid grid-cols-auto gap-4 gap-y-6">
          {fillterDoc.map((doctor, idx) => (
            <div
              key={idx}
              onClick={() => navigate(`/appointment/${doctor._id}`)}
              className="border border-base-300 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-300"
            >
              <img
                src={doctor.image}
                alt={doctor.name}
                className="bg-base-200"
              />

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
      </div>
      <Footer />
    </div>
  );
};

export default Doctors;
