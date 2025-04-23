/**
 * Middleware de Autenticação
 * Este arquivo implementa um middleware para proteger rotas que requerem autenticação
 * Verifica se o token JWT é válido e extrai informações do usuário
 */

// Importa a biblioteca jsonwebtoken para verificar tokens JWT
import jwt from "jsonwebtoken";

// Importa as configurações de autenticação (secret e expiresIn)
import authConfig from "../../config/auth.js";

// Middleware de autenticação para validar tokens JWT
function authMiddleware(req, res, next) {
    // Obtém o token do cabeçalho Authorization
    // Formato esperado: "Bearer [token]"
    const authToken = req.headers.authorization;

    // Verifica se o token foi fornecido
    if (!authToken) {
        // Se não houver token, retorna erro 401 (Unauthorized)
        return res.status(401).json({ error: "Token não comprovado" });
    }

    // Extrai o token da string "Bearer [token]"
    // split(" ") divide a string em um array usando espaço como separador
    // at(1) pega o segundo elemento do array (índice 1), que é o token
    const token = authToken.split(" ").at(1);

    try {
        // Verifica se o token é válido usando a chave secreta
        jwt.verify(token, authConfig.secret, (err, decoded) => {
            // Se houver erro na verificação
            if (err) {
                // Lança um erro para ser capturado pelo bloco catch
                throw new Error();
            }

            // Se o token for válido, extrai informações do payload
            // e adiciona ao objeto de requisição para uso em outros middlewares/controladores
            req.userId = decoded.id;     // ID do usuário
            req.userName = decoded.name; // Nome do usuário

            // Chama o próximo middleware/controlador na cadeia
            return next();
        });
    } catch (err) {
        // Se o token for inválido ou expirado, retorna erro 401
        return res.status(401).json({ message: "O Token é inválido" });
    }
}

// Exporta o middleware para ser usado em outras partes da aplicação
export default authMiddleware;