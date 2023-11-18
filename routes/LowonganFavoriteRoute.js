import express from "express";
import {
  getLowonganFavorite,
  createLowonganFavorite,
  getLowonganFavoritById,
  deleteLowonganFavorite,
} from "../controllers/LowonganFavorite.js";

const router = express.Router();

router.get("/lowonganFavorite", getLowonganFavorite);
router.get("/lowonganFavorite/:id", getLowonganFavoritById);
router.post("/lowonganFavorite", createLowonganFavorite);
router.delete("/lowonganFavorite/:id", deleteLowonganFavorite);

export default router;
