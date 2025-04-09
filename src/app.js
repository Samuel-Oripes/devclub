// app.js configura a aplicação Express e suas dependências

// Importações de módulos do Node.js para manipulação de caminhos de arquivos
import path, { resolve } from "node:path";
import { fileURLToPath } from "node:url";
// Importação do pacote cors para permitir requisições de diferentes origens
import cors from "cors";
// Importação do framework Express para criar o servidor web
import express from "express";
// Importação das rotas definidas em routes.js
import routes from "./routes.js";

// Importação da configuração do banco de dados
import "./database/index.js";

/**
 * Classe App - Responsável por configurar e inicializar a aplicação Express
 * Centraliza a configuração de middlewares e rotas
 */
class App {
	/**
	 * Construtor - inicializa a aplicação Express, configura CORS e 
	 * chama os métodos de inicialização
	 */
	constructor() {
		// Cria uma nova instância do Express
		this.app = express();

		// Habilita CORS para permitir requisições de outros domínios
		this.app.use(cors());
		// Configura os middlewares da aplicação
		this.middlewares();
		// Configura as rotas da aplicação
		this.routes();
	}

	/**
	 * Configura os middlewares globais da aplicação:
	 * - Parser de JSON
	 * - Serviço de arquivos estáticos para imagens de produtos e categorias
	 */
	middlewares() {
		// Obtém o caminho do arquivo atual (necessário no ES modules)
		const __filename = fileURLToPath(import.meta.url);
		// Obtém o diretório do arquivo atual
		const __dirname = path.dirname(__filename);

		// Configura o Express para interpretar requisições com corpo JSON
		this.app.use(express.json());
		
		// Configura o Express para servir arquivos estáticos de produtos
		// Mapeia a URL /product-file para a pasta uploads
		this.app.use(
			"/product-file",
			express.static(resolve(__dirname, "..", "uploads")),
		);

		// Configura o Express para servir arquivos estáticos de categorias
		// Mapeia a URL /category-file para a pasta uploads
		this.app.use(
			"/category-file",
			express.static(resolve(__dirname, "..", "uploads")),
		);
	}

	/**
	 * Configura as rotas da aplicação usando o roteador importado
	 */
	routes() {
		// Adiciona as rotas definidas em routes.js à aplicação
		this.app.use(routes);
	}
}

// Exporta uma instância já inicializada da aplicação Express
export default new App().app;