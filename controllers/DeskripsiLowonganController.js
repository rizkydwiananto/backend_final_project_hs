import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getDeskripsiLowongan = async (req, res) => {
  try {
    const response = await prisma.deskripsi_lowongan.findMany();
    res.status(200).json({
      code: 200,
      message: "Sukses",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: error.message,
    });
  }
};

export const getDeskripsiLowonganById = async (req, res) => {
  try {
    const response = await prisma.deskripsi_lowongan.findUnique({
      where: {
        id_deskripsi_lowongan: Number(req.params.id),
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

export const createDeskripsiLowongan = async (req, res) => {
  const {
    judul,
    id_perusahaan,
    alamat_penempatan,
    minimal_pendidikan,
    gaji,
    detail_deskripsi,
    detail_kualifikasi,
    detail_benefit,
    detail_cara_melamar,
    detail_catatan,
    id_perusahaan_add,
  } = req.body;

  try {
    const deskripsi_lowongan = await prisma.deskripsi_lowongan.create({
      data: {
        judul: judul,
        id_perusahaan: Number(id_perusahaan),
        alamat_penempatan: alamat_penempatan,
        minimal_pendidikan: minimal_pendidikan,
        gaji: Number(gaji),
        detail_deskripsi: detail_deskripsi,
        detail_kualifikasi: detail_kualifikasi,
        detail_benefit: detail_benefit,
        detail_cara_melamar: detail_cara_melamar,
        detail_catatan: detail_catatan,
        id_perusahaan_add: Number(id_perusahaan_add),
        created_dttm: new Date(),
      },
    });
    res.status(201).json({
      code: 201,
      message: "Create Deskripsi Lowongan Sukses",
      data: deskripsilowongan,
    });
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: error.message,
    });
  }
};

export const updateDeskripsiLowongan = async (req, res) => {
  const {
    judul,
    id_perusahaan,
    alamat_penempatan,
    minimal_pendidikan,
    gaji,
    detail_deskripsi,
    detail_kualifikasi,
    detail_benefit,
    detail_cara_melamar,
    detail_catatan,
    id_perusahaan_edit,
  } = req.body;

  try {
    const deskripsi_lowongan = await prisma.deskripsi_lowongan.update({
      where: {
        id_deskripsi_lowongan: Number(req.params.id),
      },
      data: {
        judul: judul,
        id_perusahaan: Number(id_perusahaan),
        alamat_penempatan: alamat_penempatan,
        minimal_pendidikan: minimal_pendidikan,
        gaji: Number(gaji),
        detail_deskripsi: detail_deskripsi,
        detail_kualifikasi: detail_kualifikasi,
        detail_benefit: detail_benefit,
        detail_cara_melamar: detail_cara_melamar,
        detail_catatan: detail_catatan,
        id_perusahaan_edit: Number(id_perusahaan_edit),
        created_dttm: new Date(),
      },
    });
    res.status(200).json({
      code: 200,
      message: `Update Deskripsi Lowongan Berhasil`,
      data: deskripsi_lowongan,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteChangesDeskripsiLowongan = async (req, res) => {
  const { id_perusahaan_delete } = req.body;

  try {
    const deskripsi_lowongan = await prisma.deskripsi_lowongan.update({
      where: {
        id_deskripsi_lowongan: Number(req.params.id),
      },
      data: {
        status: "non_active",
        id_perusahaan_delete: Number(id_perusahaan_delete),
        deleted_dttm: new Date(),
      },
    });
    res.status(200).json({
      code: 200,
      message: `Delete (non_active) id_perusahaan ${deskripsi_lowongan.id_perusahaan} berhasil`,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteDataDeskripsiLowongan = async (req, res) => {
  try {
    const deskripsi_lowongan = await prisma.deskripsi_lowongan.delete({
      where: {
        id_deskripsi_lowongan: Number(req.params.id),
      },
    });
    res.status(200).json({
      code: 200,
      message: `Delete id_perusahaan ${deskripsi_lowongan.id_perusahaan} berhasil`,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
