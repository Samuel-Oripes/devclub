// Define a estrutura e o comportamento das categorias de produtos.

import Sequelize, { Model } from "sequelize"; // Importa o Sequelize e a classe Model

class Category extends Model {
	static init(sequelize) {
		// Método de inicialização do modelo, recebe a instância do Sequelize como parâmetro
		// biome-ignore lint/complexity/noThisInStatic: <explanation>
		super.init(
			{
				// Define os atributos/colunas do modelo Category
				name: Sequelize.STRING, // Nome da categoria (tipo string)
				path: Sequelize.STRING, // Caminho da imagem da categoria (tipo string)
				url: {
					type: Sequelize.VIRTUAL, // Campo virtual que não será armazenado no banco de dados
					get() {
						// Método getter que constrói a URL completa para a imagem da categoria
						return `http://localhost:3001/category-file/${this.path}`;
					},
				},					
			},
			{
				sequelize, // Passa a instância do Sequelize
				tableName: "categories", // Define o nome da tabela no banco de dados
			},
		);

		// biome-ignore lint/complexity/noThisInStatic: <explanation>
		return this; // Retorna a instância do modelo para permitir encadeamento de métodos
	}
}

export default Category; // Exporta a classe Category para ser utilizada em outros arquivos