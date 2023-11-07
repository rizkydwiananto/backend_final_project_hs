import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get All Perusahaan data
export const getPerusahaan = async (req, res) => {
  try {
    const response = await prisma.perusahaan.findMany();
    res.status(200).json({
      code: 200,
      message: "Sukses ambil data perusahaan",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: error.message,
    });
  }
};

// Get Perusahaan by id
export const getPerusahaanById = async (req, res) => {
  try {
    const response = await prisma.perusahaan.findUnique({
      where: {
        id_perusahaan: Number(req.params.id),
      },
    });
    res.status(200).json({
      code: 200,
      message: "Sukses ambil data perusahaan",
      data: response,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Create Perusahaan data
export const createPerusahaan = async (req, res) => {
  const {
    nama_perusahaan,
    alamat,
    detail_tentang_perusahaan,
    detail_alamat,
    detail_website,
    sos_ig,
    sos_fb,
    sos_linkedin,
    sos_x,
    id_perusahaan_add,
    foto_perusahaan,
  } = req.body;

  try {
    const perusahaan = await prisma.perusahaan.create({
      data: {
        nama_perusahaan: nama_perusahaan,
        alamat: alamat,
        detail_tentang_perusahaan: detail_tentang_perusahaan,
        detail_alamat: detail_alamat,
        detail_website: detail_website,
        sos_ig: sos_ig,
        sos_fb: sos_fb,
        sos_linkedin: sos_linkedin,
        sos_x: sos_x,
        id_perusahaan_add: Number(id_perusahaan_add),
        foto_perusahaan: foto_perusahaan,
        created_dttm: new Date(),
      },
    });
    res.status(201).json({
      code: 201,
      message: "Create Perusahaan sukses",
      data: perusahaan,
    });
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: error.message,
    });
  }
};

//Update Perusahaan data
export const updatePerusahaan = async (req, res) => {
  const {
    nama_perusahaan,
    alamat,
    detail_tentang_perusahaan,
    detail_alamat,
    detail_website,
    sos_ig,
    sos_fb,
    sos_linkedin,
    sos_x,
    id_perusahaan_edit,
    foto_perusahaan,
  } = req.body;

  try {
    const perusahaan = await prisma.perusahaan.update({
      where: {
        id_perusahaan: Number(req.params.id),
      },
      data: {
        nama_perusahaan: nama_perusahaan,
        alamat: alamat,
        detail_tentang_perusahaan: detail_tentang_perusahaan,
        detail_alamat: detail_alamat,
        detail_website: detail_website,
        sos_ig: sos_ig,
        sos_fb: sos_fb,
        sos_linkedin: sos_linkedin,
        sos_x: sos_x,
        id_perusahaan_edit: Number(id_perusahaan_edit),
        foto_perusahaan: foto_perusahaan,
        edited_dttm: new Date(),
      },
    });
    res.status(200).json({
      code: 200,
      message: `Update profil ${nama_perusahaan} berhasil`,
      data: perusahaan,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Perusahaan (change to non-active)
export const deleteChangesPerusahaan = async (req, res) => {
  const { id_perusahaan_delete } = req.body;

  try {
    const perusahaan = await prisma.perusahaan.update({
      where: {
        id_perusahaan: Number(req.params.id),
      },
      data: {
        status: "non_active",
        id_perusahaan_delete: Number(id_perusahaan_delete),
        deleted_dttm: new Date(),
      },
    });
    res.status(200).json({
      code: 200,
      message: `Delete (non_active) id_perusahaan ${perusahaan.id_perusahaan} berhasil`,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a Perusahaan data
export const deleteDataPerusahaan = async (req, res) => {
  try {
    const perusahaan = await prisma.perusahaan.delete({
      where: {
        id_perusahaan: Number(req.params.id),
      },
    });
    res.status(200).json({
      code: 200,
      message: `Delete id_perusahaan ${perusahaan.id_perusahaan} berhasil`,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
