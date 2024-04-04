const express = require('express');

const router = express.Router();

const { clientController } = require('../controllers');

router.get('/', clientController.getClients);
router.get('/:id', clientController.getClient);
router.post('/', clientController.createClient);
router.delete('/:id', clientController.deleteClient);
router.put('/:id', clientController.updateClient);

module.exports = router;