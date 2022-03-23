-- AlterTable
ALTER TABLE "persons" ALTER COLUMN "version" SET DEFAULT 1,
ALTER COLUMN "version" DROP DEFAULT;
DROP SEQUENCE "persons_version_seq";
