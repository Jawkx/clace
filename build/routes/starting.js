"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.starting = void 0;
var figlet_1 = __importDefault(require("figlet"));
var node_process_1 = __importDefault(require("node:process"));
var starting = function () {
    figlet_1.default.text("Clace Wallet", { font: "Standard" }, function (err, data) {
        if (err) {
            console.log(err);
            node_process_1.default.abort();
        }
        console.log(data);
    });
};
exports.starting = starting;
