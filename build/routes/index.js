"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const client_route_1 = require("./client.route");
const router = express.Router();
router.use('/clients', client_route_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map