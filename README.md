# Entre Torres e Magias

Aplicação front-end desenvolvida em HTML, CSS e JavaScript para apresentar uma escola de magia e gerenciar estudantes e avisos.

O projeto foi desenvolvido como atividade de um curso de front-end de 160 horas, para praticar construção de páginas, responsividade, formulários, manipulação do DOM, componentes reutilizáveis e comunicação com uma API simulada utilizando JSON Server.

## Funcionalidades

* Página inicial com apresentação de Hogwarts, suas casas e ambientes;
* Consulta à pontuação das quatro casas;
* Login de funcionários com nome e palavra-passe;
* Exibição dos links do menu conforme o estado de login;
* Encerramento do acesso pelo botão de sair;
* Cadastro de estudantes;
* Consulta aos estudantes cadastrados;
* Paginação da listagem e exibição da quantidade total de estudantes;
* Edição dos dados dos estudantes;
* Exclusão de estudantes mediante confirmação;
* Expansão dos detalhes dos estudantes em telas menores;
* Cadastro, consulta, edição e exclusão de avisos;
* Registro do funcionário responsável pela criação e atualização dos avisos;
* Adaptação das páginas para diferentes tamanhos de tela.

## Regras de funcionamento

### Casa

* A página inicial apresenta Grifinória, Sonserina, Corvinal e Lufa-Lufa;
* Cada casa possui sua identificação visual;
* A pontuação exibida é consultada na API simulada.

### Estudante

* O cadastro reúne nome completo, origem, casa, ano escolar, varinha, tipo de sangue, animal de estimação, situação e observações;
* Nome, origem, casa, ano, varinha, tipo de sangue, animal e situação são informações obrigatórias;
* A casa é selecionada entre as quatro casas de Hogwarts;
* O ano escolar é selecionado entre o primeiro e o sétimo ano;
* O tipo de sangue pode ser puro, mestiço, nascido trouxa ou desconhecido;
* O animal de estimação pode ser coruja, gato, sapo ou rato;
* A situação pode ser matriculado, afastado, intercâmbio, expulso ou formado;
* As observações são opcionais e recebem `N/A` quando não preenchidas;
* Os dados cadastrados podem ser consultados e editados;
* A exclusão depende da confirmação do usuário;
* A listagem apresenta a quantidade total de estudantes;
* Em telas menores, informações adicionais e ações ficam disponíveis ao expandir os detalhes do estudante.

### Funcionário

* O login utiliza o nome do bruxo ou bruxa e sua palavra-passe;
* Os dados informados são comparados com os funcionários disponíveis na API simulada;
* Após o login, o funcionário é direcionado à listagem de estudantes;
* O nome do funcionário é armazenado no navegador para identificar o acesso e registrar a autoria dos avisos;
* Os links de registro, alunos, quadro de avisos e saída são exibidos conforme a identificação armazenada;
* Ao sair, a identificação é removida e o usuário retorna à página inicial.

### Aviso

* Todo aviso possui título, data e conteúdo;
* Título, data e conteúdo são informações obrigatórias;
* O funcionário identificado no navegador é registrado como criador do aviso;
* Ao editar um aviso, o sistema registra o funcionário responsável pela atualização;
* A listagem apresenta o nome de quem atualizou o aviso ou, quando ainda não houve atualização, de quem o criou;
* As datas são apresentadas no formato brasileiro;
* A exclusão depende da confirmação do usuário.

## Arquitetura

A aplicação utiliza páginas organizadas por funcionalidade, componentes reutilizáveis e uma API simulada para persistência dos dados.

### Pages

Contém as páginas de apresentação da escola, login, cadastro de estudantes, listagem de estudantes e quadro de avisos.

Cada funcionalidade possui seus arquivos HTML, CSS e JavaScript.

### Components

Contém o menu de navegação e o rodapé, reutilizados nas páginas por meio dos componentes `app-navbar` e `app-footer`.

Os componentes utilizam Web Components e carregam seus conteúdos HTML com a Fetch API.

### Assets

Contém imagens e elementos visuais utilizados nas páginas, formulários, casas e botões.

### Mocks

Contém o arquivo `db.json`, utilizado pelo JSON Server para disponibilizar os dados de casas, estudantes, funcionários e avisos.

## Fluxo da aplicação

Página HTML → Evento em JavaScript → Fetch API → JSON Server → Arquivo `db.json`

As respostas da API são utilizadas pelo JavaScript para preencher formulários, montar listagens e atualizar o conteúdo das páginas.

## Tecnologias utilizadas

* HTML5;
* CSS3;
* JavaScript;
* Flexbox;
* CSS Grid;
* Media Queries;
* Web Components;
* Fetch API;
* localStorage;
* JSON Server;
* Node.js e npm.

## Acesso ao sistema

O fluxo de login tem finalidade didática e utiliza os funcionários cadastrados na API simulada.

Após a identificação, o nome do funcionário é salvo no `localStorage`. Essa informação é utilizada para ajustar os links do menu e registrar os responsáveis pela criação e atualização dos avisos.

A opção de sair remove essa identificação do navegador.

## Comunicação com a API

A aplicação utiliza a API simulada no endereço `http://localhost:3000`.

| Recurso | Operações utilizadas |
|---|---|
| `/houses` | Consulta às casas e suas pontuações |
| `/students` | Consulta, cadastro, edição e exclusão de estudantes |
| `/staff` | Consulta aos funcionários para realizar o login |
| `/notices` | Consulta, cadastro, edição e exclusão de avisos |

## Dados principais

* `houses`: representa as casas de Hogwarts e suas pontuações;
* `students`: representa os estudantes, seus dados escolares e sua situação;
* `staff`: representa os funcionários utilizados no fluxo de login;
* `notices`: representa os comunicados e seus responsáveis pela criação e atualização.

## Executando o projeto

### API simulada

Instale as dependências na raiz do projeto:

```bash
npm install
```

Inicie o JSON Server:

```bash
npm run api
```

A API será disponibilizada na porta `3000`.

### Front-end

Utilize um servidor local de arquivos estáticos, como o Live Server, a partir da raiz do projeto.

Abra o arquivo `index.html` pelo servidor local. Ele direcionará o navegador à página inicial.

Mantenha a API simulada em execução durante o uso das funcionalidades que consultam ou alteram dados.

## Autor

Desenvolvido por **Rafael Tabolka** como projeto didático para o ensino de desenvolvimento front-end com HTML, CSS e JavaScript.
