# user-leave

--------------------------------------------------------------------------------

Emitido cuando un usuario sale de la sala.

## Namespace

`/room`

## Emisor

`Servidor`: Este evento se emite del servidor al cliente.

## Payload

```javascript
{
  action: 'leave',
  emitter: {
    name:'<UserName>',
    discriminator: 0
  }
}
```

`action`: Tipo de acción.

`emitter`: Datos sobre el usuario que se va.

  - `name`: Nombre del usuario.

    `discriminator`: Identificador discriminatorio.
