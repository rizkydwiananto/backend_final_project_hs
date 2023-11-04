-- CreateTable
CREATE TABLE `perusahaan` (
    `id_perusahaan` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_perusahaan` VARCHAR(30) NOT NULL,
    `alamat` TEXT NOT NULL,
    `detail_tentang_perusahaan` TEXT NOT NULL,
    `detail_alamat` TEXT NOT NULL,
    `detail_website` VARCHAR(100) NOT NULL,
    `sos_ig` VARCHAR(100) NOT NULL,
    `sos_fb` VARCHAR(100) NOT NULL,
    `sos_linkedin` VARCHAR(100) NOT NULL,
    `sos_x` VARCHAR(100) NOT NULL,
    `id_perusahaan_add` INTEGER NULL,
    `created_dttm` DATETIME(3) NULL,
    `id_perusahaan_edit` INTEGER NULL,
    `edited_dttm` DATETIME(3) NULL,
    `id_perusahaan_delete` INTEGER NULL,
    `deleted_dttm` DATETIME(3) NULL,

    PRIMARY KEY (`id_perusahaan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `apply_lowongan` (
    `id_apply_lowongan` INTEGER NOT NULL AUTO_INCREMENT,
    `id_deskripsi_lowongan` INTEGER NULL,
    `id_pekerja` INTEGER NULL,
    `keterangan` VARCHAR(15) NOT NULL,
    `catatan` TEXT NULL,
    `id_perusahaan_add` INTEGER NULL,
    `created_dttm` DATETIME(3) NULL,
    `id_perusahaan_edit` INTEGER NULL,
    `edited_dttm` DATETIME(3) NULL,
    `id_perusahaan_delete` INTEGER NULL,
    `deleted_dttm` DATETIME(3) NULL,

    PRIMARY KEY (`id_apply_lowongan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `deskripsi_lowongan` (
    `deskripsi_lowongan` INTEGER NOT NULL AUTO_INCREMENT,
    `id_deskripsi_lowongan` INTEGER NULL,
    `judul` VARCHAR(100) NOT NULL,
    `id_perusahaan` INTEGER NULL,
    `alamat_penempatan` TEXT NOT NULL,
    `minimal_pendidikan` VARCHAR(100) NOT NULL,
    `gaji` INTEGER NULL,
    `detail_deskripsi` TEXT NOT NULL,
    `detail_kualifikasi` TEXT NOT NULL,
    `detail_benefit` TEXT NOT NULL,
    `detail_cara_melamar` TEXT NOT NULL,
    `detail_catatan` TEXT NOT NULL,
    `id_perusahaan_add` INTEGER NULL,
    `created_dttm` DATETIME(3) NULL,
    `id_perusahaan_edit` INTEGER NULL,
    `edited_dttm` DATETIME(3) NULL,
    `id_perusahaan_delete` INTEGER NULL,
    `deleted_dttm` DATETIME(3) NULL,

    PRIMARY KEY (`deskripsi_lowongan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
