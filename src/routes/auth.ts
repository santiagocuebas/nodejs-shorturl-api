import { Router } from 'express';
import { authCTRL } from '../controllers/index.js';
import { isLoggedInWithLinks, isNotLoggedIn } from '../middlewares/index.js';

const router = Router();

router.get('/userData', isLoggedInWithLinks, authCTRL.getUserData);

router.post('/googleRegister', isNotLoggedIn, authCTRL.postGoogle);

router.post('/githubRegister', isNotLoggedIn, authCTRL.postGithub);

export default router;
