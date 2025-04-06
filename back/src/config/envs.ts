import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 3001;
export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_PORT = parseInt(process.env.DB_PORT || "5432");
export const DB_USERNAME = process.env.DB_USERNAME || "postgres";
export const DB_PASSWORD = process.env.DB_PASSWORD || "";
export const DB_DATABASE = process.env.DB_DATABASE || "henry_m4";
export const JWT_SECRET = process.env.JWT_SECRET || "secret";
