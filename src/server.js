// server.js - Ponto de entrada principal da aplicação
// Este arquivo é responsável por iniciar o servidor HTTP

// Importa a instância configurada da aplicação Express do arquivo app.js
import app from "./app.js";

// Inicia o servidor HTTP na porta 3001
// O método listen:
// 1. Cria um servidor HTTP
// 2. Configura-o para usar nossa aplicação Express
// 3. Faz o servidor escutar na porta especificada (3001)
// 4. Executa o callback quando o servidor estiver pronto
app.listen(3001, () => console.log("O server está rodando na porta 3001"));
