/**
 * Configuração do Multer para upload de arquivos
 * Este arquivo configura como os arquivos enviados serão armazenados no servidor
 */

// Importa o módulo multer, que é um middleware para lidar com dados de formulário multipart/form-data
const multer = require("multer");

// Importa a função v4 do módulo uuid para gerar identificadores únicos universais
const { v4 } = require("uuid");

// Importa funções específicas do módulo path para manipulação de caminhos de arquivos
// extname: obtém a extensão do arquivo (.jpg, .png, etc.)
// resolve: resolve caminhos de diretórios de forma consistente entre sistemas operacionais
const { extname, resolve } = require("node:path");

// Exporta a configuração do multer
module.exports = {
    // Define o storage (armazenamento) para o multer
    storage: multer.diskStorage({
        // Define o diretório de destino onde os arquivos serão salvos
        // __dirname é o diretório atual do arquivo
        // "..", ".." sobe dois níveis na árvore de diretórios
        // "uploads" é o diretório onde os arquivos serão armazenados
        destination: resolve(__dirname, "..", "..", "uploads"),
        
        // Define como os nomes dos arquivos serão gerados
        // Esta função é chamada para cada arquivo enviado
        // req: objeto de requisição
        // file: informações sobre o arquivo enviado
        // callback: função a ser chamada quando o nome do arquivo for determinado
        filename: (req, file, callback) =>
            // Chama o callback com:
            // primeiro parâmetro null (sem erro)
            // segundo parâmetro é o nome do arquivo gerado: UUID + extensão original
            // Isso garante nomes únicos e evita conflitos, mantendo a extensão correta
            callback(null, v4() + extname(file.originalname)),
    }),
    // Obs: Poderia haver configurações adicionais como:
    // limits: para limitar tamanho de arquivos
    // fileFilter: para filtrar tipos de arquivos permitidos
};