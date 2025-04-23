/**
 * Controlador de Pedidos (OrderController)
 * Este arquivo implementa o controlador responsável por gerenciar pedidos,
 * incluindo criação, listagem e atualização de status
 */

// Importações necessárias
import * as Yup from "yup";                // Biblioteca para validação de esquemas
import Category from "../models/Category.js"; // Modelo de categoria (SQL)
import Product from "../models/Product.js";   // Modelo de produto (SQL)
import User from "../models/User.js";         // Modelo de usuário (SQL)
import Order from "../schemas/Order.js";      // Esquema de pedido (MongoDB)

/**
 * Classe que implementa a lógica de controle para pedidos
 */
class OrderController {
    // Método para criar um novo pedido
    async store(req, res) {
        // Define esquema de validação para os dados de entrada
        const schema = Yup.object({
            products: Yup.array()
                .required()  // Array de produtos é obrigatório
                .of(
                    Yup.object({
                        id: Yup.number().required(),        // ID do produto é obrigatório
                        quantity: Yup.number().required(),  // Quantidade é obrigatória
                    }),
                ),
        });

        // Valida os dados da requisição
        try {
            schema.validateSync(req.body, { abortEarly: false });
        } catch (err) {
            // Se houver erros de validação, retorna status 400 (Bad Request)
            return res.status(400).json({ error: err.errors });
        }

        // Extrai a lista de produtos do corpo da requisição
        const { products } = req.body;

        // Cria um array com apenas os IDs dos produtos
        const productsIds = products.map((product) => product.id);

        // Busca no banco de dados os produtos completos pelos IDs
        // Inclui as informações de categoria relacionada
        const findProducts = await Product.findAll({
            where: {
                id: productsIds,
            },
            include: [
                {
                    model: Category,
                    as: "category",
                    attributes: ["name"],
                },
            ],
        });

        // Formata os produtos para incluir a quantidade solicitada
        // e outras informações necessárias para o pedido
        const formattedProducts = findProducts.map((product) => {
            // Encontra o índice do produto na lista original para obter a quantidade
            const productIndex = products.findIndex((item) => item.id === product.id);

            // Cria um novo objeto de produto com todos os dados necessários
            const newProduct = {
                id: product.id,
                name: product.name,
                category: product.category.name,  // Nome da categoria
                price: product.price,
                url: product.url,
                quantity: products[productIndex].quantity,  // Quantidade do pedido
            };

            return newProduct;
        });

        // Monta o objeto de pedido completo
        const order = {
            user: {
                id: req.userId,     // ID do usuário que fez o pedido (do token JWT)
                name: req.userName, // Nome do usuário (do token JWT)
            },
            products: formattedProducts,  // Lista de produtos formatada
            status: "Pedido realizado",   // Status inicial do pedido
        };

        // Cria o pedido no MongoDB usando o esquema Order
        const createdOrder = await Order.create(order);

        // Retorna o pedido criado com status 201 (Created)
        return res.status(201).json({ createdOrder });
    }

    // Método para listar todos os pedidos
    async index(req, res) {
        // Busca todos os pedidos no MongoDB
        const orders = await Order.find();

        // Retorna a lista de pedidos
        return res.json(orders);
    }

    // Método para atualizar o status de um pedido
    async update(req, res) {
        // Define esquema de validação para os dados de entrada
        const schema = Yup.object({
            status: Yup.string().required(),  // Status é obrigatório e deve ser string
        });

        // Valida os dados da requisição
        try {
            schema.validateSync(req.body, { abortEarly: false });
        } catch (err) {
            // Se houver erros de validação, retorna status 400 (Bad Request)
            return res.status(400).json({ error: err.errors });
        }

        // Verifica se o usuário é administrador
        // findByPk busca um usuário pelo ID primário (Primary Key)
        const { admin: isAdmin } = await User.findByPk(req.userId);

        // Se não for administrador, retorna erro 401 (Unauthorized)
        if (!isAdmin) {
            return res.status(401).json();
        }

        // Extrai o ID do pedido dos parâmetros da URL e o novo status do corpo da requisição
        const { id } = req.params;
        const { status } = req.body;

        // Tenta atualizar o status do pedido no MongoDB
        try {
            // updateOne atualiza um documento no MongoDB pelo _id
            await Order.updateOne({ _id: id }, { status });
        } catch (err) {
            // Se ocorrer um erro (como ID inválido), retorna erro 400
            return res.status(400).json({ error: err.message });
        }

        // Retorna mensagem de sucesso
        return res.json({ message: "Estado alterado com sucesso" });
    }
}

// Exporta uma instância do OrderController (Singleton)
export default new OrderController();