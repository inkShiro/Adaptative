-- CreateTable
CREATE TABLE "ProgresoConcepto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "progreso" REAL NOT NULL,
    "conceptoId" INTEGER NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    CONSTRAINT "ProgresoConcepto_conceptoId_fkey" FOREIGN KEY ("conceptoId") REFERENCES "Concepto" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProgresoConcepto_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProgresoTema" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "progreso" REAL NOT NULL,
    "temaId" INTEGER NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    CONSTRAINT "ProgresoTema_temaId_fkey" FOREIGN KEY ("temaId") REFERENCES "Tema" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProgresoTema_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "ProgresoConcepto_conceptoId_usuarioId_key" ON "ProgresoConcepto"("conceptoId", "usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "ProgresoTema_temaId_usuarioId_key" ON "ProgresoTema"("temaId", "usuarioId");
