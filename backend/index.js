import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

import authRoutes from "./routes/AuthRoutes.js";
import contactRoutes from "./routes/ContactRoutes.js";
import messagesRoutes from "./routes/MessagesRoutes.js";

import setupSocket from "./socket.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const databaseURL = process.env.DATABASE_URL;

app.use(cors({
    origin: [ process.env.ORIGIN ],
    method: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
}));

app.use("/uploads/profiles", express.static("uploads/profiles"));
app.use("/uploads/files", express.static("uploads/files"));

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/messages", messagesRoutes);

const server = app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

setupSocket(server);

mongoose.connect(databaseURL)
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((err) => {
        console.log(err);
    })
