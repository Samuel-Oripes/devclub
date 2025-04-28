/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface) {
		await queryInterface.removeColumn("products", "category");
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.addColumn("products", "category", {
			type: Sequelize.STRING,
			allowNull: true,
		});
	},
};
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	/**
	 * Método 'up' - Executado quando a migração é aplicada
	 * Remove a coluna 'category' da tabela products
	 * Esta migração é parte da refatoração para usar relação entre tabelas
	 * ao invés de armazenar a categoria como texto no produto
	 */
	async up(queryInterface) {
		await queryInterface.removeColumn("products", "category");
	},

	/**
	 * Método 'down' - Executado quando a migração é revertida
	 * Adiciona a coluna 'category' de volta à tabela products
	 * Nota: como é uma reversão, a coluna é adicionada como nullable (allowNull: true)
	 */
	async down(queryInterface, Sequelize) {
		await queryInterface.addColumn("products", "category", {
			type: Sequelize.STRING,
			allowNull: true,
		});
	},
};
