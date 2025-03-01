# Usar una imagen base de Node.js
FROM node:16

# Definir el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar los archivos del proyecto
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Exponer el puerto de la API
EXPOSE 1004

# Comando para ejecutar la aplicación
CMD ["node", "index.js"]
