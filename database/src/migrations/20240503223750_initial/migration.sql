-- CreateTable
CREATE TABLE "SoftwareProject" (
    "id" SERIAL NOT NULL,
    "ownerName" VARCHAR(255) NOT NULL,
    "projectName" VARCHAR(255) NOT NULL,
    "description" VARCHAR(1024) NOT NULL,
    "htmlUrl" VARCHAR(1024) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SoftwareProject_pkey" PRIMARY KEY ("id")
);
