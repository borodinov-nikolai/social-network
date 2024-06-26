"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.staticConfig = void 0;
const path_1 = require("path");
const rootPath = process.cwd();
exports.staticConfig = {
    rootPath: (0, path_1.join)(rootPath, 'files'),
    serveRoot: '/',
    exclude: ['/api/(.*)'],
};
//# sourceMappingURL=static.config.js.map