import mongoose from "mongoose";

const sensorSchema = new mongoose.Schema({
    sensorId: String,
    type: String,
    value: Number,
    temp:Number,
    humd:Number,
    unit: String,
},{timestamps: true});
const SensorData = mongoose.model('SensorData', sensorSchema);

export default SensorData;