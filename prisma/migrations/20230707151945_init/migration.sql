-- CreateTable
CREATE TABLE "ruc" (
    "ruc_id" SERIAL NOT NULL,
    "ruc_nombre" VARCHAR NOT NULL,
    "ruc_ci" INTEGER NOT NULL,
    "ruc_dv" INTEGER NOT NULL,
    "ruc_estado" VARCHAR,
    "ruc_adicional" VARCHAR,

    CONSTRAINT "ruc_pk" PRIMARY KEY ("ruc_id")
);
