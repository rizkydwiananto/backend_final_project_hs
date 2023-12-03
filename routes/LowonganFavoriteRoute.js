import express from "express";
import {
  getLowonganFavorite,
  createLowonganFavorite,
  getLowonganFavoritById,
  deleteLowonganFavorite,
  getLowonganFavoritByIdPekerja,
  getTotalLowonganFavoritByIdPekerja,
} from "../controllers/LowonganFavorite.js";
import { accessValidation } from "../utils/jwtModule.js";

const router = express.Router();

router.get("/lowonganFavorite", getLowonganFavorite);
router.get("/lowonganFavorite/:id", getLowonganFavoritById);
router.get(
  "/lowonganFavoriteByIdPekerja/:id",
  accessValidation,
  getLowonganFavoritByIdPekerja
);
router.get(
  "/totallowonganFavoriteByIdPekerja/:id",
  accessValidation,
  getTotalLowonganFavoritByIdPekerja
);
router.post("/lowonganFavorite", accessValidation, createLowonganFavorite);
router.delete("/lowonganFavorite/:id", deleteLowonganFavorite);

export default router;
