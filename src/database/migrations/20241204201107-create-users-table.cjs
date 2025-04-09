/** @type {import('sequelize-cli').Migration} */
module.exports = {
	/**
	 * Método 'up' - Executado quando a migração é aplicada
	 * Cria a tabela de usuários com todos os campos necessários
	 */
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("users", {
			id: {
				primaryKey: true,         // Define como chave primária
				allowNull: false,         // Não permite valores nulos
				type: Sequelize.UUID,     // Tipo UUID para identificador único universal
				defaultValue: Sequelize.UUIDV4, // Gera UUID v4 automaticamente
			},
			name: {
				type: Sequelize.STRING,   // Campo de texto para nome do usuário
				allowNull: false,         // Nome é obrigatório
			},
			email: {
				type: Sequelize.STRING,   // Campo de texto para email
				allowNull: false,         // Email é obrigatório
				unique: true,             // Email deve ser único (previne duplicatas)
			},
			password_hash: {
				type: Sequelize.STRING,   // Armazena o hash da senha (não a senha em texto)
				allowNull: false,         // Senha é obrigatória
			},
			admin: {
				type: Sequelize.BOOLEAN,  // Campo booleano para definir se é admin
				defaultValue: false,      // Por padrão, usuários não são admins
			},
			created_at: {
				type: Sequelize.DATE,     // Data de criação do registro
				allowNull: false,         // Campo obrigatório
			},
			updated_at: {
				type: Sequelize.DATE,     // Data da última atualização
				allowNull: false,         // Campo obrigatório
			},
		});
	},

	/**
	 * Método 'down' - Executado quando a migração é revertida
	 * Remove a tabela de usuários completamente
	 */
	async down(queryInterface) {
		await queryInterface.dropTable("users");
	},
};