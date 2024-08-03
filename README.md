# React + Semantic Ui React + Java SpringBoot + Jwt + PostgreSQL + PL/pgSQL

Hola!

En este repositorio he subido la parte frontend de mi proyecto, básicamente este trata de un sistema de información que simula la compra de items de una tienda virtual como un **"Carrito de Compras"**, además, realiza la admministración de usuarios almacenados en el sistema. Esto es, porque para ingresar al sistema debes tener un usuario, y dependiendo si eres administrador o no, podrás realizar todo el proceso de lectura, escritura, editado y borrado de los usuarios. Lo que significa que el sistema detecta el rol del usuario que ha iniciado sesión y limita el acceso a recursos de este dependiendo de su rol.

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

# Diagrama de Funcionamiento

 ```mermaid
  sequenceDiagram
      Client->>Server: Hello John, how are you?
      Server-->>Client: Great!
      Client->>Server: See you later!
  ```

