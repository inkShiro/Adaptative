-- CreateTable
CREATE TABLE "RendimientoDeAprendizaje" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "aprendizajeVisual" REAL NOT NULL,
    "aprendizajeAuditivo" REAL NOT NULL,
    "aprendizajeKinestesico" REAL NOT NULL,
    "aprendizajeLecturaEscritura" REAL NOT NULL,
    "aprendizajeSecuencial" REAL NOT NULL,
    "aprendizajeGlobal" REAL NOT NULL,
    "aprendizajeActivo" REAL NOT NULL,
    "aprendizajeReflexivo" REAL NOT NULL,
    "aprendizajeSocial" REAL NOT NULL,
    "aprendizajeIndividual" REAL NOT NULL,
    CONSTRAINT "RendimientoDeAprendizaje_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "RendimientoDeAprendizaje_userId_key" ON "RendimientoDeAprendizaje"("userId");
