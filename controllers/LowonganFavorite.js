import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getLowonganFavorite = async (req, res) => {
  try {
    const response = await prisma.lowongan_favorite.findMany();
    res.status(200).json({
      code: 200,
      message: "Sukses",
      data: response,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getLowonganFavoritById = async (req, res) => {
  try {
    const response = await prisma.lowongan_favorite.findUnique({
      where: {
        id_lowongan_favorite: Number(req.params.id),
      },
    });

    let mesData = "";
    if (response == null) {
      mesData = "id tidak tersedia dalam database";
    } else {
      mesData = response;
    }

    res.status(200).json({
      code: 200,
      message: "Sukses",
      data: mesData,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createLowonganFavorite = async (req, res) => {
  const { id_deskripsi_lowongan, id_pekerja } = req.body;

  try {
    const lowonganFavorit = await prisma.lowongan_favorite.create({
      data: {
        id_deskripsi_lowongan: id_deskripsi_lowongan,
        id_pekerja: id_pekerja,
      },
    });
    res.status(201).json({
      code: 201,
      message: "Create Lowongan Favorite Sukses",
      data: lowonganFavorit,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteLowonganFavorite = async (req, res) => {
  try {
    const lowonganFavorit = await prisma.lowongan_favorite.delete({
      where: {
        id_lowongan_favorite: Number(req.params.id),
      },
    });
    res.status(200).json({
      code: 200,
      message:
        "Delete id_lowongan_favorite: " +
        lowonganFavorit.id_lowongan_favorite +
        " Sukses",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
