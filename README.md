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
El programa, como anteriormente lo mencioné

## Diagrama de Funcionamiento Gestion de usuarios

Básicamente el funcionameinto de la aplica

 ```mermaid
  sequenceDiagram
      Client->>Server: Crendenciales de usuario {username, password}
      Note right of Server: Valida las credenciales y crea el {JWT} para el ususario 
      Server-->>Client: Envía el {JWT} encriptado al cliente!
      Note right of Server: Verifica la firma del {JWT} y obtiene la información de este mismo y de la petición
      Client->>Server: Envía la autorización y solicitud con el {JWT} en la cabecera utilizando Bearer + Token!
      Server-->>Client: Envía la respuesta al cliente
  ```

