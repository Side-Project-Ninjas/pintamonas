# name

--------------------------------------------------------------------------------

Establece el nombre actual del usuario y lo convierte en un _usuario completo_

## URL

`/api/name`

## Método

`POST`

## Parámetros de entrada

### Requeridos

`name`:string - El nombre elegido por el usuario

## Respuesta con éxito

- **HTTP Code**: 200
- **Content**:

  ```json
  {
    "status": "OK",
    "name": "Diego",
    "discriminator": 0
  }
  ```

  `status`: Determina el éxito o el fracaso de la petición.

  `name`: El nombre elegido por el usuario.

  `discriminator`: El discriminador del usuario acorde a su nombre.

## Respuesta con error

### Name must be provided

Falta parámetro `name` en la petición al servicio.

- **HTTP Code**: 500
- **Content**:

  ```json
  {
    "message": "Name already set",
    "error": {}
  }
  ```

  `message`: Motivo del error.

  `error`: Detalles del error.

### Name already set

El nombre de usuario ya ha sido establecido y se intenta volver a establecer

- **HTTP Code**: 500
- **Content**:

  ```json
  {
    "message": "Name already set",
    "error": {}
  }
  ```

  `message`: Motivo del error.

  `error`: Detalles del error.

## Ejemplo

```javascript
var data = { name: 'MyName' };

$http.post('/api/name', data)
  .then(
    function(response){
     // success callback
    },
    function(response){
     // failure callback
    }
  );
```

## Notas

_**[18/08/2016]**_

Este servicio solo te permite establecer tu nombre una vez. El nombre queda grabado por siempre como variable de sesión hasta que dicha sesión termine.
