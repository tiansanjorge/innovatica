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
exports.getProductsService = exports.checkProductExists = void 0;
const product_repository_1 = require("../repositories/product.repository");
const checkProductExists = (itemId) => __awaiter(void 0, void 0, void 0, function* () {
    const item = yield product_repository_1.ProductRepository.findOneBy({
        id: itemId,
    });
    return !!item;
});
exports.checkProductExists = checkProductExists;
const getProductsService = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_repository_1.ProductRepository.find();
});
exports.getProductsService = getProductsService;
