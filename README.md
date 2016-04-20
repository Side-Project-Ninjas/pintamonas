# Pintamonas

###### Resumen

Este documento pretende ser un resumen del proyecto.
El proyecto es una aplicación web que implementa una variante del conocido juego de mesa Pictionary, en el que un jugador debe dibujar una palabra y el resto de jugadores tiene que acertar de qué palabra se trata.
Desarrollado por Side-Project-Ninjas.

## Introducción

En este documento se van a detallar las características de la aplicación, tanto de la parte Front como de la parte Back, así como las tecnologías utilizadas en ambas partes.
La aplicación pretende utilizar el stack MEAN.

## Arquitectura

A continuación una lista de las carpetas que conforman la arquitectura.

```
src/                --> código de la aplicación
  server/             --> código del servidor
    config/           --> configuración del servidor
      environment/    --> configuración del entorno
    ||                --> archivos y carpetas del servidor por definir
  client/             --> código del cliente
    views/            --> vistas
    controllers/      --> controladores
    index.html        --> archivo index
    ||                --> archivos y carpetas del servidor por definir
public/             --> carpeta donde se sirve la aplicación
```

## Maqueta



## Tecnologías

##### Frontend

La aplicación utilizará AngularJS como base para la navegación y las vistas.
Las vistas serán generadas con Jade mediante una tarea de Gulp, que compilará los archivos Jade y los moverá a una carpeta Public donde se servirá la aplicación.
Los CSS se generarán utilizando SASS y se compilarán con Gulp, moviéndolos también a la carpeta Public.
Para el dibujo, la aplicación utilizará Canvas de HTML5.
El estado del dibujo se sincronizará entre todos los jugadores en la misma sala, utilizando Socket.IO.

##### backend

Se utilizará un servidor NodeJS que será el encargado tanto de realizar la sincronización entre los jugadores y albergar las salas como de servir la página.
Para realizar la sincronización se utilizará Socket.IO.
Para guardar los datos de los usuarios se utilizará una base de datos MongoDB. A la hora de acceder a la misma, se utilizará el módulo de Mongoose, para facilitar las consultas.
