"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
app.use(morgan('dev'));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use(cors());
app.get(`/ruc/:ruc`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ruc } = req.params;
    const listadoArray = ruc === null || ruc === void 0 ? void 0 : ruc.split(';');
    const query = listadoArray === null || listadoArray === void 0 ? void 0 : listadoArray.map(item => ({
        ruc_numero: +item
    }));
    try {
        const contribuyentes = yield prisma.ruc.findMany({
            where: {
                OR: query
            },
            orderBy: {
                ruc_numero: 'desc'
            }
        });
        res.json(contribuyentes);
    }
    catch (error) {
        res.status(500).json({ msg: 'error en el servidor' });
    }
}));
app.get(`/ruc/razon-social/:datos`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { datos } = req.params;
    const listadoArray = datos === null || datos === void 0 ? void 0 : datos.split(';');
    const query = listadoArray === null || listadoArray === void 0 ? void 0 : listadoArray.map(item => ({
        ruc_nombre: {
            contains: item,
            mode: client_1.Prisma.QueryMode.insensitive
        }
    }));
    try {
        const contribuyentes = yield prisma.ruc.findMany({
            where: {
                OR: query
            },
            orderBy: {
                ruc_numero: 'desc'
            }
        });
        res.json(contribuyentes);
    }
    catch (error) {
        res.status(500).json({ msg: 'error en el servidor' });
    }
}));
app.get(`/ruc/full/:datos`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { datos } = req.params;
    const listadoArray = datos === null || datos === void 0 ? void 0 : datos.split(';');
    const query = listadoArray === null || listadoArray === void 0 ? void 0 : listadoArray.map(item => ({
        fulltext: {
            contains: item,
            mode: client_1.Prisma.QueryMode.insensitive
        }
    }));
    try {
        console.log('entro en await');
        const contribuyentes = yield prisma.v_ruc.findMany({
            where: {
                OR: query
            },
            orderBy: {
                ruc_numero: 'asc'
            }
        });
        res.json(contribuyentes);
    }
    catch (error) {
        res.status(500).json({ msg: 'error en el servidor' });
    }
}));
const server = app.listen(process.env.PORT, () => {
    console.log(`Api server runing in port ${process.env.PORT}`);
});
