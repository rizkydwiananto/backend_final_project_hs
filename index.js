import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";

//pemanggilan path gambar
import path from "path";
import { fileURLToPath } from "url";

import ProfilPekerjaRoute from "./routes/ProfilPekerjaRoute.js";
import ApplyLowonganRoute from "./routes/ApplyLowonganRoute.js";
import LowonganFavoriteRoute from "./routes/LowonganFavoriteRoute.js";
import PerusahaanRoute from "./routes/PerusahaanRoute.js";
import DeskripsiLowonganRoute from "./routes/DeskripsiLowonganRoute.js";

//penamaan folder dan direktori name dari server
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//fungsi penyimpanan foto
const filesStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + ".jpg");
  },
});

//fungsi upload selain file yang tertera
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

dotenv.config();

const app = express();

//middleware multer upload foto
app.use(
  multer({ storage: filesStorage, fileFilter: fileFilter }).single("image")
);

//middleware
app.use(cors());
app.use(express.json());
app.use(ProfilPekerjaRoute);
app.use(ApplyLowonganRoute);
app.use(LowonganFavoriteRoute);
app.use(PerusahaanRoute);
app.use(DeskripsiLowonganRoute);

//penggunaan pemunuclan link gambar di server
app.use("/images", express.static(path.join(__dirname, "images")));

app.listen(process.env.APP_PORT, () => {
  console.log("Server berjalan dengan baik ...");
});
