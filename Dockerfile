# Etapa 1: Construcción de la aplicación Angular
FROM node:22 AS build

# Establece el directorio de trabajo
WORKDIR /app

# Copia el package.json y el package-lock.json
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia el resto del código fuente
COPY . .

# Compila la aplicación Angular
RUN npm run build --omit=dev

# Etapa 2: Ejecutar la aplicación Angular universal
FROM node:22

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos compilados desde la etapa de construcción
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./

# Instala las dependencias de producción
RUN npm install

# Exponer el puerto 3000
EXPOSE 3000

WORKDIR /app/dist/analog/server

# Comando para ejecutar la aplicación
CMD ["node", "index.mjs"]

