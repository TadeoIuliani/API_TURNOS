# Usar una imagen oficial de Node.js como base
FROM node:18

# Crear y establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de tu proyecto al contenedor
COPY . .

# Instalar dependencias
RUN npm install

# Exponer el puerto en el que la app escucha
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
