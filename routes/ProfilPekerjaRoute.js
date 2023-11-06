import express from "express";
import {
  getProfilPekerja,
  getProfilPekerjaById,
  createProfilPekerja,
  updateProfilPekerja,
  deleteTesProfilPekerja,
  deleteChangesProfilPekerja,
} from "../controllers/ProfilPekerjaController.js";

const router = express.Router();

router.get("/profilPekerja", getProfilPekerja);
router.get("/profilPekerja/:id", getProfilPekerjaById);
router.post("/profilPekerja", createProfilPekerja);
router.put("/profilPekerja/:id", updateProfilPekerja);
router.put("/deleteChangesProfilPekerja/:id", deleteChangesProfilPekerja);
router.delete("/profilPekerja/:id", deleteTesProfilPekerja);

//cek password
//router.get("/verifiedPassword", verifiedPassword);

export default router;
