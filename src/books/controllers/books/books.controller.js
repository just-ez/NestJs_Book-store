"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BooksController = void 0;
var common_1 = require("@nestjs/common");
var BooksController = /** @class */ (function () {
    function BooksController() {
    }
    BooksController.prototype.getBooks = function () {
        return {
            Book_name: 'be happy',
            author: 'jack harlie',
            description: 'a book for you to be happy'
        };
    };
    __decorate([
        (0, common_1.Get)()
    ], BooksController.prototype, "getBooks");
    BooksController = __decorate([
        (0, common_1.Controller)('books')
    ], BooksController);
    return BooksController;
}());
exports.BooksController = BooksController;
