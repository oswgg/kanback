-- CreateTable
CREATE TABLE `OrgInvitationCodes` (
    `organization_uuid` VARCHAR(36) NOT NULL,
    `organization_name` VARCHAR(100) NOT NULL,
    `code` VARCHAR(8) NOT NULL,
    `expirates_at` DATETIME NOT NULL,
    `id_user_claimed` INTEGER NULL,
    `claimed_at` DATETIME(3) NULL,

    UNIQUE INDEX `OrgInvitationCodes_id_user_claimed_key`(`id_user_claimed`),
    PRIMARY KEY (`organization_uuid`, `code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `OrgInvitationCodes` ADD CONSTRAINT `OrgInvitationCodes_organization_uuid_fkey` FOREIGN KEY (`organization_uuid`) REFERENCES `Organization`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrgInvitationCodes` ADD CONSTRAINT `OrgInvitationCodes_id_user_claimed_fkey` FOREIGN KEY (`id_user_claimed`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
