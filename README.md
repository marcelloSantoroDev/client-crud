## Descrição

A aplicação é um CRUD para clientes Node.js, utilizando Typescript em POO

## Instruções para subir o servidor back-end (com Docker)

1. Certifique-se de ter o Docker instalado em sua máquina.
2. Certifique-se de configurar o arquivo .env.example, bem como retirar o .example
3. Abra um terminal na pasta / do projeto.
4. Execute o comando `npm install` para instalar as dependências do projeto.
5. Execute o comando `docker build -t [DB_NAME definido no .env] .` para construir a imagem do MySQL.
6. Execute o comando `docker-compose up -d` para subir o container do MySQL.
7. Execute o comando `npm run db` no terminal da sua máquina para criar o banco de dados e a tabela.
8. Execute o comando `npm run dev` para subir o servidor.


Utilize qualquer ferramente para APIs REST para testar com a rota `http://localhost:3001/clients`

Para facilitar, você pode copiar e colar o objeto abaixo

```
{
  "name": "Marcello",
  "email": "marcello@gmail.com",
  "birthdate": "1991/12/09",
  "phone":  "977772222",
  "cpf": "12345678977"
}
```

## Testes

Os testes neste repositório foram elaborados para garantir a funcionalidade correta das rotas de um aplicativo CRUD. Eles foram desenvolvidos utilizando as bibliotecas Sinon, Mocha, Chai e Jest para criar e simular cenários diversos.
