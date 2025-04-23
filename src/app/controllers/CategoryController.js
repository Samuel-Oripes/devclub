/**
 * Controlador de Categorias (CategoryController)
 * Este arquivo implementa o controlador responsável por gerenciar as categorias de produtos,
 * incluindo criação, atualização e listagem
 */

// Importações necessárias
import * as Yup from "yup";                 // Biblioteca para validação de esquemas
import Category from "../models/Category.js"; // Modelo de categoria para interagir com o banco de dados
import User from "../models/User.js";         // Modelo de usuário para verificação de permissões

/**
 * Classe que implementa a lógica de controle para categorias
 */
class CategoryController {
    // Método para criar uma nova categoria
    async store(req, res) {
        // Define esquema de validação para os dados de entrada
        const schema = Yup.object({
            name: Yup.string().required(), // Nome da categoria é obrigatório
        });

        // Valida os dados do corpo da requisição
        try {
            schema.validateSync(req.body, { abortEarly: false });
        } catch (err) {
            // Se houver erros de validação, retorna status 400 (Bad Request)
            return res.status(400).json({ error: err.errors });
        }

        // Verifica se o usuário que fez a requisição é um administrador
        const { admin: isAdmin } = await User.findByPk(req.userId);

        // Se não for administrador, retorna erro 401 (Unauthorized)
        if (!isAdmin) {
            return res.status(401).json();
        }

        // Extrai o nome do arquivo da imagem (enviado via multer) e o nome da categoria
        const { filename: path } = req.file;
        const { name } = req.body;

        // Verifica se já existe uma categoria com o mesmo nome
        const categoryExist = await Category.findOne({
            where: {
                name,
            },
        });

        // Se a categoria já existir, retorna erro 400
        if (categoryExist) {
            return res.status(400).json({ error: "Essa categoria já existe" });
        }

        // Cria a nova categoria no banco de dados
        const { id } = await Category.create({
            name,
            path, // Caminho da imagem da categoria
        });

        // Retorna os dados da categoria criada com status 201 (Created)
        return res.status(201).json({ id, name });
    }

    // Método para atualizar uma categoria existente
    async update(req, res) {
        // Define esquema de validação para os dados de atualização
        const schema = Yup.object({
            name: Yup.string(), // Nome da categoria é opcional na atualização
        });

        // Valida os dados do corpo da requisição
        try {
            schema.validateSync(req.body, { abortEarly: false });
        } catch (err) {
            // Se houver erros de validação, retorna status 400 (Bad Request)
            return res.status(400).json({ error: err.errors });
        }

        // Verifica se o usuário que fez a requisição é um administrador
        const { admin: isAdmin } = await User.findByPk(req.userId);

        // Se não for administrador, retorna erro 401 (Unauthorized)
        if (!isAdmin) {
            return res.status(401).json();
        }

        // Obtém o ID da categoria a ser atualizada dos parâmetros da URL
        const { id } = req.params;

        // Verifica se a categoria existe
        const categoryExists = await Category.findByPk(id);

        // Se a categoria não existir, retorna erro 400
        if (!categoryExists) {
            return res
                .status(400)
                .json({ message: "Verifique se o ID do produto está correto" });
        }

        // Verifica se foi enviada uma nova imagem
        let path;
        if (req.file) {
            path = req.file.filename;
        }

        // Extrai o novo nome da categoria do corpo da requisição
        const { name } = req.body;

        // Se um novo nome foi fornecido, verifica se já existe outra categoria com este nome
        if (name) {
            const categoryNameExists = await Category.findOne({
                where: {
                    name,
                },
            });

            // Verifica se existe outra categoria com o mesmo nome (diferente da que está sendo atualizada)
            // O operador + converte o id de string para número para comparação
            if (categoryNameExists && categoryNameExists.id !== +id) {
                return res.status(400).json({ error: "Essa categoria já existe" });
            }
        }

        // Atualiza a categoria no banco de dados
        await Category.update(
            {
                name,
                path,
            },
            {
                where: {
                    id, // Condição: atualiza apenas a categoria com este ID
                },
            },
        );

        // Retorna status 200 (OK) indicando sucesso na atualização
        return res.status(200).json();
    }

    // Método para listar todas as categorias
    async index(req, res) {
        // Busca todas as categorias no banco de dados
        const categories = await Category.findAll();

        // Retorna a lista de categorias
        return res.json(categories);
    }
}

// Exporta uma instância do CategoryController (Singleton)
export default new CategoryController();