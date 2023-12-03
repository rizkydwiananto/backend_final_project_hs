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

  //cek apakah sudah favorite lowongan atau belum
  const isHasFavoriteLowongan = await prisma.lowongan_favorite.findFirst({
    where: {
      id_deskripsi_lowongan: id_deskripsi_lowongan,
      id_pekerja: id_pekerja,
    },
  });

  if (!isHasFavoriteLowongan) {
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
      res.status(400).json({ code: 400, message: error.message });
    }
  } else {
    res.status(400).json({
      code: 400,
      message: "Anda sudah memiliki favorit untuk pekerjaan ini",
    });
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

export const getLowonganFavoritByIdPekerja = async (req, res) => {
  //get Link
  const url_link = new URL(`${req.protocol}://${req.get("host")}`);

  try {
    const response = await prisma.lowongan_favorite.findMany({
      where: {
        id_pekerja: Number(req.params.id),
      },
    });

    const dataMappingLowonganFavoriteByIdPekerja = response.map(
      async (item) => {
        //getDeskripsiLowongan
        const getDeskripsiLowongan = await prisma.deskripsi_lowongan.findUnique(
          {
            where: {
              id_deskripsi_lowongan: item.id_deskripsi_lowongan,
            },
          }
        );

        //getPerusahaan
        const id_perusahaan = getDeskripsiLowongan.id_perusahaan;
        const getPerusahaan = await prisma.perusahaan.findUnique({
          where: {
            id_perusahaan: id_perusahaan,
          },
        });

        const result = {
          id_lowongan_favorite: item.id_lowongan_favorite,
          id_deskripsi_lowongan: item.id_deskripsi_lowongan,
          id_pekerja: item.id_pekerja,
          judulLowongan: getDeskripsiLowongan.judul,
          detailLowongan: getDeskripsiLowongan.detail_deskripsi,
          alamatLowongan: getDeskripsiLowongan.alamat_penempatan,
          id_perusahaan: id_perusahaan,
          nm_Perusahaan: getPerusahaan.nama_perusahaan,
          foto_Perusahaan: url_link + "" + getPerusahaan.foto_perusahaan,
        };

        return result;
      }
    );

    res.status(200).json({
      code: 200,
      message: "Sukses",
      data: await Promise.all(dataMappingLowonganFavoriteByIdPekerja),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getTotalLowonganFavoritByIdPekerja = async (req, res) => {
  try {
    const response = await prisma.lowongan_favorite.aggregate({
      where: {
        id_pekerja: Number(req.params.id),
      },
      _count: {
        id_pekerja: true,
      },
    });

    res.status(200).json({
      code: 200,
      message: "Sukses",
      data: {
        id_pekerja: Number(req.params.id),
        totalLowonganFavorite: response._count.id_pekerja,
      },
    });
  } catch (error) {
    res.status(404).json({ code: 404, message: error.message });
  }
};
