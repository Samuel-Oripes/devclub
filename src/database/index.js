// database/index.js - Arquivo central de configuração de banco de dados
// Responsável por inicializar conexões com PostgreSQL (via Sequelize) e MongoDB

// Importação do Mongoose para conexão com MongoDB
import mongoose from "mongoose";
// Importação do Sequelize para conexão com PostgreSQL
import Sequelize from "sequelize";

// Importação dos modelos da aplicação
import Category from "../app/models/Category.js";
import Product from "../app/models/Product.js";
import User from "../app/models/User.js";
// Importação das configurações de conexão com o banco de dados relacional
import configDatabase from "../config/database.cjs";

// Array com todos os modelos que serão inicializados no Sequelize
const models = [User, Product, Category];

/**
 * Classe Database - Gerencia conexões com bancos de dados
 * Inicializa tanto o banco relacional (PostgreSQL) quanto o MongoDB
 */
class Database {
	constructor() {
		// Inicializa a conexão com o banco de dados relacional
		this.init();
		// Inicializa a conexão com o MongoDB
		this.mongo();
	}

	/**
	 * Inicializa a conexão com PostgreSQL via Sequelize
	 * Associa todos os modelos à conexão e configura relacionamentos
	 */
	init() {
		// Cria a conexão com o banco usando as configurações importadas
		this.connection = new Sequelize(configDatabase);
		
		// Inicializa cada modelo passando a conexão do Sequelize
		models
			.map((model) => model.init(this.connection))
			// Configura os relacionamentos entre modelos, se o método associate existir
			.map(
				// biome-ignore lint/complexity/useOptionalChain: <explanation>
				(model) => model.associate && model.associate(this.connection.models),
			);
	}

	/**
	 * Inicializa a conexão com o MongoDB
	 * Usado para armazenar dados não relacionais (como pedidos)
	 */
	mongo() {
		// Conecta ao MongoDB local na porta padrão 27017, usando o banco 'devburger'
		this.mongoConnection = mongoose.connect('mongodb://localhost:27017/devburger')
	}
}

// Exporta uma instância já inicializada da classe Database
export default new Database();