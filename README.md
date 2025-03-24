# Proyecto SWAPI Integration

## Instrucciones de Instalación y Configuración

### 1. Descargar el proyecto
Clonar el repositorio desde GitHub:
```bash
git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_DEL_PROYECTO>
```

### 2. Configurar variables de entorno
Crear un archivo `.env` en la raíz del proyecto y agregar las credenciales enviadas por correo.

### 3. Agregar archivo `docker-compose.yml`
Colocar el archivo `docker-compose.yml` en la raíz del proyecto y agregar las credenciales enviadas por correo.

### 4. Instalar dependencias
Ejecutar el siguiente comando para instalar las dependencias necesarias:
```bash
yarn install
```

### 5. Levantar los servicios en Docker
Ejecutar los siguientes comandos para iniciar PostgreSQL y PgAdmin:
```bash
docker-compose up -d postgres  
docker-compose up -d pgadmin
```

### 6. Levantar el proyecto
Ejecutar el siguiente comando:
```bash
yarn start:dev
```
La documentación de Swagger estará disponible en:
[http://localhost:3000/docs](http://localhost:3000/docs)

### 7. Correr las migraciones
Ejecutar el siguiente comando para aplicar las migraciones a la base de datos:
```bash
yarn migration:run
```

---

## Uso del Proyecto

### Creación de Usuarios y Roles
Para probar los endpoints, es necesario crear dos tipos de usuarios:
- **Admin**: Puede ejecutar todos los endpoints, incluyendo aquellos con restricciones.
- **User**: Puede ejecutar endpoints sin restricciones y algunos específicos.

### Endpoints con restricciones
#### Requiere rol **admin**:
- **Crear un film:**
  ```http
  POST http://localhost:3000/films
  ```
- **Eliminar un film:**
  ```http
  DELETE http://localhost:3000/films/:id
  ```
- **Modificar un film:**
  ```http
  PATCH http://localhost:3000/films/:id
  ```
- **Sincronizar con SWAPI:**
  ```http
  POST http://localhost:3000/films/update-from-swapi
  ```

#### Requiere rol **user**:
- **Ver un film por ID:**
  ```http
  GET http://localhost:3000/films/:id
  ```

### Endpoints accesibles sin autenticación
- **Listar todos los films:**
  ```http
  GET http://localhost:3000/films
  ```
- **Iniciar sesión:**
  ```http
  POST http://localhost:3000/auth/login
  ```
  Requiere usuario y contraseña, genera un token.
- **Registrar un nuevo usuario:**
  ```http
  POST http://localhost:3000/users
  ```

---

## Notas adicionales
- Asegúrate de que PostgreSQL y PgAdmin estén corriendo antes de levantar el proyecto.
- Revisa la documentación en Swagger para detalles sobre cada endpoint.
- Recuerda crear los usuarios con los roles adecuados para poder probar todas las funcionalidades.

**¡Listo! Ahora puedes comenzar a utilizar el proyecto.**

