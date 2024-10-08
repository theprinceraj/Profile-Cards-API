import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(express.static("public"));

import apiRoute from "../src/routes/apiRoute.js";
app.use("/api", apiRoute);

import shortLinksRoute from "../src/routes/shortLinksRoute.js";
app.use("/c", shortLinksRoute);

app.listen(port, () => {
    console.log(`****************************`);
    console.log(`Made with 💓 by Prince Raj!`);
    console.log(`****************************`);
});

export default app;
