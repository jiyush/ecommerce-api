import express, { json } from 'express'
const router = express.Router();
import { registerController } from '../controllers';

// router.post('/register', registerController.register);
router.post('/register', (req, res, next) => {
    console.log('tests');
    res.json({msg:"hello"});
});

export default router;