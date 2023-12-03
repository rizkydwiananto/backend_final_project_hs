import { PrismaClient } from "@prisma/client";
import { hash } from "../utils/hasPassword.js";
import { verifiedPass } from "../utils/verifiedPassword.js";
import { getToken } from "../utils/jwtModule.js";
import fs from "fs";
import { promisify } from "util";

const unlinkAsync = promisify(fs.unlink);

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

    /** j_kel **/
    let j_kel = "";

    if (response.jns_kel == "L") {
      j_kel = "Laki-laki";
    } else {
      j_kel = "Perempuan";
    }
    /** j_kel **/

    /** foto_pekerja **/
    //get Link
    const url_link = new URL(`${req.protocol}://${req.get("host")}`);

    let foto_pekerja = "";
    if (response.foto_pekerja == null) {
      foto_pekerja = url_link + "images/default.png";
    } else {
      foto_pekerja = url_link + "" + response.foto_pekerja;
    }

    const result = {
      id_pekerja: response.id_pekerja,
      nama_depan: response.nama_depan,
      nama_belakang: response.nama_belakang,
      email: response.email,
      profesi: response.profesi,
      panggilan: response.panggilan,
      tempat_lahir: response.tempat_lahir,
      tanggal_lahir: response.tanggal_lahir,
      jns_kel: response.jns_kel,
      j_kel: j_kel,
      nomor_hp: response.nomor_hp,
      domisili: response.domisili,
      detail_tentang_saya: response.detail_tentang_saya,
      password: response.password,
      created_dttm: response.created_dttm,
      id_pekerja_edit: response.id_pekerja_edit,
      edited_dttm: response.edited_dttm,
      id_pekerja_delete: response.id_pekerja_delete,
      deleted_dttm: response.deleted_dttm,
      foto_pekerja: foto_pekerja,
      status: response.status,
    };

    res.status(200).json({
      code: 200,
      message: "Sukses",
      data: result,
    });
  } catch (error) {
    res.status(404).json({ code: 404, message: error.message });
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
  const image = req.file;

  //req.body
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
  } = req.body;

  //getProfil
  const getProfil = await prisma.profil_pekerja.findUnique({
    where: {
      id_pekerja: Number(req.params.id),
    },
  });

  //getFotoProfilLama
  const FotoLama = getProfil.foto_pekerja;

  //Jika File Exist di dalam path
  if (fs.existsSync(FotoLama)) {
    await unlinkAsync(FotoLama);
  }

  if (image) {
    //ada upload Foto

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
          foto_pekerja: image.path.replace("\\", "/"),
          id_pekerja_edit: Number(req.params.id),
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
  } else {
    try {
      //tidak ada upload foto
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
          id_pekerja_edit: Number(req.params.id),
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
          " berhasil Tanpa Foto!",
        data: profil_pekerja,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
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

export const updatePasswordPekerja = async (req, res) => {
  const { email, passwordLama, passwordBaru } = req.body;
  const id_pekerja_edit = req.params.id;

  //email tidak boleh kosong
  if (!email) {
    return res.status(404).json({ message: "email tidak boleh kosong" });
  }

  //passwordLama tidak boleh kosong
  if (!passwordLama) {
    return res
      .status(404)
      .json({ message: "password Lama tidak boleh kosong" });
  }

  //passwordBaru tidak boleh kosong
  if (!passwordBaru) {
    return res
      .status(404)
      .json({ message: "password Baru tidak boleh kosong" });
  }

  //get Query dari data profil pekerja
  const cekEmail = await prisma.profil_pekerja.findUnique({
    where: {
      email: email,
    },
  });

  //cek apabila tidak ada email yg dimaksud
  if (!cekEmail) {
    return res.status(404).json({ message: "email tidak ditemukan" });
  }

  const isPasswordLamaValid = verifiedPass(passwordLama, cekEmail.password);
  if (isPasswordLamaValid) {
    try {
      const profil_pekerja = await prisma.profil_pekerja.update({
        where: {
          id_pekerja: Number(id_pekerja_edit),
          email: email,
        },
        data: {
          password: hash(passwordBaru),
          id_pekerja_edit: Number(id_pekerja_edit),
          edited_dttm: new Date(),
        },
      });
      res.status(200).json({
        code: 200,
        message:
          "Update Password dengan nama " +
          profil_pekerja.nama_depan +
          " " +
          profil_pekerja.nama_belakang +
          " berhasil!",
        data: profil_pekerja,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else {
    return res.status(403).json({
      code: 404,
      message: "Password lama Salah!",
    });
  }
};
