"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = exports.DB_DATABASE = exports.DB_PASSWORD = exports.DB_USERNAME = exports.DB_PORT = exports.DB_HOST = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.PORT = process.env.PORT || 3001;
exports.DB_HOST = process.env.DB_HOST || "localhost";
exports.DB_PORT = parseInt(process.env.DB_PORT || "5432");
exports.DB_USERNAME = process.env.DB_USERNAME || "postgres";
exports.DB_PASSWORD = process.env.DB_PASSWORD || "";
exports.DB_DATABASE = process.env.DB_DATABASE || "henry_m4";
exports.JWT_SECRET = process.env.JWT_SECRET || "secret";
