// Importando as dependências necessárias
import * as Yup from "yup";                // Biblioteca para validação de esquemas
import Category from "../models/Category.js"; // Modelo de categoria para interação com o banco de dados
import Product from "../models/Product.js";   // Modelo de produto para interação com o banco de dados
import User from "../models/User.js";         // Modelo de usuário para verificação de permissões

/**
 * ProductController - Responsável pelo gerenciamento de produtos na aplicação
 * Este controlador implementa operações CRUD (Create, Read, Update, Delete) para produtos
 */
class ProductController {
	// Método para criar um novo produto
	async store(req, res) {
		// Define esquema de validação para os dados de entrada
		const schema = Yup.object({
			name: Yup.string().required(),        // Nome do produto é obrigatório
			price: Yup.number().required(),       // Preço deve ser um número e é obrigatório
			category_id: Yup.number().required(), // ID da categoria é obrigatório
			offer: Yup.boolean(),                 // Indica se o produto está em oferta (opcional)
		});

		// Valida os dados do corpo da requisição
		try {
			schema.validateSync(req.body, { abortEarly: false }); // Validação síncrona que coleta todos os erros
		} catch (err) {
			// Retorna erro 400 (Bad Request) com a lista de erros de validação
			return res.status(400).json({ error: err.errors });
		}

		// Verifica se o usuário que fez a requisição é um administrador
		const { admin: isAdmin } = await User.findByPk(req.userId);

		// Se não for administrador, retorna erro 401 (Unauthorized)
		if (!isAdmin) {
			return res.status(401).json();
		}

		// Extrai o nome do arquivo enviado (imagem do produto)
		const { filename: path } = req.file;
		
		// Extrai os dados do produto do corpo da requisição
		const { name, price, category_id, offer } = req.body;

		// Cria o produto no banco de dados
		const product = await Product.create({
			name,
			price,
			category_id,
			path,           // Caminho da imagem do produto
			offer,
		});

		// Retorna código 201 (Created) com os dados do produto criado
		return res.status(201).json({ product });
	}

	// Método para atualizar um produto existente
	async update(req, res) {
		// Define esquema de validação para os dados de atualização
		// Todos os campos são opcionais, pois a atualização pode ser parcial
		const schema = Yup.object({
			name: Yup.string(),
			price: Yup.number(),
			category_id: Yup.number(),
			offer: Yup.boolean(),
		});

		// Valida os dados do corpo da requisição
		try {
			schema.validateSync(req.body, { abortEarly: false });
		} catch (err) {
			// Retorna erro 400 (Bad Request) com a lista de erros de validação
			return res.status(400).json({ error: err.errors });
		}

		// Verifica se o usuário que fez a requisição é um administrador
		const { admin: isAdmin } = await User.findByPk(req.userId);

		// Se não for administrador, retorna erro 401 (Unauthorized)
		if (!isAdmin) {
			return res.status(401).json();
		}

		// Obtém o ID do produto a ser atualizado dos parâmetros da URL
		const { id } = req.params;

		// Busca o produto no banco de dados
		const findProduct = await Product.findByPk(id);

		// Se o produto não existir, retorna erro 400 (Bad Request)
		if (!findProduct) {
			return res
				.status(400)
				.json({ error: "Verifique se o ID do produto está correto" });
		}

		// Verifica se foi enviada uma nova imagem
		let path;
		if (req.file) {
			path = req.file.filename;
		}

		// Extrai os dados do produto do corpo da requisição
		const { name, price, category_id, offer } = req.body;

		// Atualiza o produto no banco de dados
		await Product.update(
			{
				name,
				price,
				category_id,
				path,
				offer,
			},
			{
				where: {
					id,  // Condição para atualização: ID do produto
				},
			},
		);

		// Retorna código 200 (OK) indicando sucesso na atualização
		return res.status(200).json();
	}

	// Método para listar todos os produtos
	async index(req, res) {
		// Busca todos os produtos no banco de dados, incluindo suas categorias
		const products = await Product.findAll({
			include: [
				{
					model: Category,     // Inclui o modelo de categoria
					as: "category",      // Alias para a relação
					attributes: ["id", "name"], // Seleciona apenas id e nome da categoria
				},
			],
		});

		// Retorna a lista de produtos
		return res.json(products);
	}
}

// Exporta uma instância do ProductController (Singleton)
export default new ProductController();