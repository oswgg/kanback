/*
  Warnings:

  - You are about to alter the column `expirates_at` on the `org_invitation_codes` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `org_invitation_codes` MODIFY `expirates_at` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `role` ENUM('none', 'admin', 'manager', 'member') NOT NULL;

-- CreateTable
CREATE TABLE `teams` (
    `code_id` VARCHAR(8) NOT NULL,
    `organization_uuid` VARCHAR(36) NOT NULL,
    `project_code_id` VARCHAR(8) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `image_url` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`code_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `team_members` (
    `team_code_id` VARCHAR(8) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `role` ENUM('admin', 'manager', 'member') NOT NULL,

    UNIQUE INDEX `team_members_team_code_id_user_id_key`(`team_code_id`, `user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tasks` (
    `uuid` VARCHAR(191) NOT NULL,
    `project_code_id` VARCHAR(8) NOT NULL,
    `team_code_id` VARCHAR(8) NOT NULL,
    `id_user_responsible` INTEGER NOT NULL,
    `title` VARCHAR(100) NOT NULL,
    `description` MEDIUMTEXT NULL,
    `due_date` DATETIME(3) NULL,
    `priority` ENUM('low', 'medium', 'high') NULL,
    `status` ENUM('pending', 'in_progress', 'completed') NOT NULL DEFAULT 'pending',

    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `teams` ADD CONSTRAINT `teams_organization_uuid_fkey` FOREIGN KEY (`organization_uuid`) REFERENCES `organizations`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `teams` ADD CONSTRAINT `teams_project_code_id_fkey` FOREIGN KEY (`project_code_id`) REFERENCES `projects`(`code_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `team_members` ADD CONSTRAINT `team_members_team_code_id_fkey` FOREIGN KEY (`team_code_id`) REFERENCES `teams`(`code_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `team_members` ADD CONSTRAINT `team_members_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tasks` ADD CONSTRAINT `tasks_project_code_id_fkey` FOREIGN KEY (`project_code_id`) REFERENCES `projects`(`code_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tasks` ADD CONSTRAINT `tasks_team_code_id_fkey` FOREIGN KEY (`team_code_id`) REFERENCES `teams`(`code_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tasks` ADD CONSTRAINT `tasks_id_user_responsible_fkey` FOREIGN KEY (`id_user_responsible`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
