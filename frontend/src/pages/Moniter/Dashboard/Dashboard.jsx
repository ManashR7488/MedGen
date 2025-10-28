import React, { useRef } from "react";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import ECGGraph from "../../../components/EcgGraph/ECGGraph";
import Body from "../../../components/Body/Body";

const Dashboard = () => {
  const [sensorData, setSensorData] = useState([]);
  const [heartData, setHeartData] = useState([]);

  const view = useRef(null);
  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.on("sensor-data", (newData) => {
      // console.log(newData);
      setSensorData((prev) => [...prev, newData]);
      setHeartData((prev) => {
        const updated = [...prev, newData.value];
        return updated.slice(-100);
      });
    });

    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    if (view.current && sensorData) {
      view.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [sensorData]);

  return (
    <div className="flex pt-2 gap-6 w-full">
      <div className="">
        <ECGGraph heartData={heartData} />
      </div>
      <div className="">
        <Body />
      </div>
    </div>
  );
};

export default Dashboard;
