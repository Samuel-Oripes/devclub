/** @type {import('sequelize-cli').Migration} */
module.exports = {
	/**
	 * Método 'up' - Executado quando a migração é aplicada
	 * Adiciona a coluna 'category_id' à tabela products
	 * Estabelece uma relação entre produtos e categorias
	 */
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn("products", "category_id", {
			type: Sequelize.INTEGER,      // Identificador numérico (mesmo tipo do id de categorias)
			references: {                 // Define uma chave estrangeira
				model: "categories",      // Referencia a tabela categories
				key: "id",                // Referencia a coluna id da tabela categories
			},
			onUpdate: "CASCADE",          // Se o id da categoria mudar, atualiza o produto
			onDelete: "SET NULL",         // Se a categoria for deletada, define como NULL no produto
			allowNull: true,              // Permite produtos sem categoria
		});
	},

	/**
	 * Método 'down' - Executado quando a migração é revertida
	 * Remove a coluna 'category_id' da tabela products
	 */
	async down(queryInterface) {
		await queryInterface.removeColumn("products", "category_id");
	},
};