import { v4 } from "uuid"; // Importa função v4 para gerar UUIDs únicos
import * as Yup from "yup"; // Importa Yup para validação de esquemas

import User from "../models/User.js"; // Importa o modelo de usuário

/**
 * UserController - Classe responsável pelo gerenciamento de usuários
 * Este controlador lida com o cadastro de novos usuários no sistema
 */
class UserController {
	// Método para criar um novo usuário
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
			// abortEarly: false faz com que todos os erros sejam coletados, não apenas o primeiro
			schema.validateSync(req.body, { abortEarly: false });
		} catch (err) {
			// Se a validação falhar, retorna status 400 (Bad Request) e os erros de validação
			return res.status(400).json({ error: err.errors });
		}

		// Extrai os dados validados do corpo da requisição
		const { name, email, password, admin } = req.body;

		// Verifica se já existe um usuário com o mesmo email no banco de dados
		const userExists = await User.findOne({
			where: {
				email,
			},
		});

		// Se o email já estiver em uso, retorna erro 409 (Conflict)
		// Este status é apropriado para conflitos de recurso
		if (userExists) {
			return res
				.status(409)
				.json({ error: "Esse email já está sendo utilizado" });
		}

		// Cria um novo usuário no banco de dados com os dados validados
		const user = await User.create({
			id: v4(), // Gera um ID único usando UUID v4 em vez de usar auto-incremento
			name,
			email,
			password, // A senha será hasheada no modelo antes de salvar no banco
			admin, // Define se o usuário terá privilégios de administrador
		});

		// Retorna o usuário criado (sem incluir a senha por segurança) com status 201 (Created)
		return res.status(201).json({
			id: user.id,
			name,
			email,
			admin,
		});
	}

	// Nota: Este controlador implementa apenas o método store (criação)
	// Métodos como index (listagem), show (detalhes), update (atualização) e destroy (remoção)
	// poderiam ser implementados para completar o CRUD de usuários
}

// Exporta uma instância da classe UserController (Singleton)
export default new UserController();
