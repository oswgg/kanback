/*
  Warnings:

  - You are about to alter the column `expirates_at` on the `org_invitation_codes` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `org_invitation_codes` MODIFY `expirates_at` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `tasks` ADD COLUMN `begin_date` DATETIME(3) NULL;
