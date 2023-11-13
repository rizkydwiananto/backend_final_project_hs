import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getDeskripsiLowongan = async (req, res) => {
  //get Link
  const url_link = new URL(`${req.protocol}://${req.get("host")}`);

  try {
    const response = await prisma.deskripsi_lowongan.findMany();

    const dataMapingDeskLow = response.map(async (item) => {
      //getPerusahaan
      const getPerusahaan = await prisma.perusahaan.findUnique({
        where: {
          id_perusahaan: item.id_perusahaan,
        },
      });

      const result = {
        id_deskripsi_lowongan: item.id_deskripsi_lowongan,
        judul: item.judul,
        id_perusahaan: item.id_perusahaan,
        alamat_penempatan: item.alamat_penempatan,
        minimal_pendidikan: item.minimal_pendidikan,
        gaji: item.gaji,
        detail_deskripsi: item.detail_deskripsi,
        detail_kualifikasi: item.detail_kualifikasi,
        detail_benefit: item.detail_benefit,
        detail_cara_melamar: item.detail_cara_melamar,
        detail_catatan: item.detail_catatan,
        id_perusahaan_add: item.id_perusahaan_add,
        created_dttm: item.created_dttm,
        id_perusahaan_edit: item.id_perusahaan_edit,
        edited_dttm: item.edited_dttm,
        id_perusahaan_delete: item.id_perusahaan_delete,
        deleted_dttm: item.deleted_dttm,
        status: item.status,
        foto_perusahaan: url_link + "" + getPerusahaan.foto_perusahaan,
      };

      return result;
    });

    res.status(200).json({
      code: 200,
      message: "Sukses",
      data: await Promise.all(dataMapingDeskLow),
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

    const fotoPerusahaan = await prisma.perusahaan.findUnique({
      where: {
        id_perusahaan: response.id_perusahaan,
      },
    });

    res.status(200).json({
      code: 200,
      message: "Sukses",
      data: {
        id_deskripsi_lowongan: response.id_deskripsi_lowongan,
        judul: response.judul,
        id_perusahaan: response.id_perusahaan,
        alamat_penempatan: response.alamat_penempatan,
        minimal_pendidikan: response.minimal_pendidikan,
        gaji: response.gaji,
        detail_deskripsi: response.detail_deskripsi,
        detail_kualifikasi: response.detail_kualifikasi,
        detail_benefit: response.detail_benefit,
        detail_cara_melamar: response.detail_cara_melamar,
        detail_catatan: response.detail_catatan,
        id_perusahaan_add: response.id_perusahaan_add,
        created_dttm: response.created_dttm,
        id_perusahaan_edit: response.id_perusahaan_edit,
        edited_dttm: response.edited_dttm,
        id_perusahaan_delete: response.id_perusahaan_delete,
        deleted_dttm: response.deleted_dttm,
        status: response.status,
        foto_perusahaan: fotoPerusahaan.foto_perusahaan,
      },
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
      data: deskripsi_lowongan,
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
