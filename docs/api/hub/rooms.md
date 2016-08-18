# rooms

--------------------------------------------------------------------------------

Devuelve una lista con las salas actuales

## URL

`/api/hub/rooms`

## Método

`GET`

## Respuesta con éxito

- **HTTP Code**: 200
- **Content**:

  ```json
  {
    "rooms": [
      {
        "name": "overjoyed otter",
        "maxUsers": 8,
        "currentUsers": 0,
        "level": 0
      }
    ]
  }
  ```

  `rooms`: Array con una lista de salas. Cada sala tiene las siguientes propiedades:
  * `name`: El nombre de la sala.

    `maxUsers`: Número máximo de usuarios simultáneos.

    `currentUsers`: Número actual de usuarios.

    `level`: Nivel de dificultad entre 0 y 2

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

  `error`: Detalle del error.

  `message`: Motivo del error.

## Ejemplo

```javascript
$http.get('/api/hub/rooms')
  .then(
    function(response){
     // success callback
    },
    function(response){
     // failure callback
    }
  );
```
