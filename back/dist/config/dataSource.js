"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const envs_1 = require("./envs");
const User_1 = require("../entities/User");
const Credential_1 = require("../entities/Credential");
const Order_1 = require("../entities/Order");
const Category_1 = require("../entities/Category");
const Product_1 = require("../entities/Product");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: envs_1.DB_HOST,
    port: envs_1.DB_PORT,
    username: envs_1.DB_USERNAME,
    password: envs_1.DB_PASSWORD,
    database: envs_1.DB_DATABASE,
    synchronize: true,
    // dropSchema: true,
    logging: false,
    entities: [User_1.User, Credential_1.Credential, Order_1.Order, Product_1.Product, Category_1.Category],
    subscribers: [],
    migrations: [],
});
