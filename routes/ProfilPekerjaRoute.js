import express from "express";
import {
  getProfilPekerja,
  createProfilPekerja,
} from "../controllers/ProfilPekerjaController.js";

const router = express.Router();

router.get("/profilPekerja", getProfilPekerja);
router.post("/profilPekerja", createProfilPekerja);

export default router;
