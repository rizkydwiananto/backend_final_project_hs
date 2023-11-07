import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import ProfilPekerjaRoute from "./routes/ProfilPekerjaRoute.js";
import DeskripsiLowonganRoute from "./routes/DeskripsiLowonganRoute.js";

dotenv.config();

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(ProfilPekerjaRoute);
app.use(DeskripsiLowonganRoute);

app.listen(process.env.APP_PORT, () => {
  console.log("Server berjalan dengan baik ...");
});
