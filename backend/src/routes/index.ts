import { Router } from 'express';

import usersRouter from './users.routes';
import sessionRouter from './session.routes';

const router = Router();

router.use('/users', usersRouter);
router.use('/session', sessionRouter);

export default router;
