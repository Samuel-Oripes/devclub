import { v4 } from "uuid"; // Importa função v4 para gerar UUIDs únicos
import * as Yup from "yup"; // Importa Yup para validação de esquemas

import User from "../models/User.js"; // Importa o modelo de usuário

/**
 * Classe responsável pelo gerenciamento de usuários
 */
class UserController {
	async store(req, res) {
		// Define o esquema de validação para os dados do usuário usando Yup
		const schema = Yup.object({
			name: Yup.string().required(), // Nome é obrigatório e deve ser string
			email: Yup.string().email().required(), // Email é obrigatório e deve ser um email válido
			password: Yup.string().min(6).required(), // Senha é obrigatória e deve ter no mínimo 6 caracteres
			admin: Yup.boolean(), // Campo admin é opcional e deve ser booleano
		});

		try {
			// Valida os dados recebidos contra o esquema definido
			schema.validateSync(req.body, { abortEarly: false });
		} catch (err) {
			// Se a validação falhar, retorna status 400 e os erros de validação
			return res.status(400).json({ error: err.errors });
		}

		// Extrai os dados validados do corpo da requisição
		const { name, email, password, admin } = req.body;

		// Verifica se já existe um usuário com o mesmo email
		const userExists = await User.findOne({
			where: {
				email,
			},
		});

		// Se o email já estiver em uso, retorna erro 409 (Conflict)
		if (userExists) {
			return res
				.status(409)
				.json({ error: "Esse email já está sendo utilizado" });
		}

		// Cria um novo usuário no banco de dados
		const user = await User.create({
			id: v4(), // Gera um ID único usando UUID v4
			name,
			email,
			password,
			admin,
		});

		// Retorna o usuário criado (sem a senha) com status 201 (Created)
		return res.status(201).json({
			id: user.id,
			name,
			email,
			admin,
		});
	}
}

// Exporta uma instância da classe UserController
export default new UserController();