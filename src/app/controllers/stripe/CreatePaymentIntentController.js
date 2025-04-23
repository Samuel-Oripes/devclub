// Importação das dependências necessárias
import Stripe from "stripe";         // Biblioteca oficial do Stripe para Node.js
import * as Yup from "yup";          // Biblioteca para validação de esquemas
import stripeSecretKey from "../../../config/stripe.js"; // Importa a chave secreta do Stripe de um arquivo de configuração


// Inicializa o cliente Stripe com a chave secreta
const stripe = new Stripe(stripeSecretKey)

// Função que calcula o valor total do pedido em centavos

const calculateOrderAmount = (items) => {
    // Soma o preço de cada item multiplicado pela quantidade
    const total = items.reduce((acc, current) => {
        return current.price * current.quantity + acc;
    }, 0);

    // Retorna o valor em centavos (multiplica por 100)
    return total * 100;
};

/**
 * Controlador responsável por criar intents de pagamento no Stripe
 * Este arquivo permite iniciar transações para processamento de pagamentos
 */
class CreatePaymentIntentController {
    // Método para criar uma nova intent de pagamento
	async store(req, res) {
		// Define o esquema de validação usando Yup
		const schema = Yup.object({
			products: Yup.array()      // Espera um array de produtos
				.required()            // O array é obrigatório
				.of(                   // Cada item do array deve seguir este esquema
					Yup.object({
						id: Yup.number().required(),        // ID do produto (obrigatório)
						quantity: Yup.number().required(),  // Quantidade (obrigatória)
                        price: Yup.number().required(),    // Preço (obrigatório)
					}),
				),
		});

        try {
			// Valida os dados da requisição contra o esquema definido
			schema.validateSync(req.body, { abortEarly: false });
		} catch (err) {
			// Retorna erro 400 com as mensagens de erro caso a validação falhe
			return res.status(400).json({ error: err.errors });
		}

        // Extrai os produtos do corpo da requisição
        const { products } = req.body;
        // Calcula o valor total do pedido em centavos
        const amount = calculateOrderAmount(products);
    
        // Cria a intent de pagamento no Stripe
        const paymentIntent = await stripe.paymentIntents.create({
            amount,                      // Valor total em centavos
            currency: 'brl',             // Moeda: Real Brasileiro
            automatic_payment_methods: { // Habilita detecção automática de métodos de pagamento
              enabled: true,
            },
          });
      
          // Retorna os dados necessários para o cliente finalizar o pagamento
          res.json({
            clientSecret: paymentIntent.client_secret,  // Chave secreta para o cliente iniciar o pagamento
            dpmCheckerLink: `https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${paymentIntent.id}`, // Link para revisar os métodos de pagamento no dashboard do Stripe
          });
    }
}

// Exporta uma instância do controlador
export default new CreatePaymentIntentController();