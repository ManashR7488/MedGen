import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./src/lib/db.js";
import moniterRoutes from "./src/routes/moniter.routes.js";
import { getLocalIp } from "./src/lib/getlocalip.js";
import {colorText, colors} from "./src/lib/colorText.js";
import {io, server, app} from "./src/lib/io.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/moniter", moniterRoutes);
app.get("/", (req, res) => {
    res.send("Welcome to the Medgen");
});


io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

server.listen(PORT, async () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
  console.log(colorText(`http://${getLocalIp()}:${PORT}`, colors.yellow),colorText(`<= Local IP Address`, colors.green));
  console.log(colorText(`http://localhost:${PORT}`, colors.yellow),colorText(`<= Localhost`, colors.green));
});
