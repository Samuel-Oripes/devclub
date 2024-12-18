// app.js configura a aplicação

import path, { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import cors from "cors";
import express from "express";
import routes from "./routes.js";

import "./database/index.js";

class App {
	constructor() {
		this.app = express();

		this.app.use(cors());
		this.middlewares();
		this.routes();
	}

	middlewares() {
		const __filename = fileURLToPath(import.meta.url);
		const __dirname = path.dirname(__filename);

		this.app.use(express.json());
		this.app.use(
			"/product-file",
			express.static(resolve(__dirname, "..", "uploads")),
		);

		this.app.use(
			"/category-file",
			express.static(resolve(__dirname, "..", "uploads")),
		);
	}

	routes() {
		this.app.use(routes);
	}
}

export default new App().app;
