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
  try {
    const response = await prisma.apply_lowongan.findMany({
      where: {
        id_pekerja: Number(req.params.id),
      },
    });
    res.status(200).json({
      code: 200,
      message: "Sukses",
      data: response,
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
    res.status(400).json({ message: error.message });
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
