# user-says

--------------------------------------------------------------------------------

Emitido cuando un usuario escribe en el chat.

## Namespace

`/room`

## Emisor

`Servidor`: Este evento se emite del servidor al cliente.

## Payload

```javascript
{
  emitter: {
    name:'<UserName>',
    discriminator: 0
  },
  message: 'Hello world!'
}
```

`emitter`: Datos sobre el emisor del mensaje.

  - `name`: Nombre del usuario.

    `discriminator`: Identificador discriminatorio.

`message`: Texto del mensaje.
