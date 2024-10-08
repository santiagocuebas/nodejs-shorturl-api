import { Router } from 'express';
import { userCTRL } from '../controllers/index.js';
import { array, isLoggedIn, validate } from '../middlewares/index.js';

const router = Router();

router.use(isLoggedIn);

router.post('/username', validate(array.Username), userCTRL.postUsername);

router.delete('/delete', userCTRL.deleteUser);

export default router;
