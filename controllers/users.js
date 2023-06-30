import User from '../models/User.js'
import jwt from 'jsonwebtoken'

const userCtrl = ({
    create: async function (req, res) {
        try {
            const user = await User.create(req.body);
        } catch (err) {
            res.status(400).json(err);
        }
    }
})

export default userCtrl