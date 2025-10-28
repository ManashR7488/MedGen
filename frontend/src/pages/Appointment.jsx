import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppStore } from "../Store/useAppStore";
import { VscVerifiedFilled } from "react-icons/vsc";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { LuCurrency } from "react-icons/lu";
import RelatedDoctors from "../components/Related_Doctor/RelatedDoctors";
import Footer from "../components/Footer/Footer";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors } = useAppStore();
  const [docInfo, setDocInfo] = useState({ image: ".." });
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const fetchDocInfo = async () => {
    const docInfo = await doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  const getAvailableSlots = async () => {
    setDocSlots([]);

    let today = new Date();

    for (let i = 0; i < 7; i++) {
      //getting date with index
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      //setting end time of the date with index
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      //setting hours
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeslots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        timeslots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlots((prev) => [...prev, timeslots]);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  useEffect(() => {
    console.log(docSlots);
  }, [docSlots]);

  return (
    docInfo && (
      <div className="px-15 py-5">
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img
              src={docInfo.image}
              alt=""
              className="bg-primary w-full sm:max-w-72 rounded-lg"
            />
          </div>
          <div className="flex-1 border rounded-lg p-8 py-7  bg-base-100 mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            <p className="flex items-center gap-2 text-2xl font-medium ">
              {docInfo.name}{" "}
              <span>
                <VscVerifiedFilled className="size-6 inline text-blue-500" />
              </span>{" "}
            </p>
            <div className="flex items-center gap-2 text-sm mt-1">
              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className="btn py-0.5 px-2 border text-xs rounded-full">
                {docInfo.experience}
              </button>
            </div>

            <div className="">
              <p className="text-sm font-medium mt-3 flex items-center gap-1">
                About <IoMdInformationCircleOutline className="inline size-" />
              </p>
              <p className="text-sm max-w-[700px] mt-1">{docInfo.about}</p>
            </div>
            <p className="font-medium mt-4">
              Appointment fee: <span>₹{docInfo.fees}</span>
            </p>
          </div>
        </div>

        {/* ---------- Booking Slot ------------ */}

        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium">
          <p>Booking Slots</p>
          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4 scrollbar-hide">
            {docSlots.length &&
              docSlots.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setSlotIndex(idx)}
                  className={`text-center py-5 min-w-16 rounded-full cursor-pointer ${
                    slotIndex === idx
                      ? "bg-primary text-nutral"
                      : "border border-base-300"
                  } `}
                >
                  <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                  <p>{item[0] && item[0].datetime.getDate()}</p>
                </div>
              ))}
          </div>

          <div
            className={`flex gap-3 items-center w-full overflow-x-scroll mt-4 scrollbar-hide`}
          >
            {docSlots.length &&
              docSlots[slotIndex].map((item, idx) => (
                <p
                  key={idx}
                  onClick={() => setSlotTime(item.time)}
                  className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                    item.time === slotTime
                      ? "bg-primary text-nutral"
                      : "border border-base-300 "
                  }`}
                >
                  {item.time.toLowerCase()}
                </p>
              ))}
          </div>
          <button className="btn bg-primary text-nutral text-sm font-light px-14 py-3 rounded-full my-6">Book an appointment</button>
        </div>



        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      <Footer />
      </div>
    )
  );
};

export default Appointment;
