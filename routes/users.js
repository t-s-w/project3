import express from 'express';
import * as usersCtrl from '../controllers/users.js'
const router = express.Router();

router.post('/', usersCtrl.create);

export default router;