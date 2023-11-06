-- AlterTable
ALTER TABLE `profil_pekerja` MODIFY `id_pekerja_edit` INTEGER NULL,
    MODIFY `id_pekerja_delete` INTEGER NULL;

-- CreateTable
CREATE TABLE `lowongan_favorite` (
    `id_lowongan_favorite` INTEGER NOT NULL AUTO_INCREMENT,
    `id_deskripsi_lowongan` INTEGER NOT NULL,
    `id_pekerja` INTEGER NOT NULL,

    PRIMARY KEY (`id_lowongan_favorite`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
