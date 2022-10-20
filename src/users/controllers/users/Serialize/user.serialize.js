"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.serailizedUser = void 0;
var class_transformer_1 = require("class-transformer");
var serailizedUser = /** @class */ (function () {
    function serailizedUser(partial) {
        Object.assign(this, partial);
    }
    __decorate([
        (0, class_transformer_1.Exclude)()
    ], serailizedUser.prototype, "password");
    return serailizedUser;
}());
exports.serailizedUser = serailizedUser;
