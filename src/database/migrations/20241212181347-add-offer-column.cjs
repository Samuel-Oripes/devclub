/** @type {import('sequelize-cli').Migration} */
module.exports = {
  /**
   * Método 'up' - Executado quando a migração é aplicada
   * Adiciona a coluna 'offer' à tabela products para marcar produtos em promoção
   */
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('products', 'offer', {
      type: Sequelize.BOOLEAN,      // Campo booleano (true/false)
      defaultValue: false,          // Por padrão, produtos não estão em oferta
      allowNull: false,             // Não permite valores nulos
    });
  },

  /**
   * Método 'down' - Executado quando a migração é revertida
   * Remove a coluna 'offer' da tabela products
   */
  async down (queryInterface) {
    await queryInterface.removeColumn('products', 'offer');
  }
};