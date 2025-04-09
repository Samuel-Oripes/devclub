//Define a estrutura e o comportamento dos usuários 

import bcrypt from "bcrypt"; // Importa a biblioteca bcrypt para hash de senhas
import Sequelize, { Model } from "sequelize"; // Importa o Sequelize e a classe Model

class User extends Model {
	static init(sequelize) {
		// Método de inicialização do modelo, recebe a instância do Sequelize como parâmetro
		// biome-ignore lint/complexity/noThisInStatic: <explanation>
		super.init(
			{
				// Define os atributos/colunas do modelo User
				name: Sequelize.STRING, // Nome do usuário (tipo string)
				email: Sequelize.STRING, // Email do usuário (tipo string)
				password: Sequelize.VIRTUAL, // Campo virtual que não será armazenado no banco de dados
				password_hash: Sequelize.STRING, // Hash da senha que será armazenado no banco de dados
				admin: Sequelize.BOOLEAN, // Flag para indicar se o usuário é administrador
			},
			{
				sequelize, // Passa a instância do Sequelize
				tableName: "users", // Define o nome da tabela no banco de dados
			},
		);

		// Hook executado antes de salvar o usuário no banco de dados
		// biome-ignore lint/complexity/noThisInStatic: <explanation>
		this.addHook("beforeSave", async (user) => {
			// Se uma senha foi fornecida
			if (user.password) {
				// Gera o hash da senha usando bcrypt com fator de custo 10
				user.password_hash = await bcrypt.hash(user.password, 10);
			}
		});

		// biome-ignore lint/complexity/noThisInStatic: <explanation>
		return this; // Retorna a instância do modelo para permitir encadeamento de métodos
	}

	// Método para verificar se a senha fornecida corresponde ao hash armazenado
	async checkPassword(password) {
		// Compara a senha fornecida com o hash armazenado usando bcrypt
		return bcrypt.compare(password, this.password_hash);
	}
}

export default User; // Exporta a classe User para ser utilizada em outros arquivos