import { io } from "../lib/io.js";
import SensorData from "../models/moniter.sensor.model.js";
import sensorSchema from "../models/moniter.sensor.model.js";

export const getData = async (req, res) => {
    console.log("hello comming")
    try {
        const data = await sensorSchema.find({}).sort({ createdAt: -1 }).limit(50);
        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const storeData = async (req, res) => {
    try {
        // Instead of destructuring 'sensors', just take the entire body as one sensor object
        const sensor = req.body;
        console.log(sensor);
        
        
        // Validate the fields you need:
        if (!sensor.sensorId || sensor.value === undefined) {
          return res.status(400).send({ error: 'Missing required fields' });
        }
        // Emit the data to clients
        io.emit('sensor-data', sensor);
        
        // Insert into the database
        const savedSensor = await SensorData.create(sensor);
        
        
        res.status(201).send(savedSensor);
      } catch (err) {
        console.error(err);
        res.status(400).send(err);
      }
}