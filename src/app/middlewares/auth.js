import jwt from "jsonwebtoken";
import authConfig from "../../config/auth.js";

function authMiddleware(req, res, next) {
	const authToken = req.headers.authorization;

	if (!authToken) {
		return res.status(401).json({ error: "Token não comprovado" });
	}

	const token = authToken.split(" ").at(1);

	try {
		jwt.verify(token, authConfig.secret, (err, decoded) => {
			if (err) {
				throw new Error();
			}

			req.userId = decoded.id;
			req.userName = decoded.name;

			return next();
		});
	} catch (err) {
		return res.status(401).json({ message: "O Token é inválido" });
	}
}

export default authMiddleware;