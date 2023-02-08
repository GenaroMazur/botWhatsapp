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
exports.SERVER = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv").config();
class SERVER {
    static get instance() { return this._instance || (this._instance = new this()); }
    constructor() {
        this.app = (0, express_1.default)();
        this.app.locals.users = [];
    }
    init() { return new SERVER(); }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const port = process.env.PORT;
                const urlDb = process.env.URLDB;
                if (port === undefined || urlDb === undefined)
                    throw new Error("-------------- Faltan variables de entorno --------------");
                this.http = this.app.listen(port, () => {
                    console.log(`=============== Servidor en \x1b[32mlinea\x1b[0m Puerto ${port} ===============`);
                });
                this.app.use(express_1.default.json({ limit: "30mb" }));
                this.app.use(express_1.default.urlencoded({ limit: "30mb", extended: true }));
                this.app.use((0, cors_1.default)());
            }
            catch (error) {
                return error;
            }
        });
    }
    close() {
        var _a;
        (_a = this.http) === null || _a === void 0 ? void 0 : _a.close();
    }
}
exports.SERVER = SERVER;
