import express from "express";
import {
  getProfilPekerja,
  getProfilPekerjaById,
  createProfilPekerja,
  updateProfilPekerja,
  deleteTesProfilPekerja,
  deleteChangesProfilPekerja,
  loginPekerja,
  updatePasswordPekerja,
} from "../controllers/ProfilPekerjaController.js";
import { accessValidation } from "../utils/jwtModule.js";

const router = express.Router();

router.get("/profilPekerja", getProfilPekerja);
router.get("/profilPekerja/:id", accessValidation, getProfilPekerjaById);
router.post("/profilPekerja", createProfilPekerja);
router.post("/loginPekerja", loginPekerja);
router.put("/profilPekerja/:id", accessValidation, updateProfilPekerja);
router.put("/updatePasswordPekerja/:id", updatePasswordPekerja);
router.put("/deleteChangesProfilPekerja/:id", deleteChangesProfilPekerja);
router.delete("/profilPekerja/:id", deleteTesProfilPekerja);

//cek password
//router.get("/verifiedPassword", verifiedPassword);

export default router;
