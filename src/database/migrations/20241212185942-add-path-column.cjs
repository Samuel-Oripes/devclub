/** @type {import('sequelize-cli').Migration} */
module.exports = {
	/**
	 * Método 'up' - Executado quando a migração é aplicada
	 * Adiciona a coluna 'path' à tabela categories para armazenar o caminho da imagem
	 */
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn("categories", "path", {
			type: Sequelize.STRING,       // Caminho da imagem da categoria como texto
		});
	},

	/**
	 * Método 'down' - Executado quando a migração é revertida
	 * Remove a coluna 'path' da tabela categories
	 * 
	 * NOTA: Há um erro nesta implementação - deveria usar removeColumn ao invés de dropTable
	 * O correto seria: await queryInterface.removeColumn("categories", "path");
	 */
	async down(queryInterface) {
		await queryInterface.dropTable("categories", "path");
	},
};