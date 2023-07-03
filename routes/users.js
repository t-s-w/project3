import express from 'express';
import * as usersCtrl from '../controllers/users.js'
import ensureLoggedIn from '../config/ensureLoggedIn.js'

const router = express.Router();

router.post('/', usersCtrl.create);
router.post('/login', usersCtrl.login);
router.get('/check-token', ensureLoggedIn, usersCtrl.checkToken);

export default router;