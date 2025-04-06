"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_router_1 = __importDefault(require("./users.router"));
const orders_router_1 = __importDefault(require("./orders.router"));
const products_router_1 = __importDefault(require("./products.router"));
const router = (0, express_1.Router)();
router.use("/users", users_router_1.default);
router.use("/orders", orders_router_1.default);
router.use("/products", products_router_1.default);
exports.default = router;
