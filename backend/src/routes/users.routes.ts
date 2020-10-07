import { Router } from 'express';

const userRoute = Router();

userRoute.get('/', (request, response) => {
  return response.json({ ok: true });
});

export default userRoute;
