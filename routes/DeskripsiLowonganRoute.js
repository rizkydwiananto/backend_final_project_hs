import express from "express";
import {
  createDeskripsiLowongan,
  deleteChangesDeskripsiLowongan,
  deleteDataDeskripsiLowongan,
  getDeskripsiLowongan,
  getDeskripsiLowonganById,
  updateDeskripsiLowongan,
} from "../controllers/DeskripsiLowonganController.js";
import { accessValidation } from "../utils/jwtModule.js";

const router = express.Router();

router.get("/deskripsiLowongan", getDeskripsiLowongan);
router.get(
  "/deskripsiLowongan/:id",
  accessValidation,
  getDeskripsiLowonganById
);
router.post("/deskripsiLowongan", createDeskripsiLowongan);
router.put("/updateDeskripsiLowongan/:id", updateDeskripsiLowongan);
router.put(
  "/deleteChangesDeskripsiLowongan/:id",
  deleteChangesDeskripsiLowongan
);
router.delete("/deleteDataDeskripsiLowongan/:id", deleteDataDeskripsiLowongan);

export default router;
