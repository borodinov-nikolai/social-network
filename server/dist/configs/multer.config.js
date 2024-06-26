"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerConfig = void 0;
const multer_1 = require("multer");
const path_1 = require("path");
const uuid_1 = require("uuid");
const rootPath = process.cwd();
exports.multerConfig = {
    storage: (0, multer_1.diskStorage)({
        destination: function (req, file, cb) {
            let folder;
            if (file.mimetype.startsWith('image/')) {
                folder = 'images';
            }
            else {
                folder = 'other';
            }
            cb(null, (0, path_1.join)(rootPath, 'files', 'uploads', folder));
        },
        filename: function (req, file, cb) {
            const uniqueName = (0, uuid_1.v4)();
            cb(null, uniqueName + (0, path_1.extname)(file.originalname));
        }
    })
};
//# sourceMappingURL=multer.config.js.map