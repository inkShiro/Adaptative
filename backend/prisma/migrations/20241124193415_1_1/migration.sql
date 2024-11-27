/*
  Warnings:

  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "TipoDeAprendizaje" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tipoDeAprendizaje" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "TipoDePregunta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tipoDePregunta" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Tema" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tema" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Area" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "area" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Dificultad" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nivel" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Pregunta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pregunta" TEXT NOT NULL,
    "opciones" TEXT,
    "respuesta" TEXT,
    "explicacion" TEXT,
    "tipoDeAprendizajeId" INTEGER NOT NULL,
    "tipoDePreguntaId" INTEGER NOT NULL,
    "temaId" INTEGER NOT NULL,
    "areaId" INTEGER NOT NULL,
    "dificultadId" INTEGER NOT NULL,
    CONSTRAINT "Pregunta_tipoDeAprendizajeId_fkey" FOREIGN KEY ("tipoDeAprendizajeId") REFERENCES "TipoDeAprendizaje" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Pregunta_tipoDePreguntaId_fkey" FOREIGN KEY ("tipoDePreguntaId") REFERENCES "TipoDePregunta" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Pregunta_temaId_fkey" FOREIGN KEY ("temaId") REFERENCES "Tema" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Pregunta_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "Area" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Pregunta_dificultadId_fkey" FOREIGN KEY ("dificultadId") REFERENCES "Dificultad" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "EstadisticaDeRespuesta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tiempoDeRespuesta" REAL NOT NULL,
    "correcta" BOOLEAN NOT NULL,
    "puntuacion" INTEGER NOT NULL,
    "fecha" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "preguntaId" INTEGER NOT NULL,
    CONSTRAINT "EstadisticaDeRespuesta_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "EstadisticaDeRespuesta_preguntaId_fkey" FOREIGN KEY ("preguntaId") REFERENCES "Pregunta" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Credenciales" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Credenciales_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fullName" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "dateOfBirth" DATETIME,
    "phoneNumber" TEXT,
    "address" TEXT,
    "city" TEXT,
    "school" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("address", "city", "createdAt", "dateOfBirth", "fullName", "id", "phoneNumber", "role", "school", "updatedAt") SELECT "address", "city", "createdAt", "dateOfBirth", "fullName", "id", "phoneNumber", "role", "school", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Credenciales_email_key" ON "Credenciales"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Credenciales_userId_key" ON "Credenciales"("userId");
