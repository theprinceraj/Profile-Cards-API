import express from "express";
const router = express.Router();
import cors from "cors";
import profileController from "../controllers/profileController.js";
import uploadsController from "../controllers/uploadsController.js";
import shortLinksController from "../controllers/shortLinksController.js";

// Define a route to handle the root path
router.get("/", (req, res) => {
    res.send("API is running.");
});

let corsOptionProfile = {
    origin: "*",
    methods: ["GET"],
    optionsSuccessStatus: 200,
};
router.get("/profile", cors(corsOptionProfile), profileController);

let corsOptionRestricted = {
    origin: "https://prince.is-a.dev",
    optionsSuccessStatus: 200,
};
router.post("/upload", cors(corsOptionRestricted), uploadsController);

router.use("/shorten", cors(corsOptionRestricted), shortLinksController);

export default router;
