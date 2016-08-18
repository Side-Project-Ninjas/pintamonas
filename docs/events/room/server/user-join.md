# user-join

--------------------------------------------------------------------------------

Emitido cuando un usuario se une a la sala.

## Namespace

`/room`

## Emisor

`Servidor`: Este evento se emite del servidor al cliente.

## Payload

```javascript
{
  action: 'join',
  emitter: {
    name:'<UserName>',
    discriminator: 0
  }
}
```

`action`: Tipo de acción.

`emitter`: Datos sobre el usuario que se une.

  - `name`: Nombre del usuario.

    `discriminator`: Identificador discriminatorio.
