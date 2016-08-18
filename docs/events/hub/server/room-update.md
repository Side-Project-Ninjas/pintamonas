# room-update

--------------------------------------------------------------------------------

Emitido cuando hay cambios en una sala.

## Namespace

`/hub`

## Emisor

`Servidor`: Este evento se emite del servidor al cliente.

## Payload

```javascript
{
  name: "overjoyed otter",
  maxUsers: 8,
  currentUsers: 0,
  level: 0
}
```
`name`: El nombre de la sala.

`maxUsers`: Número máximo de usuarios simultáneos.

`currentUsers`: Número actual de usuarios.

`level`: Nivel de dificultad entre 0 y 2
