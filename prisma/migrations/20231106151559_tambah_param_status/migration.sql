-- AlterTable
ALTER TABLE `apply_lowongan` ADD COLUMN `status` ENUM('active', 'non_active') NOT NULL DEFAULT 'active';

-- AlterTable
ALTER TABLE `deskripsi_lowongan` ADD COLUMN `status` ENUM('active', 'non_active') NOT NULL DEFAULT 'active';

-- AlterTable
ALTER TABLE `perusahaan` ADD COLUMN `status` ENUM('active', 'non_active') NOT NULL DEFAULT 'active';

-- AlterTable
ALTER TABLE `profil_pekerja` ADD COLUMN `status` ENUM('active', 'non_active') NOT NULL DEFAULT 'active';
