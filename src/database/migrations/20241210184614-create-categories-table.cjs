/** @type {import('sequelize-cli').Migration} */
module.exports = {
	/**
	 * Método 'up' - Executado quando a migração é aplicada
	 * Cria a tabela de categorias para classificar produtos
	 */
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("categories", {
			id: {
				type: Sequelize.INTEGER,      // Identificador numérico
				allowNull: false,             // Não permite valores nulos
				primaryKey: true,             // Define como chave primária
				autoIncrement: true,          // Incrementa automaticamente
			},
			name: {
				type: Sequelize.STRING,       // Nome da categoria
				allowNull: false,             // Nome é obrigatório
				unique: true,                 // Nome deve ser único (previne duplicatas)
			},
			created_at: {
				type: Sequelize.DATE,         // Data de criação do registro
				allowNull: false,             // Campo obrigatório
			},
			updated_at: {
				type: Sequelize.DATE,         // Data da última atualização
				allowNull: false,             // Campo obrigatório
			},
		});
	},

	/**
	 * Método 'down' - Executado quando a migração é revertida
	 * Remove a tabela de categorias completamente
	 */
	async down(queryInterface) {
		await queryInterface.dropTable("categories");
	},
};