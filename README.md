BlogPosts App

Aplicativo mobile de blog com autenticação JWT, CRUD de postagens e usuários, construído com React Native e Laravel.

📄 Sobre o projeto

Este app foi desenvolvido como parte de um desafio técnico. Ele permite:

Registro e login de usuários

Listagem, criação, edição e exclusão de postagens

Visualização de comentários e adição de novos

Marcar posts como favoritos (localmente)

Integração com API Laravel com autenticação JWT

⚙️ Tecnologias

Frontend:

React Native (com Expo)

Typescript

React Navigation

Redux + Context API

AsyncStorage

Styled Components

Backend:

Laravel 10

JWT Auth (tymon/jwt-auth)

Docker + MySQL

Swagger para documentação (l5-swagger)

⚡ Instalação

Backend:

cd cms-api-laravel
cp .env.example .env
# Configure seu banco e JWT_SECRET

composer install
php artisan key:generate
php artisan migrate --seed
php artisan serve

A API ficará disponível em http://localhost:8000

Frontend:

cd blogposts
npm install
npx expo start

Escaneie o QR Code com o app Expo Go no seu celular.

💡 Funcionalidades

Telas:



📍 API Base

URL da API: http://192.168.15.6:8000/api

Obs: substitua pelo seu IP local caso rode em outro dispositivo.

🌐 Swagger

Documentação da API: http://localhost:8000/api/documentation

🚀 Como contribuir

Fork este repositório

Crie sua branch (git checkout -b minha-feature)

Commit suas mudanças (git commit -m 'feat: nova feature')

Push para a branch (git push origin minha-feature)

Abra um Pull Request

Desenvolvido por Marla Amoury ❤️

