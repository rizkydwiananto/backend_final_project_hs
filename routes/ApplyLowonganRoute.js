import express from "express";
import {
  getApplyLowongan,
  createApplyLowongan,
  getApplyLowonganById,
  getApplyLowonganByIdPekerja,
  updateApplyLowongan,
  deleteChangesApplyLowongan,
} from "../controllers/ApplyLowonganController.js";

const router = express.Router();

router.get("/applyLowongan", getApplyLowongan);
router.get("/applyLowongan/:id", getApplyLowonganById);
router.get("/applyLowonganPekerja/:id", getApplyLowonganByIdPekerja);
router.post("/applyLowongan", createApplyLowongan);
router.put("/applyLowongan/:id", updateApplyLowongan);
router.put("/deleteApplyLowongan/:id", deleteChangesApplyLowongan);

export default router;
