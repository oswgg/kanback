/*
  Warnings:

  - You are about to drop the `OrgInvitationCodes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Organization` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `OrgInvitationCodes` DROP FOREIGN KEY `OrgInvitationCodes_id_user_claimed_fkey`;

-- DropForeignKey
ALTER TABLE `OrgInvitationCodes` DROP FOREIGN KEY `OrgInvitationCodes_organization_uuid_fkey`;

-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_organization_uuid_fkey`;

-- DropForeignKey
ALTER TABLE `project_members` DROP FOREIGN KEY `project_members_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `projects` DROP FOREIGN KEY `projects_created_by_user_fkey`;

-- DropForeignKey
ALTER TABLE `projects` DROP FOREIGN KEY `projects_organization_uuid_fkey`;

-- DropTable
DROP TABLE `OrgInvitationCodes`;

-- DropTable
DROP TABLE `Organization`;

-- DropTable
DROP TABLE `User`;

-- CreateTable
CREATE TABLE `organizations` (
    `uuid` VARCHAR(191) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `image_url` VARCHAR(191) NULL,
    `welcome_text` MEDIUMTEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `org_invitation_codes` (
    `organization_uuid` VARCHAR(36) NOT NULL,
    `organization_name` VARCHAR(100) NOT NULL,
    `code` VARCHAR(8) NOT NULL,
    `expirates_at` DATETIME NOT NULL,
    `id_user_claimed` INTEGER NULL,
    `claimed_at` DATETIME(3) NULL,

    UNIQUE INDEX `org_invitation_codes_id_user_claimed_key`(`id_user_claimed`),
    PRIMARY KEY (`organization_uuid`, `code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `organization_uuid` VARCHAR(36) NULL,
    `username` VARCHAR(50) NOT NULL,
    `first_name` VARCHAR(50) NOT NULL,
    `last_name` VARCHAR(50) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `age` INTEGER UNSIGNED NULL,
    `sex` TINYINT UNSIGNED NULL,
    `role` ENUM('none', 'admin', 'member') NOT NULL,
    `language` ENUM('es', 'en') NOT NULL DEFAULT 'en',
    `image_url` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `projects` ADD CONSTRAINT `projects_organization_uuid_fkey` FOREIGN KEY (`organization_uuid`) REFERENCES `organizations`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `projects` ADD CONSTRAINT `projects_created_by_user_fkey` FOREIGN KEY (`created_by_user`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `project_members` ADD CONSTRAINT `project_members_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `org_invitation_codes` ADD CONSTRAINT `org_invitation_codes_organization_uuid_fkey` FOREIGN KEY (`organization_uuid`) REFERENCES `organizations`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `org_invitation_codes` ADD CONSTRAINT `org_invitation_codes_id_user_claimed_fkey` FOREIGN KEY (`id_user_claimed`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_organization_uuid_fkey` FOREIGN KEY (`organization_uuid`) REFERENCES `organizations`(`uuid`) ON DELETE SET NULL ON UPDATE CASCADE;
