# BoletoflexClient

Este projeto utiliza o [Angular CLI](https://github.com/angular/angular-cli) version 8.1.3

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

## Execução do server NODE com a Aplicação (Execução localhost)
`ng serve --proxy-config proxy.config.js`



## Executando os testes unitários

Rodar `ng test` para executar os testes com o [Karma](https://karma-runner.github.io).

## Executando testes end-to-end

Rodar `ng e2e` ara executar os testes com o  [Protractor](http://www.protractortest.org/).

