// Importando as dependências necessárias
import jwt from "jsonwebtoken"; // Biblioteca para gerar e validar tokens JWT
import * as Yup from "yup"; // Biblioteca para validação de esquemas
import authConfig from "../../config/auth.js"; // Configurações de autenticação (secret, expiresIn)
import User from "../models/User.js"; // Modelo de usuário para interação com o banco de dados

/**
 * SessionController - Responsável pelo controle de sessões (login) de usuários
 * Este controlador gerencia a autenticação e criação de tokens JWT para usuários
 */
class SessionController {
	// Método para criação de sessão (login)
	async store(req, res) {
		// Define um esquema de validação para os dados de entrada
		const schema = Yup.object({
			email: Yup.string().email().required(), // Email deve ser uma string válida e obrigatória
			password: Yup.string().min(6).required(), // Senha deve ter no mínimo 6 caracteres e é obrigatória
		});

		// Valida se os dados do corpo da requisição estão de acordo com o esquema
		const isValid = await schema.isValid(req.body);

		// Função auxiliar para retornar erro padronizado de credenciais inválidas
		const emailOrPasswordIncorrect = () => {
			res.status(401).json({
				error: "Certifique-se de que seu email e senha estejam corretos",
			});
		};

		// Se os dados não forem válidos, retorna erro de credenciais
		if (!isValid) {
			return emailOrPasswordIncorrect();
		}

		// Extrai email e senha do corpo da requisição
		const { email, password } = req.body;

		// Busca o usuário no banco de dados pelo email
		const user = await User.findOne({
			where: {
				email,
			},
		});

		// Se o usuário não existir, retorna erro de credenciais
		if (!user) {
			return emailOrPasswordIncorrect();
		}

		// Verifica se a senha fornecida corresponde à senha armazenada
		// O método checkPassword é implementado no modelo User
		const isSamePassword = await user.checkPassword(password);

		// Se a senha estiver incorreta, retorna erro de credenciais
		if (!isSamePassword) {
			return emailOrPasswordIncorrect();
		}

		// Se tudo estiver correto, retorna os dados do usuário e o token JWT
		return res.status(201).json({
			id: user.id, // ID do usuário
			name: user.name, // Nome do usuário
			email, // Email do usuário
			admin: user.admin, // Flag que indica se o usuário é administrador
			token: jwt.sign(
				{ id: user.id, name: user.name }, // Payload do token (dados incluídos no token)
				authConfig.secret, // Chave secreta para assinar o token
				{
					expiresIn: authConfig.expiresIn, // Tempo de expiração do token
				},
			),
		});
	}
}

// Exporta uma instância do SessionController (Singleton)
export default new SessionController();
