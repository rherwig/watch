import { Router } from 'express';

import rooms from './rooms';

const router = Router();

router.use('/rooms', rooms);

export default router;
