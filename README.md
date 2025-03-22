# Blog
Una aplicación para gestionar un blog de una comunidad de usuarios.

# Descripción

La aplicación tiene las siguientes características:

- Es instalable en PC y móvil, es decir es una aplicación web progresiva (PWA)
- Permite el registro de múltiples usuarios  
- Existen 2 roles de usuario: ADMIN y USER
  

La aplicación tiene las siguientes funcionalidades:

- En la página inicial se muestran todos los posts publicados, que son públicos para todo el mundo.
- Cualquier usuario registrado puede crear posts y modificar y eliminar los que ha creado.
- Sólo el usuario con rol ADMIN puede publicar un post de cualquier usuario. También puede despublicar.
- Los usuarios con rol USER no pueden publicar ni despublicar los post que han creado ni ningún otro.
- Una vez publicado un post, no podrá editarse ni eliminarse. 
- Solo el usuario con rol ADMIN podrá despublicar un post y así permitir la modificación o eliminación de dicho post.
  



# Detalles técnicos

Si deseas probar por ti mismo el código, sigue los siguientes pasos.

## Clonar repositorio

```
git  clone  https://github.com/jamj2000/nxapp-blog
cd   nxapp-blog
```

## Configurar variables de entorno

```
mv  .env.example  .env
```
Y establecemos valores para las variables.


## Instalar dependencias

 ```
 npm  install
 ```


## Inicializar BD (seed)

Para inicializar la BD con datos ficticios hacemos

```
npm  run  seed
```

## Iniciar en modo desarrollo


```
npm  run  dev
```


## Dependencias

Este proyecto hace uso de las siguientes dependencias:

**Dependencias de desarrollo**

- prisma
- @faker-js/faker 

**Dependencias de aplicación**

- @prisma/client  
- next-auth@beta  
- @auth/prisma-adapter 
- lucide-react
- bcryptjs
- cloudinary
- react-spinners
- sonner
- slugify
- @tiptap/react  
- @tiptap/pm  
- @tiptap/html  
- @tiptap/starter-kit
- @tiptap/extension-color
- @tiptap/extension-list-item 
- @tiptap/extension-text-style


## Diagrama E-R simplificado


![Diagrama ER simplificado](public/images/diagrama-er-blog.png)


# Agradecimientos

Este proyecto está basado en gran medida en uno anterior de **Miguel Chacón Barranco** aka [miguelcb04 en Github](https://github.com/miguelcb04).

- [Proyecto base](https://github.com/miguelcb04/blog-backend)

También el agradecimiento a la empresa que lo acogió para la realización de la FCT.

![FedeSoft](public/images/logo-fs-color.svg)
