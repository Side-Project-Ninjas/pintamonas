# join

--------------------------------------------------------------------------------

Une al usuario actual a la sala especificada. A partir de entonces establece comunicación con el resto de sockets de la sala.

## URL

`/api/join`

## Método

`POST`

## Parámetros de entrada

### Opcionales

`name`:string - El nombre de la sala a la que vas a unirte. Si no se provee este parametro se creará una sala nueva

## Respuesta con éxito

- **HTTP Code**: 200
- **Content**:

  ```json
  {
    "status": "OK",
    "room": "<RoomName>"
  }
  ```

  `status`: Determina el éxito o el fracaso de la petición.

  `room`: El nombre de la sala a la que se ha unido el usuario.

## Respuesta con error

### Full user config is neccessary

El usuario que hizo la petición aún no está completo (le falta el nombre)

- **HTTP Code**: 500
- **Content**:

  ```json
  {
    "message": "Full user config is neccessary",
    "error": {}
  }
  ```

  `error`: detalles del error.

  `message`: Motivo del error.

## Ejemplo

```javascript
var data = { name: 'My new room' };

$http.post('/api/join', data)
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

Este servicio solo permite unirte a la sala si la petición es realizada por un usuario de pleno derecho.
