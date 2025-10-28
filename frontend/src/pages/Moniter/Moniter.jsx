import React from "react";
import { BsSpeedometer } from "react-icons/bs";
import { GiBodyHeight } from "react-icons/gi";
import { useNavigate, useParams } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import Body from "./Body/Body";
import bodyimg from "/body-scan.png"
import ScanBody from "./ScanBody/ScanBody";
// import SerialPorts from "./SerialPort/SerialPorts";

const Moniter = () => {
    const { subpage } = useParams();
    const navigate = useNavigate();
  return (
    <div className="w-full h-screen flex -mt-17 pt-17">
      <div className="left h-full w-50 p-1">
        <div className="h-full w-full bg-base-300 py-3 px-2 flex flex-col items-center gap-3">
          <p onClick={()=>navigate("/moniter/dashboard")} className="flex btn items-center text-center justify-center gap-3 px-4 py-2 bg-base-100 rounded-2xl w-[90%]">
            <BsSpeedometer /> Dashboard
          </p>
          <p onClick={()=>navigate("/moniter/bodycheck")} className="flex btn items-center text-center justify-center gap-3 px-4 py-2 bg-base-100 rounded-2xl w-[90%]">
          <GiBodyHeight /> Body
          </p>
          <p onClick={()=>navigate("/moniter/bodyscan")} className="flex btn items-center text-center justify-center gap-3 px-4 py-2 bg-base-100 rounded-2xl w-[90%]">
            <img src={bodyimg} alt="" className="size-6" /> Scan
          </p>
        </div>
      </div>
      <div className="right h-full bg-base-100 flex-1 overflow-y-scroll scrollbar-hide">
        <div className="w-full min-h-full">
            {
                subpage === 'dashboard' && <Dashboard />
                
            }
            {
                subpage === 'bodycheck' && <Body />
            }
            {
                subpage === 'bodyscan' && <ScanBody />
            }
          {/* {  !subpage && <SerialPorts />} */}
        </div>
      </div>
    </div>
  );
};

export default Moniter;
