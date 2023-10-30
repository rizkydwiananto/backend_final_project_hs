import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProfilPekerja = async (req, res) => {
  try {
    const response = await prisma.profil_pekerja.findMany();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProfilPekerja = async (req, res) => {
  const {
    nama_depan,
    nama_belakang,
    email,
    profesi,
    panggilan,
    tempat_lahir,
    tanggal_lahir,
    jns_kel,
    nomor_hp,
    domisili,
    detail_tentang_saya,
    password,
    id_pekerja_edit,
    id_pekerja_delete,
  } = req.body;

  try {
    const profilPekerja = await prisma.profil_pekerja.create({
      data: {
        nama_depan: nama_depan,
        nama_belakang: nama_belakang,
        email: email,
        profesi: profesi,
        panggilan: panggilan,
        tempat_lahir: tempat_lahir,
        tanggal_lahir: tanggal_lahir,
        jns_kel: jns_kel,
        nomor_hp: nomor_hp,
        domisili: domisili,
        detail_tentang_saya: detail_tentang_saya,
        password: password,
        id_pekerja_edit: id_pekerja_edit,
        id_pekerja_delete: id_pekerja_delete,
      },
    });
    res.status(201).json(profilPekerja);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
