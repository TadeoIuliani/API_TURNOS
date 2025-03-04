# API_TURNOS
API REST para manejo de turnos y usuarios


🚀 Configuración y uso
1. Requisitos previos
Antes de comenzar, asegúrate de tener instalados los siguientes programas en tu sistema:
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Git](https://git-scm.com/)

### 2. **Clonar el repositorio**
Clona este repositorio en tu máquina local:
```bash
git clone https://github.com/tu-usuario/nombre-del-repositorio.git
cd nombre-del-repositorio
```

### 3. Instalar Dependecias de Node.js
El comando en Bash:
```bash
npm install
```
### 4. **Configurar variables de entorno**
Crea un archivo .env en la raíz del proyecto con las variables del env.example

### 5. **Levantar el contenedor de Docker**
El comando en Bash:
```bash
docker-compose up -d
```
Este comando hará lo siguiente:
  > Descargar la imagen oficial de MySQL (mysql:8.0) si no está disponible localmente.
  > Configurar el contenedor de MySQL con las credenciales especificadas.
  > Crear un volumen para persistir los datos.

### 6. **Iniciar el servidor Node.js**
El comando es:
```bash
node src/app.js
```
Esto ejecutará tu aplicación Node.js y debería escuchar en el puerto 3001 (por defecto).
