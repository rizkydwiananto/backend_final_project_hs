-- CreateTable
CREATE TABLE `profil_pekerja` (
    `id_pekerja` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_depan` VARCHAR(20) NOT NULL,
    `nama_belakang` VARCHAR(20) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `profesi` VARCHAR(30) NOT NULL,
    `panggilan` VARCHAR(20) NOT NULL,
    `tempat_lahir` VARCHAR(20) NOT NULL,
    `tanggal_lahir` VARCHAR(10) NOT NULL,
    `jns_kel` ENUM('L', 'P') NOT NULL DEFAULT 'L',
    `nomor_hp` VARCHAR(15) NOT NULL,
    `domisili` VARCHAR(20) NOT NULL,
    `detail_tentang_saya` TEXT NOT NULL,
    `password` VARCHAR(225) NOT NULL,
    `created_dttm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `id_pekerja_edit` INTEGER NOT NULL,
    `edited_dttm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `id_pekerja_delete` INTEGER NOT NULL,
    `deleted_dttm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `profil_pekerja_email_key`(`email`),
    PRIMARY KEY (`id_pekerja`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
