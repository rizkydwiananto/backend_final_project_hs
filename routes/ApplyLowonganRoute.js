import express from "express";
import {
  getApplyLowongan,
  createApplyLowongan,
  getApplyLowonganById,
  getApplyLowonganByIdPekerja,
  updateApplyLowongan,
  deleteChangesApplyLowongan,
  getTotalApplyLowonganFavoritByIdPekerja,
} from "../controllers/ApplyLowonganController.js";
import { accessValidation } from "../utils/jwtModule.js";

const router = express.Router();

router.get("/applyLowongan", getApplyLowongan);
router.get("/applyLowongan/:id", getApplyLowonganById);
router.get(
  "/applyLowonganPekerja/:id",
  accessValidation,
  getApplyLowonganByIdPekerja
);
router.get(
  "/totalApplyLowonganPekerja/:id",
  accessValidation,
  getTotalApplyLowonganFavoritByIdPekerja
);
router.post("/applyLowongan", accessValidation, createApplyLowongan);
router.put("/applyLowongan/:id", updateApplyLowongan);
router.put("/deleteApplyLowongan/:id", deleteChangesApplyLowongan);

export default router;
