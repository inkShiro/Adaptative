-- CreateTable
CREATE TABLE "Concepto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "concepto" TEXT NOT NULL,
    "descripcion" TEXT,
    "temaId" INTEGER NOT NULL,
    CONSTRAINT "Concepto_temaId_fkey" FOREIGN KEY ("temaId") REFERENCES "Tema" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
