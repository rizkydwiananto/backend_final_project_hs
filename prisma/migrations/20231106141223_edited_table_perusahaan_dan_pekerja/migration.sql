/*
  Warnings:

  - Added the required column `foto_perusahaan` to the `perusahaan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `perusahaan` ADD COLUMN `foto_perusahaan` VARCHAR(200) NOT NULL;

-- AlterTable
ALTER TABLE `profil_pekerja` ADD COLUMN `foto_pekerja` VARCHAR(200) NULL;
