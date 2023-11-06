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

export const getApplyLowonganById = async (req, res) => {
  try {
    const response = await prisma.apply_lowongan.findUnique({
      where: {
        id_apply_lowongan: Number(req.params.id),
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
