// routes.js - Define todas as rotas da API e seus respectivos controladores
// Este arquivo mapeia URLs para funções específicas nos controladores

// Importa o Router do Express para definir as rotas
import { Router } from "express";
// Importa o multer para lidar com upload de arquivos (imagens de produtos e categorias)
import multer from "multer";
// Importa o middleware de autenticação para proteger rotas privadas
import authMiddleware from "./app/middlewares/auth.js";
// Importa a configuração do multer (destino dos arquivos, limites, etc.)
import multerConfig from "./config/multer.cjs";

// Importação dos controladores da aplicação
// Cada controlador gerencia operações CRUD para uma entidade específica
import CategoryController from "./app/controllers/CategoryController.js";
import OrderController from "./app/controllers/OrderController.js";
import ProductController from "./app/controllers/ProductController.js";
import SessionController from "./app/controllers/SessionController.js";
import UserController from "./app/controllers/UserController.js";
// Controlador específico para integração com o Stripe (pagamentos)
import CreatePaymentIntentController from "./app/controllers/stripe/CreatePaymentIntentController.js";

// Cria uma nova instância do Router do Express
const routes = new Router();

// Configura o multer para gerenciar uploads de arquivos
const upload = multer(multerConfig);

// ROTAS PÚBLICAS (não requerem autenticação)
// Rota para criação de usuários
routes.post("/users", UserController.store);
// Rota para login/autenticação (cria uma nova sessão)
routes.post("/session", SessionController.store);

// MIDDLEWARE DE AUTENTICAÇÃO
// Todas as rotas abaixo desta linha requerem autenticação
routes.use(authMiddleware);

// ROTAS DE PRODUTOS (protegidas)
// Cria um novo produto (com upload de imagem)
routes.post("/products", upload.single("file"), ProductController.store);
// Lista todos os produtos
routes.get("/products", ProductController.index);
// Atualiza um produto específico (com possível upload de nova imagem)
routes.put("/products/:id", upload.single("file"), ProductController.update);

// ROTAS DE CATEGORIAS (protegidas)
// Cria uma nova categoria (com upload de imagem)
routes.post("/categories", upload.single("file"), CategoryController.store);
// Lista todas as categorias
routes.get("/categories", CategoryController.index);
// Atualiza uma categoria específica (com possível upload de nova imagem)
routes.put("/categories/:id", upload.single("file"), CategoryController.update);

// ROTAS DE PEDIDOS (protegidas)
// Cria um novo pedido
routes.post("/orders", OrderController.store);
// Lista todos os pedidos
routes.get("/orders", OrderController.index);
// Atualiza o status de um pedido específico
routes.put("/orders/:id", OrderController.update);

// ROTA DE PAGAMENTO (protegida) - Integração com Stripe
// Cria uma intenção de pagamento no Stripe
routes.post("/create-payment-intent", CreatePaymentIntentController.store);

// Exporta o roteador configurado com todas as rotas
export default routes;
