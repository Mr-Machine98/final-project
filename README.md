# React + Semantic Ui React + Java SpringBoot + Jwt + PostgreSQL + PL/pgSQL

Hola!

En este repositorio he subido la parte frontend de mi proyecto, básicamente este trata de un sistema de información que simula la compra de items de una tienda virtual como un **"Carrito de Compras"**, además, realiza la admministración de usuarios almacenados en el sistema. Esto es, porque para ingresar al sistema debes tener un usuario, y dependiendo si eres administrador o no, podrás realizar todo el proceso de lectura, escritura, editado y borrado de los usuarios. Lo que significa que el sistema detecta el rol del usuario que ha iniciado sesión y limita el acceso a recursos de este dependiendo de su rol.

Puedes viajar al siguiente enlace para descargar el complemento del proyecto, la parte backend que se encarga de la persistencia de datos  [final-project-backend](https://github.com/Mr-Machine98/final-project-backend).

# Instalación

1. Descarga el repositorio utilizando el siguiente comando:
```git 
git clone 
```
2. Luego en la raíz del proyecto abre la terminal y descargas las dependencias del proyecto con el siguiente comando:
```npm
npm install
```
3. Luego ya podrás iniciar el proyecto con este comando final:
```npm
npm run dev
```

# Funcionamiento

El programa, como anteriormente lo mencioné simula el carrito de compras de una tienda web, además el inicio de sesión y la administración de usuarios presentes en la base de datos.
El funcionamiento de la compra de items es básicamente sencilla, se seleccionan los items a comprar y se manda un arreglo de estos items con los siguientes atributos:
```Java 
public class Sale {
    	private long id;
    	private Integer quantity;
    	private BigDecimal subTotal;
    	private LocalDateTime dateSale;
    	private String owner;
    	private Product product;
}
```



> [!IMPORTANT]
> Los endpoints para consumir e enviar los recursos de las compras son los siguientes:

```
http://localhost:8080/api/final-app/all

http://localhost:8080/api/final-app/addsales
```



## Diagrama de Funcionamiento Gestion de usuarios

1. Para el proceso de inicio de sesión y la administración de usuarios funcionan mediante JWT y la seguridad de SpringBoot, el primer paso es realizar el login enviando en el body el usuario a iniciar sesión por la dirección **http://localhost:8080/login**
```JSON
{
    "username": "admin",
    "password": "123"
}

```
2. Luego el servidor verifica los datos enviados y te notifica si son correctos o no, si están correctos te crea el Token de seguridad del usuario que ha iniciado sesión listo para utilizar y consumir los recursos, la respuesta del servidor será la siguiente:
```JSON
{
    "message": "Ey admin, you have logged in! ",
    "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGhvcml0aWVzIjoiW3tcImF1dGhvcml0eVwiOlwiUk9MRV9BRE1JTlwifSx7XCJhdXRob3JpdHlcIjpcIlJPTEVfVVNFUlwifV0iLCJpc0FkbWluIjp0cnVlLCJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNzIyNzg3MzA4LCJleHAiOjE3MjI3OTA5MDh9.UjovuY69LidXjJR6_doQudHS8jldipzVjhPjmlW_At8",
    "username": "admin"
}
```
> [!NOTE]
> El token tiene una duración de 1H por lo que si se agota debes iniciar sesión de nuevo.

3. Una vez teniendo el token ya puedes consumir los recursos de la aplicación, algunos son libres de permisos otros si debes colocar el Type Auth, que en este caso es Bearer + el Token recibido, por ejemplo si quieres agregar un nuevo usuario lo haces por la siguiente dirección **http://localhost:8080/api/final-app/users** y el método de envio es POST, junto con el usuario en json a enviar:
```json
{
    "username": "camilo1",
    "password": "camilo1",
    "email": "camilucho@gmail.com",
    "isAdmin": "false"
}
``` 
4. El servidor te responderá dependiendo del recurso consumido, por ejemplo al crear el usuario este te responderá con un **status 201 Created** y te devuelve el objeto creado:

```json
{
    "id": 8,
    "username": "camilo1",
    "email": "camilucho@gmail.com",
    "isAdmin": false
}
```

 ```mermaid
  sequenceDiagram
      Client->>Server: Crendenciales de usuario {username, password}
      Note right of Server: Valida las credenciales y crea el {JWT} para el ususario 
      Server-->>Client: Envía el {JWT} encriptado al cliente!
      Note right of Server: Verifica la firma del {JWT} y obtiene la información de este mismo y de la petición
      Client->>Server: Envía la autorización y solicitud con el {JWT} en la cabecera utilizando Bearer + Token!
      Server-->>Client: Envía la respuesta al cliente
  ```

