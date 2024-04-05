import * as express from 'express';
import ClientService from '../services/client.service';
import ClientController from '../controllers/client.controller';

const router = express.Router();

const clientService = new ClientService();
const clientController = new ClientController(clientService);

router.get('/', clientController.getClients);
router.get('/:id', clientController.getClient);
router.post('/', clientController.createClient);
router.delete('/:id', clientController.deleteClient);
router.put('/:id', clientController.updateClient);

export default router;