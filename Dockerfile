# Usa una imagen de Node.js
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos del proyecto al contenedor
COPY package.json package-lock.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Expone el puerto de la API
EXPOSE 3001

# Comando para iniciar la aplicación
CMD ["npm", "start"]
