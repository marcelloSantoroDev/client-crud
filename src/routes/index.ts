import * as express from 'express';
import clientRoute from './client.route';

const router = express.Router();

router.use('/clients', clientRoute);

export default router;