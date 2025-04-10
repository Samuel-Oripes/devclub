// PASSO A PASSO PARA CRIAR O BACK-AND
// 
//  1° => escolha o gerenciador de pacotes (EX: YARN OU NPM)
//  2° => inicie o projeto com o gerenciador (yarn init -y)
//  3° => ajuste suas informções no packge.json
//  
//  4° => crie seus primeiro arquivos de organização (antes ficava tudo dentro do server.js, separa-los torna mais organizado)
//      route.js (configura as rotas)
//      app.js (configura a aplicação)
//      server.js (expõe a aplicação)
//  
//  5° => instale o express (yarn add express ou npm install express)
//  6° => importe o express e crie a primeira rota e configurações
//  7° => instale o nodemon como dependência do projeto, ele reinicia automaticamente o servidor ao salvar (yarn add nodemon -D)
//      adicione no package.json => 
//          "main": "src/server.js"
//          "scripts":{
//              "dev": "nodemon'
//           }
//
//  8° => instale o sucrase, ele faz o Node entender a sitaxe do import e export (yarn add sucrase -D)
//      inicie o sucrase (yarn sucrase-node src/server.js)
//      crie um arquivo nodemon.json e adicione no arquivo =>
//          {
//              "execMap":  {
//                  "js":"node -r sucrase/register"
//              }
//          }
//
//      outra opção é adicionar no package.json => "type": "module"
//
//  9° => instale o Biome, ele formata o documento ao salvar (segue tutorial no YouTube)
//  10° => instale o Docker, ele ajuda a evitar conflitos com apps de versões diferentes
//  11° => crie os containers (seguir documentação do Docker)
//  12° => instale o Beekeeper Studio, ele permite visualizar o banco de dados (seguir documentação do Beekeeper)
//  13° => instale o Sequelize, ele é um ORM que traduz o código para que o banco de dados entenda, Ex.: JAVASCRIPT para SQL (seguir documentação do Sequelize)
//      crie um arquivo .sequelizerc onde mapeia para o sequelize onde estão as pastas =>
//          const { resolve } = require('node:path');

//          module.exports = {
//              config: resolve(__dirname, 'src', 'config', 'database.cjs'),
//              'models-path': resolve(__dirname, 'src', 'app', 'models'),
//              'migrations-path': resolve(__dirname, 'src', 'database', 'migrations')
//          }
//
//  14° => configure o arquivo database.js com os dados do banco de dados =>
//      module.exports = {
// 	        dialect: "postgres",
// 	        host: "localhost",
// 	        port: 5432,
// 	        username: "postgres",
// 	        password: "postgres",
// 	        database: "devburger",
// 	        define: {
// 		        timestamps: true,
// 		        underscored: true,
// 		        underscoredAll: true,
// 	        },
//      };
// 
//  15° => crie as migrations, elas são arquivos onde se coloca instruções para o banco de dados. Ex.: criar novas tabelas, adicionar ou remover novos campos na tabela
//      yarn sequelize migration:create --name create-users-table
//
//  16° => configure os campos que terão na tabela
//  17° => rode as migrations =>
//      yarn sequelize db:migrate
// 
//  18° => crie os models, é um molde em código para criar e manipular dados no banco
//  19° => conecte os models com o banco de dados no arquivo index.js da pasta database
//  20° => importe a classe Database no arquivo app.js para quando a aplicação carregar já instancie a classe =>
//      import "./database/index.js";
//
//  21° => crie os controllers, são arquivos que recebem e processam as requisições do usuário
//  22° => crie as rotas, são os caminhos que definem como uma aplicação responde a uma requisição
//  23° => instale o HTTpie, ele simula o front-and (seguir documentação)
//  24° => 





