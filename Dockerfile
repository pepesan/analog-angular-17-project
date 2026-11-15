# Etapa 1: construcción
FROM node:22-slim AS build
WORKDIR /app

# Instalación reproducible a partir del lockfile
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Etapa 2: ejecución (el servidor Nitro ya incluye su propio node_modules)
FROM node:22-slim
WORKDIR /app

ENV NODE_ENV=production \
    PORT=3000 \
    HOST=0.0.0.0

COPY --from=build --chown=node:node /app/dist/analog ./

USER node
EXPOSE 3000

CMD ["node", "server/index.mjs"]
