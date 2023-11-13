import { PrismaClient } from "@prisma/client";
import { hash } from "../utils/hasPassword.js";
import { verifiedPass } from "../utils/verifiedPassword.js";
import { getToken } from "../utils/jwtModule.js";

const prisma = new PrismaClient();

export const getProfilPekerja = async (req, res) => {
  try {
    const response = await prisma.profil_pekerja.findMany();
    res.status(200).json({
      code: 200,
      message: "Sukses",
      data: response,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProfilPekerjaById = async (req, res) => {
  try {
    const response = await prisma.profil_pekerja.findUnique({
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
        password: hash(password),
      },
    });
    res.status(201).json({
      code: 201,
      message: "Create Profil Pekerja Sukses",
      data: profilPekerja,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateProfilPekerja = async (req, res) => {
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
    id_pekerja_edit,
  } = req.body;

  try {
    const profil_pekerja = await prisma.profil_pekerja.update({
      where: {
        id_pekerja: Number(req.params.id),
      },
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
        id_pekerja_edit: Number(id_pekerja_edit),
        edited_dttm: new Date(),
      },
    });
    res.status(200).json({
      code: 200,
      message:
        "Update dengan nama " +
        profil_pekerja.nama_depan +
        " " +
        profil_pekerja.nama_belakang +
        " berhasil!",
      data: profil_pekerja,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteTesProfilPekerja = async (req, res) => {
  try {
    const profil_pekerja = await prisma.profil_pekerja.delete({
      where: {
        id_pekerja: Number(req.params.id),
      },
    });
    res.status(200).json({
      code: 200,
      message: "Delete id_pekerja: " + profil_pekerja.id_pekerja + " Sukses",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteChangesProfilPekerja = async (req, res) => {
  const { id_pekerja_delete } = req.body;

  try {
    const profil_pekerja = await prisma.profil_pekerja.update({
      where: {
        id_pekerja: Number(req.params.id),
      },
      data: {
        status: "non_active",
        id_pekerja_delete: Number(id_pekerja_delete),
        deleted_dttm: new Date(),
      },
    });
    res.status(200).json({
      code: 200,
      message:
        "Delete Status id_pekerja: " + profil_pekerja.id_pekerja + " Sukses",
      data: profil_pekerja,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const loginPekerja = async (req, res) => {
  const { email, password } = req.body;

  //email tidak boleh kosong
  if (!email) {
    return res.status(404).json({ message: "email tidak boleh kosong" });
  }

  //password tidak boleh kosong
  if (!password) {
    return res.status(404).json({ message: "password tidak boleh kosong" });
  }

  //get Query dari data profil pekerja
  const cekEmail = await prisma.profil_pekerja.findUnique({
    where: {
      email: email,
    },
  });

  //tess
  //return res.status(201).json({ cekEmail });

  //cek apabila tidak ada email yg dimaksud
  if (!cekEmail) {
    return res.status(404).json({ message: "email tidak ditemukan" });
  }

  //cek jika password valid
  const isPasswordValid = verifiedPass(password, cekEmail.password);
  if (isPasswordValid) {
    const payload = {
      nama_depan: cekEmail.nama_depan,
      nama_belakang: cekEmail.nama_belakang,
      email: cekEmail.email,
      profesi: cekEmail.profesi,
      panggilan: cekEmail.panggilan,
      tempat_lahir: cekEmail.tempat_lahir,
      tanggal_lahir: cekEmail.tanggal_lahir,
      jns_kel: cekEmail.jns_kel,
      nomor_hp: cekEmail.nomor_hp,
      domisili: cekEmail.domisili,
      detail_tentang_saya: cekEmail.detail_tentang_saya,
      foto_pekerja: cekEmail.foto_pekerja,
    };

    const token = getToken(payload);

    return res.status(201).json({
      code: 201,
      message: "Sukses",
      data: payload,
      token: token,
    });
  } else {
    return res.status(403).json({
      message: "Password Salah",
    });
  }
};
