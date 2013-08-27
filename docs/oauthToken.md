# OAuth Token

OAuth tokens provide access for authorized clients to act on behalf of a Heroku user to automate, customize or extend their usage of the platform. For more information please refer to the [Heroku OAuth documentation](https://devcenter.heroku.com/articles/oauth)

## Actions

### `create`

`heroku.oauth().tokens().create({attributes}, {callback});`

Method | Path | Expected Status(es)
--- | --- | ---
POST | /oauth/tokens | 201

#### Optional Attributes

- client:secret
- grant:code
- refresh_token:token

#### Required Attributes

- grant:type

## Attributes

### `authorization:id`

*unique identifier of OAuth token authorization.*

Example | Serialized? | Type
--- | --- | ---
`01234567-89ab-cdef-0123-456789abcdef` | true | uuid

### `access_token:expires_in`

*seconds until OAuth access token expires.*

Example | Serialized? | Type
--- | --- | ---
`2592000` | true | number

### `access_token:id`

*unique identifier of OAuth access token.*

Example | Serialized? | Type
--- | --- | ---
`01234567-89ab-cdef-0123-456789abcdef` | true | uuid

### `access_token:token`

*content of OAuth access token.*

Example | Serialized? | Type
--- | --- | ---
`01234567-89ab-cdef-0123-456789abcdef` | true | string

### `client:secret`

*OAuth client secret used to obtain token.*

Example | Serialized? | Type
--- | --- | ---
`01234567-89ab-cdef-0123-456789abcdef` | false | string

### `created_at`

*when OAuth token was created.*

Example | Serialized? | Type
--- | --- | ---
`2012-01-01T12:00:00Z` | true | datetime

### `grant:code`

*grant code recieved from OAuth web application authorization.*

Example | Serialized? | Type
--- | --- | ---
`01234567-89ab-cdef-0123-456789abcdef` | false | string

### `grant:type`

*type of grant requested, one of `authorization_code` or `refresh_token`.*

Example | Serialized? | Type
--- | --- | ---
`authorization_code` | false | string

### `id`

*unique identifier of OAuth token.*

Example | Serialized? | Type
--- | --- | ---
`01234567-89ab-cdef-0123-456789abcdef` | true | uuid

### `refresh_token:expires_in`

*seconds until OAuth refresh token expires; may be `null` for a refresh token with indefinite lifetime.*

Example | Serialized? | Type
--- | --- | ---
`2592000` | true | number

### `refresh_token:id`

*unique identifier of OAuth refresh token.*

Example | Serialized? | Type
--- | --- | ---
`01234567-89ab-cdef-0123-456789abcdef` | true | uuid

### `refresh_token:token`

*content of OAuth refresh token.*

Example | Serialized? | Type
--- | --- | ---
`01234567-89ab-cdef-0123-456789abcdef` | true | string

### `session:id`

*unique identifier of OAuth token session.*

Example | Serialized? | Type
--- | --- | ---
`01234567-89ab-cdef-0123-456789abcdef` | true | string

### `updated_at`

*when OAuth token was updated.*

Example | Serialized? | Type
--- | --- | ---
`2012-01-01T12:00:00Z` | true | datetime

### `user:id`

*unique identifier of the user.*

Example | Serialized? | Type
--- | --- | ---
`01234567-89ab-cdef-0123-456789abcdef` | true | uuid

