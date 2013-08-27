# Account Password

undefined

## Actions

### `update`

`heroku.account().password().update({attributes}, {callback});`

Method | Path | Expected Status(es)
--- | --- | ---
PUT | /account/password | 200


#### Required Attributes

- current_password
- password

## Attributes

### `current_password`

*Existing password value.*

Example | Serialized? | Type
--- | --- | ---
`0123456789abcdef` | false | string

### `password`

*New password value.*

Example | Serialized? | Type
--- | --- | ---
`abcdef0123456789` | false | string

