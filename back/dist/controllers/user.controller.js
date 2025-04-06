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
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.registerUser = void 0;
const catchedController_1 = require("../utils/catchedController");
const user_service_1 = require("../services/user.service");
exports.registerUser = (0, catchedController_1.catchedController)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, name, address, phone } = req.body;
    const newUser = yield (0, user_service_1.registerUserService)({
        email,
        password,
        name,
        address,
        phone,
    });
    res.status(201).send(newUser);
}));
exports.login = (0, catchedController_1.catchedController)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield (0, user_service_1.loginUserService)({ email, password });
    res.status(200).send({
        login: true,
        user: user.user,
        token: user.token,
    });
}));
