// Define a estrutura e o comportamento das categorias de produtos.


import Sequelize, { Model } from "sequelize"; // Importa o Sequelize e a classe Model

class Product extends Model {
	static init(sequelize) {
		// Método de inicialização do modelo, recebe a instância do Sequelize como parâmetro
		// biome-ignore lint/complexity/noThisInStatic: <explanation>
		super.init(
			{
				// Define os atributos/colunas do modelo Product
				name: Sequelize.STRING, // Nome do produto (tipo string)
				price: Sequelize.INTEGER, // Preço do produto (tipo inteiro - geralmente em centavos)
				path: Sequelize.STRING, // Caminho da imagem do produto (tipo string)
				offer: Sequelize.BOOLEAN, // Flag para indicar se o produto está em oferta
				url: {
					type: Sequelize.VIRTUAL, // Campo virtual que não será armazenado no banco de dados
					get() {
						// Método getter que constrói a URL completa para a imagem do produto
						return `http://localhost:3001/product-file/${this.path}`;
					},
				},
			},
			{
				sequelize, // Passa a instância do Sequelize
				tableName: "products", // Define o nome da tabela no banco de dados
			},
		);

		// biome-ignore lint/complexity/noThisInStatic: <explanation>
		return this; // Retorna a instância do modelo para permitir encadeamento de métodos
	}

	// Método para definir associações com outros modelos
	static associate(models) {
		// biome-ignore lint/complexity/noThisInStatic: <explanation>
		this.belongsTo(models.Category, {
			foreignKey: "category_id", // Chave estrangeira que relaciona o produto com a categoria
			as: "category", // Alias para acessar a categoria relacionada
		});
	}
}

export default Product; // Exporta a classe Product para ser utilizada em outros arquivos