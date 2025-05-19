-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_job" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fileId" INTEGER NOT NULL,
    "job_type" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "error_message" TEXT,
    "started_at" DATETIME,
    "completed_at" DATETIME
);
INSERT INTO "new_job" ("completed_at", "error_message", "fileId", "id", "job_type", "started_at", "status") SELECT "completed_at", "error_message", "fileId", "id", "job_type", "started_at", "status" FROM "job";
DROP TABLE "job";
ALTER TABLE "new_job" RENAME TO "job";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
