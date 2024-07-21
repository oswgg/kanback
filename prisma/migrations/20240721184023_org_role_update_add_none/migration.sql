-- AlterTable
ALTER TABLE `User` MODIFY `role` ENUM('none', 'admin', 'member') NOT NULL;
