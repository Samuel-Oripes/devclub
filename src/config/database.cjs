//Configuração do banco

module.exports = {
	dialect: "postgres", // Define o tipo de banco de dados a ser utilizado (PostgreSQL neste caso)
	host: "localhost", // Endereço do servidor do banco de dados
	port: 5432, // Porta de conexão com o servidor PostgreSQL (porta padrão: 5432)
	username: "postgres", // Nome de usuário para autenticação no banco de dados
	password: "postgres", // Senha para autenticação no banco de dados
	database: "devburger", // Nome do banco de dados que será utilizado pela aplicação
	
	// Configurações adicionais para o ORM
	define: {
		timestamps: true, // Adiciona automaticamente os campos created_at e updated_at nas tabelas
		underscored: true, // Utiliza o formato snake_case para os nomes das colunas (ex: user_name em vez de userName)
		underscoredAll: true, // Aplica o formato snake_case para todos os nomes de atributos do modelo
	},
};
