/**
 * Esquema de Pedidos (Order)
 * Este arquivo define a estrutura dos documentos de pedidos no MongoDB
 * usando Mongoose para modelagem de dados
 */

// Importa o Mongoose, biblioteca ODM (Object Document Mapper) para MongoDB
import mongoose from "mongoose";

/**
 * Define o esquema do pedido usando mongoose.Schema
 * O esquema especifica a estrutura, tipos de dados e validações
 */
const OrderSchema = new mongoose.Schema(
    {
        // Informações do usuário que fez o pedido
        user: {
            id: {
                type: String,    // ID do usuário (UUID)
                required: true,  // Campo obrigatório
            },
            name: {
                type: String,    // Nome do usuário
                required: true,  // Campo obrigatório
            },
        },
        
        // Lista de produtos incluídos no pedido
        products: [
            {
                // Cada produto contém as seguintes informações
                id: {
                    type: Number,    // ID do produto
                    required: true,  // Campo obrigatório
                },
                name: {
                    type: String,    // Nome do produto
                    required: true,  // Campo obrigatório
                },
                price: {
                    type: Number,    // Preço do produto
                    required: true,  // Campo obrigatório
                },
                category: {
                    type: String,    // Categoria do produto
                    required: true,  // Campo obrigatório
                },
                url: {
                    type: String,    // URL da imagem do produto
                    required: true,  // Campo obrigatório
                },
                quantity: {
                    type: String,    // Quantidade do produto pedida
                    required: true,  // Campo obrigatório
                    // Nota: este campo poderia ser Number em vez de String para facilitar cálculos
                },
            },
        ],
        
        // Status do pedido (ex: "Em preparação", "Finalizado", "Entregue")
        status: {
            type: String,    // Status do pedido como texto
            required: true,  // Campo obrigatório
        },
    },
    {
        // Opções adicionais do esquema
        timestamps: true,    // Adiciona automaticamente campos createdAt e updatedAt
                            // para registrar quando o documento foi criado e atualizado
    },
);

/**
 * Exporta o modelo 'Order' baseado no esquema definido
 * Este modelo será usado para interagir com a coleção 'orders' no MongoDB
 */
export default mongoose.model('Order', OrderSchema);