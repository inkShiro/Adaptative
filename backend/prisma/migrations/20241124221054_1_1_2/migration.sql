/*
  Warnings:

  - Added the required column `areaId` to the `Tema` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tema" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tema" TEXT NOT NULL,
    "descripcion" TEXT,
    "areaId" INTEGER NOT NULL,
    CONSTRAINT "Tema_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "Area" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Tema" ("id", "tema") SELECT "id", "tema" FROM "Tema";
DROP TABLE "Tema";
ALTER TABLE "new_Tema" RENAME TO "Tema";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
