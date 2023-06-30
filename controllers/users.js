import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import Debug from 'debug'
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const bcrypt = require('bcrypt');

const debug = Debug('app:usersCtrl:')

function createJWT(user) {
    return jwt.sign(
        // data payload
        { user },
        process.env.SECRET,
        { expiresIn: '24h' }
    );
}

async function create(req, res) {
    try {
        const user = await User.create(req.body);
        console.log(user);
        const token = createJWT(user);
        res.json(token);
    } catch (err) {
        if (err.message.match(/^E11000/)) {
            debug("Duplicate Email")
            res.status(400).json({ message: "Email already in use" })
        } else {
            res.status(400).json({ message: err.message })
        }
    }
}

async function login(req, res) {
    try {
        console.log(req.body)
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            res.status(401).json({ message: "No user associated with this e-mail!" })
            return
        }
        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) {
            res.status(401).json({ message: "E-mail and password do not match!" })
            return
        }
        res.json(createJWT(user));

    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}
export { create, login } 