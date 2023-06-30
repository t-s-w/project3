import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import Debug from 'debug'

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

export { create } 