import jwt from "jsonwebtoken";
import * as Yup from "yup";
import authConfig from "../../config/auth.js";
import User from "../models/User.js";

class SessionController {
	async store(req, res) {
		const schema = Yup.object({
			email: Yup.string().email().required(),
			password: Yup.string().min(6).required(),
		});

		const isValid = await schema.isValid(req.body);

		const emailOrPasswordIncorrect = () => {
			res.status(401).json({
				error: "Certifique-se de que seu email e senha estejam corretos",
			});
		};

		if (!isValid) {
			return emailOrPasswordIncorrect();
		}

		const { email, password } = req.body;

		const user = await User.findOne({
			where: {
				email,
			},
		});

		if (!user) {
			return emailOrPasswordIncorrect();
		}

		const isSamePassword = await user.checkPassword(password);

		if (!isSamePassword) {
			return emailOrPasswordIncorrect();
		}

		return res.status(201).json({
			id: user.id,
			name: user.name,
			email,
			admin: user.admin,
			token: jwt.sign({ id: user.id, name: user.name }, authConfig.secret, {
				expiresIn: authConfig.expiresIn,
			}),
		});
	}
}

export default new SessionController();
