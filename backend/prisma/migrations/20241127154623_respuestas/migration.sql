-- CreateTable
CREATE TABLE "SesionDePreguntas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "fechaInicio" DATETIME NOT NULL,
    "fechaFin" DATETIME,
    "usuarioId" INTEGER NOT NULL,
    "tiempoTotal" REAL,
    CONSTRAINT "SesionDePreguntas_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_EstadisticaDeRespuesta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tiempoDeRespuesta" REAL NOT NULL,
    "correcta" BOOLEAN NOT NULL,
    "puntuacion" INTEGER NOT NULL,
    "fecha" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "preguntaId" INTEGER NOT NULL,
    "sesionId" INTEGER,
    "dificultadPercibida" REAL,
    "tiempoTotal" REAL,
    CONSTRAINT "EstadisticaDeRespuesta_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "EstadisticaDeRespuesta_preguntaId_fkey" FOREIGN KEY ("preguntaId") REFERENCES "Pregunta" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "EstadisticaDeRespuesta_sesionId_fkey" FOREIGN KEY ("sesionId") REFERENCES "SesionDePreguntas" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_EstadisticaDeRespuesta" ("correcta", "fecha", "id", "preguntaId", "puntuacion", "tiempoDeRespuesta", "userId") SELECT "correcta", "fecha", "id", "preguntaId", "puntuacion", "tiempoDeRespuesta", "userId" FROM "EstadisticaDeRespuesta";
DROP TABLE "EstadisticaDeRespuesta";
ALTER TABLE "new_EstadisticaDeRespuesta" RENAME TO "EstadisticaDeRespuesta";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
