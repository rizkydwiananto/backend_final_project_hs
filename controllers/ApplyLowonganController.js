import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getApplyLowongan = async (req, res) => {
  try {
    const response = await prisma.apply_lowongan.findMany();
    res.status(200).json({
      code: 200,
      message: "Sukses",
      data: response,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getApplyLowonganByIdPekerja = async (req, res) => {
  //get Link
  const url_link = new URL(`${req.protocol}://${req.get("host")}`);

  try {
    const response = await prisma.apply_lowongan.findMany({
      where: {
        id_pekerja: Number(req.params.id),
      },
    });

    const dataMappingApplyByIDPekerja = response.map(async (item) => {
      //getPerusahaan
      const getPerusahaan = await prisma.perusahaan.findUnique({
        where: {
          id_perusahaan: item.id_perusahaan_add,
        },
      });

      //getDeskripsiLowongan
      const getDeskripsiLowonganById =
        await prisma.deskripsi_lowongan.findUnique({
          where: {
            id_deskripsi_lowongan: item.id_deskripsi_lowongan,
          },
        });

      const result = {
        id_apply_lowongan: item.id_apply_lowongan,
        id_deskripsi_lowongan: item.id_deskripsi_lowongan,
        id_pekerja: item.id_pekerja,
        keterangan: item.keterangan,
        catatan: item.catatan,
        id_perusahaan_add: item.id_perusahaan_add,
        created_dttm: item.created_dttm,
        id_perusahaan_edit: item.id_perusahaan_edit,
        edited_dttm: item.edited_dttm,
        id_perusahaan_delete: item.id_perusahaan_delete,
        deleted_dttm: item.deleted_dttm,
        status: item.status,
        // judul_lowongan: getDeskripsiLowonganById.judul,
        // deskripsi_lowongan: getDeskripsiLowonganById.detail_deskripsi,
        nama_perusahaan: getPerusahaan.nama_perusahaan,
        foto_perusahaan: url_link + "" + getPerusahaan.foto_perusahaan,
      };

      return result;
    });

    res.status(200).json({
      code: 200,
      message: "Sukses",
      data: await Promise.all(dataMappingApplyByIDPekerja),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getApplyLowonganById = async (req, res) => {
  const url_link = new URL(`${req.protocol}://${req.get("host")}`);

  try {
    const response = await prisma.apply_lowongan.findUnique({
      where: {
        id_apply_lowongan: Number(req.params.id),
      },
    });

    const dataDeskripsiLowongan = await prisma.deskripsi_lowongan.findUnique({
      where: {
        id_deskripsi_lowongan: response.id_deskripsi_lowongan,
      },
    });

    const fotoPerusahaan = await prisma.perusahaan.findUnique({
      where: {
        id_perusahaan: dataDeskripsiLowongan.id_perusahaan,
      },
    });

    res.status(200).json({
      code: 200,
      message: "Sukses",
      data: {
        id_apply_lowongan: response.id_apply_lowongan,
        id_deskripsi_lowongan: response.id_deskripsi_lowongan,
        id_pekerja: response.id_pekerja,
        keterangan: response.keterangan,
        catatan: response.catatan,
        id_perusahaan_add: response.id_perusahaan_add,
        created_dttm: response.created_dttm,
        id_perusahaan_edit: response.id_perusahaan_edit,
        edited_dttm: response.edited_dttm,
        id_perusahaan_delete: response.id_perusahaan_delete,
        deleted_dttm: response.deleted_dttm,
        status: response.status,
        detailDeskripsiLowongan: dataDeskripsiLowongan,
        fotoPerusahaan: url_link + "" + fotoPerusahaan.foto_perusahaan,
      },
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createApplyLowongan = async (req, res) => {
  const { id_deskripsi_lowongan, id_pekerja, catatan, id_perusahaan_add } =
    req.body;

  //Cek Jika idPekerja dan idDeskripsiLowongan sudah pernah daftar
  const ishasApplied = await prisma.apply_lowongan.findFirst({
    where: {
      id_pekerja: Number(id_pekerja),
      id_deskripsi_lowongan: Number(id_deskripsi_lowongan),
    },
  });

  // res.status(201).json({
  //   code: 201,
  //   message: ishasApplied,
  // });

  if (!ishasApplied) {
    try {
      const applyLowongan = await prisma.apply_lowongan.create({
        data: {
          id_deskripsi_lowongan: Number(id_deskripsi_lowongan),
          id_pekerja: Number(id_pekerja),
          catatan: catatan,
          id_perusahaan_add: Number(id_perusahaan_add),
          created_dttm: new Date(),
        },
      });
      res.status(201).json({
        code: 201,
        message: "Create Apply Lowongan Sukses",
        data: applyLowongan,
      });
    } catch (error) {
      res.status(400).json({ code: 400, message: error.message });
    }
  } else {
    res
      .status(400)
      .json({ code: 400, message: "Anda sudah pernah melamar pekerjaan ini" });
  }
};

export const updateApplyLowongan = async (req, res) => {
  const {
    id_deskripsi_lowongan,
    id_pekerja,
    keterangan,
    catatan,
    id_perusahaan_edit,
  } = req.body;

  try {
    const apply_lowongan = await prisma.apply_lowongan.update({
      where: {
        id_apply_lowongan: Number(req.params.id),
      },
      data: {
        id_deskripsi_lowongan: Number(id_deskripsi_lowongan),
        id_pekerja: Number(id_pekerja),
        keterangan: keterangan,
        catatan: catatan,
        id_perusahaan_edit: Number(id_perusahaan_edit),
        edited_dttm: new Date(),
      },
    });
    res.status(200).json({
      code: 200,
      message: "Update Apply Lowongan Sukses",
      data: apply_lowongan,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteChangesApplyLowongan = async (req, res) => {
  const { id_perusahaan_delete, catatan, status } = req.body;

  try {
    const apply_lowongan = await prisma.apply_lowongan.update({
      where: {
        id_apply_lowongan: Number(req.params.id),
      },
      data: {
        id_perusahaan_delete: Number(id_perusahaan_delete),
        catatan: catatan,
        status: status,
      },
    });
    res.status(200).json({
      code: 200,
      message: "Deleted Apply Lowongan Sukses",
      data: apply_lowongan,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getTotalApplyLowonganFavoritByIdPekerja = async (req, res) => {
  try {
    const response = await prisma.apply_lowongan.aggregate({
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
        totalApplyLowonganFavorite: response._count.id_pekerja,
      },
    });
  } catch (error) {
    res.status(404).json({ code: 404, message: error.message });
  }
};
