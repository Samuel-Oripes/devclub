/** @type {import('sequelize-cli').Migration} */
module.exports = {
	/**
	 * Método 'up' - Executado quando a migração é aplicada
	 * Cria a tabela de produtos com todos os campos necessários
	 */
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("products", {
			id: {
				type: Sequelize.INTEGER,      // Identificador numérico
				allowNull: false,             // Não permite valores nulos
				primaryKey: true,             // Define como chave primária
				autoIncrement: true,          // Incrementa automaticamente
			},
			name: {
				type: Sequelize.STRING,       // Nome do produto
				allowNull: false,             // Nome é obrigatório
			},
			price: {
				type: Sequelize.INTEGER,      // Preço em centavos (evita problemas com decimais)
				allowNull: false,             // Preço é obrigatório
			},
			category: {
				type: Sequelize.STRING,       // Categoria do produto (texto)
				allowNull: false,             // Categoria é obrigatória
			},
			path: {
				type: Sequelize.STRING,       // Caminho da imagem do produto
				allowNull: false,             // Caminho é obrigatório
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
	 * Remove a tabela de produtos completamente
	 */
	async down(queryInterface) {
		await queryInterface.dropTable("products");
	},
};