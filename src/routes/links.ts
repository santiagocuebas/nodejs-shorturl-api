import { Router } from 'express';
import { linkCTRL } from '../controllers/index.js';
import { array, isLoggedIn, validate } from '../middlewares/index.js';

const router = Router();

router.get('/:short_url', linkCTRL.getLink);

router.use(isLoggedIn);

router.post('/add', validate(array.Link), linkCTRL.postLink);

router.put('/edit/:id', validate(array.Edit), linkCTRL.putEdit);

router.delete('/delete/:id', linkCTRL.deleteLink);

export default router;
