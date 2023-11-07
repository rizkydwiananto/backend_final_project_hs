import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import ProfilPekerjaRoute from "./routes/ProfilPekerjaRoute.js";
import ApplyLowonganRoute from "./routes/ApplyLowonganRoute.js";
import LowonganFavoriteRoute from "./routes/LowonganFavoriteRoute.js";

dotenv.config();

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(ProfilPekerjaRoute);
app.use(ApplyLowonganRoute);
app.use(LowonganFavoriteRoute);

app.listen(process.env.APP_PORT, () => {
  console.log("Server berjalan dengan baik ...");
});
