/*
  Warnings:

  - You are about to alter the column `keterangan` on the `apply_lowongan` table. The data in that column could be lost. The data in that column will be cast from `VarChar(15)` to `Enum(EnumId(1))`.

*/
-- AlterTable
ALTER TABLE `apply_lowongan` MODIFY `keterangan` ENUM('send_company', 'accepted', 'not_accepted') NOT NULL DEFAULT 'send_company';
