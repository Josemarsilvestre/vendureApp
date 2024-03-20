# Minha Aplicação de E-Commerce com React Native e GraphQL

Bem-vindo à minha aplicação de comércio eletrônico desenvolvida em React Native, com GraphQL como tecnologia de backend, inspirada no Vendure. Esta aplicação permite aos usuários visualizar produtos, adicionar itens ao carrinho e efetuar compras.

## Requisitos do Sistema
   - Node.js (v14.x ou superior)
   - React Native CLI
   - Expo CLI
   - Npm (opcional, mas recomendado)

## Configuração do Projeto

1. Clone o repositório:

   ```bash
      git clone https://github.com/Josemarsilvestre/vendureApp.git
      cd vendureApp
   ```
2. Instale as dependências:

   ```bash
      npm install
   ```
## Configuração do Backend

Esta aplicação usa um backend GraphQL para gerenciar produtos, pedidos e usuários. Você pode usar o `Vendure` ou outro serviço semelhante.

Certifique-se de configurar as variáveis de ambiente corretamente para o backend. Isso pode incluir URLs de GraphQL, chaves de acesso, etc.

## Executando o Projeto

Para iniciar o aplicativo em um emulador ou dispositivo físico, use:

    ```bash
       npx expo start
    ```

Isso abrirá o Metro Bundler em seu navegador padrão. A partir daí, você pode escolher executar o aplicativo em um emulador, em um dispositivo conectado ou através do Expo Go.

## Estrutura do Projeto

A estrutura do projeto é organizada da seguinte forma:

   - /assets: Recursos estáticos como imagens e fontes.
   - /components: Componentes reutilizáveis em toda a aplicação.
   - /screens: Telas da aplicação, como tela inicial, detalhes do produto, carrinho, etc.
   - /navigation: Configuração da navegação da aplicação usando React Navigation.
   - /graphql: Consultas e mutações GraphQL.
   - /utils: Funções utilitárias para tarefas comuns.

## Contribuição
Contribuições são bem-vindas! Se encontrar bugs, problemas de desempenho ou tiver sugestões de novos recursos, sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença
Este projeto está licenciado sob a MIT License.