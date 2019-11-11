# BoletoflexClient

Projeto utiliza o [Angular CLI](https://github.com/angular/angular-cli) version 8.1.3, com NODE JS 10.
Está sendo utilizando um Proxy na execução do server NODE justamente para incorporar a aplicação Server do Spring Boot, ambos localmente, ou seja, como o Spring Boot roda por default na porta 8080 local, e a aplicação Angular no Server NODE também, tem navegadores (como o Chrome) que rejeita a chamada no Client Angular como localhost (mais documentação -> https://pt.wikipedia.org/wiki/Cross-origin_resource_sharing). Por este motivo utilizo um Proxy em JS para redirecionar o Client NODE ao localhost:8080 do Spring Boot criando um Alias "/api".


## Implantando o Client utilizado NPM no Ubuntu 18.04
Executar os camandos:

### Instalando o repositorio de instalação do NODE JS Versão 10
`curl -sL https://deb.nodesource.com/setup_10.x | sudo bash -`

### Instalando NODE JS Versão 10
`sudo apt-get install -y nodejs`

### Baixando do repositorio GITHUB o projeto Client
`git clone https://github.com/tschannerl/boletoflex-client.git`
`cd boletoflex-client`

### Baixando e Instalando as dependência do NODE para a aplicação
`npm install`

### Baixando e Instalando o CLI do Angular v8.1.3 para execução do server NODE
`sudo npm install -g @angular/cli@8.1.3`

## Execução do server NODE com a Aplicação (Execução localhost -> Explicação acima do Proxy)
`ng serve --proxy-config proxy.config.js`

Abrir o navegador (preverencialmente Chrome) e chamar: http://localhost:4200/home

# Uso do Sistema

Tela principal foi criada utilizando algumas imagens e dados do site principal https://boletoflex.com/ (como cores, logos e imagens).

No centro tem um botão que derá acesso ao cadastro do cliente.

Na tela de cadastro pode-se, selecionar uma foto do computador ou mesmo tirar uma foto pela WebCam do cliente (clicar em Tirar Foto, abrirá o video, depois clicar no mesmo botão para capturar). Além do preenchimento dos dados principais do cliente.

Alguns controles são feitos dos campos (requireds), se foi selecionado ou mesmo tirado uma foto, além de validar se o cliente já consta na base de dados pelo CPF/CNPJ.

Ao registrar o cliente, este é enviado via REST JSON para o Server Spring Boot, além da imagem.

Para acessar os dados cadastrados, deve-se clicar no topo direito "LOGIN", abrindo assim uma tela de login. *(usuário: admin | senha: 123)*. Estes dados são confrontados na Base de Dados (é criado o usuário ao subir o Server).

Na tela da lista dos clientes, abrirá uma tabela com os dados principais do cliente, é possivel clicar na linha e abrirá todos os detalhes gravados deste cliente. Além disso é possível aplicar a ação de aprovar ou não o cliente, gravando no Server o status do cliente;



## Executando os testes unitários

Rodar `ng test` para executar os testes com o [Karma](https://karma-runner.github.io).

## Executando testes end-to-end

Rodar `ng e2e` ara executar os testes com o  [Protractor](http://www.protractortest.org/).

