import Sequelize from "sequelize";
import Category from "../app/models/Category.js";
import Product from "../app/models/Product.js";
import User from "../app/models/User.js";
import configDatabase from "../config/database.cjs";

const models = [User, Product, Category];

class Database {
	constructor() {
		this.init();
	}

	init() {
		this.connection = new Sequelize(configDatabase);
		models
			.map((model) => model.init(this.connection))
			.map(
				// biome-ignore lint/complexity/useOptionalChain: <explanation>
				(model) => model.associate && model.associate(this.connection.models),
			);
	}
}

export default new Database();
