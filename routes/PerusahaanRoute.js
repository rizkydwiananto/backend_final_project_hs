import express from "express";
import {
  createPerusahaan,
  deleteChangesPerusahaan,
  deleteDataPerusahaan,
  getPerusahaan,
  getPerusahaanById,
  updatePerusahaan,
} from "../controllers/PerusahaanController.js";

const router = express.Router();

router.get("/perusahaan", getPerusahaan);
router.get("/perusahaan/:id", getPerusahaanById);
router.post("/perusahaan", createPerusahaan);
router.put("/updatePerusahaan/:id", updatePerusahaan);
router.put("/deleteChangesPerusahaan/:id", deleteChangesPerusahaan);
router.delete("/deleteDataPerusahaan/:id", deleteDataPerusahaan);

export default router;
