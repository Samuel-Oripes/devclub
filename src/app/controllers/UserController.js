import { v4 } from "uuid";
import * as Yup from 'yup';

import User from "../models/User.js";

class UserController {
    async store(req, res) {

        const schema = Yup.object({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password_hash: Yup.string().min(6).required(),
            admin: Yup.boolean(),
        });

        try {
            schema.validateSync(req.body, {abortEarly: false})
        } catch(err) {
            return res.status(400).json({ error: err.errors })
        }

        const { name, email, password_hash, admin } = req.body;

        const userExists = await User.findOne({
            where: {
                email,
            },
        })
        
        if(userExists) {
            return res.status(400).json({ error: 'Esse email já está sendo utilizado'})
        }

        const user = await User.create({
            id: v4(),
            name,
            email,
            password_hash,
            admin,
        })
    
        return res.status(201).json({
            id: user.id,
            name,
            email,
            admin,
        });
    }
}

export default new UserController;

