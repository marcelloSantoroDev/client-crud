"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const client_service_1 = require("../services/client.service");
const client_controller_1 = require("../controllers/client.controller");
const router = express.Router();
const clientService = new client_service_1.default();
const clientController = new client_controller_1.default(clientService);
router.get('/', clientController.getClients);
router.get('/:id', clientController.getClient);
router.post('/', clientController.createClient);
router.delete('/:id', clientController.deleteClient);
router.put('/:id', clientController.updateClient);
exports.default = router;
//# sourceMappingURL=client.route.js.map