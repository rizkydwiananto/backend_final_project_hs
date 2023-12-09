/*
  Warnings:

  - The primary key for the `deskripsi_lowongan` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `deskripsi_lowongan` on the `deskripsi_lowongan` table. All the data in the column will be lost.
  - You are about to drop the column `id_perusahaan_add` on the `perusahaan` table. All the data in the column will be lost.
  - Made the column `id_deskripsi_lowongan` on table `deskripsi_lowongan` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `email` to the `perusahaan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nomor_wa` to the `perusahaan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `perusahaan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `deskripsi_lowongan` DROP PRIMARY KEY,
    DROP COLUMN `deskripsi_lowongan`,
    MODIFY `id_deskripsi_lowongan` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id_deskripsi_lowongan`);

-- AlterTable
ALTER TABLE `perusahaan` DROP COLUMN `id_perusahaan_add`,
    ADD COLUMN `email` VARCHAR(100) NOT NULL,
    ADD COLUMN `nomor_wa` VARCHAR(20) NOT NULL,
    ADD COLUMN `password` TEXT NOT NULL;
