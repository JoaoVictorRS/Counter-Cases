#!/bin/bash

# Iniciar o servidor Node.js em segundo plano
node server.js &

# Iniciar o servidor Expo
npx expo start

#COMANDO PARA INICIAR npm run iniciar-app