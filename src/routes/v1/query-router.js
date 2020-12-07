import { Router } from 'express';
import modelRouter from '../../controllers/v1/query-controller';

const router = Router();

router.get('/search/:data', modelRouter.getQuery);

export default router;

