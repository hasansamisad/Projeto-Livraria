# Usamos a versão LTS do Node
FROM node:20

# Criamos a pasta da aplicação dentro do container
WORKDIR /usr/app

# Copiamos os arquivos de dependências primeiro (otimiza o cache)
COPY package*.json ./

# Instalamos as dependências
RUN npm install

# Copiamos o resto do código
COPY . .

# Expomos a porta que sua API usa (geralmente 3001)
EXPOSE 3001

# Comando para rodar a aplicação
CMD ["npm", "run", "dev"]
