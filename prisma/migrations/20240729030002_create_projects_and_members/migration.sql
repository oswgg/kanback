/*
  Warnings:

  - You are about to alter the column `expirates_at` on the `OrgInvitationCodes` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `OrgInvitationCodes` MODIFY `expirates_at` DATETIME NOT NULL;

-- CreateTable
CREATE TABLE `projects` (
    `code_id` VARCHAR(8) NOT NULL,
    `organization_uuid` VARCHAR(36) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `image_url` VARCHAR(191) NULL,
    `description` MEDIUMTEXT NULL,
    `welcome_text` MEDIUMTEXT NULL,
    `created_by_user` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`code_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `project_members` (
    `project_code_id` VARCHAR(8) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `role` ENUM('admin', 'member') NOT NULL,

    UNIQUE INDEX `project_members_project_code_id_user_id_key`(`project_code_id`, `user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `projects` ADD CONSTRAINT `projects_organization_uuid_fkey` FOREIGN KEY (`organization_uuid`) REFERENCES `Organization`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `projects` ADD CONSTRAINT `projects_created_by_user_fkey` FOREIGN KEY (`created_by_user`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `project_members` ADD CONSTRAINT `project_members_project_code_id_fkey` FOREIGN KEY (`project_code_id`) REFERENCES `projects`(`code_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `project_members` ADD CONSTRAINT `project_members_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
