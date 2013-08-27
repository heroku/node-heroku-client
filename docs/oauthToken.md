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

*Unique identifier of oauth token authorization.*

Example | Serialized? | Type
--- | --- | ---
01234567-89ab-cdef-0123-456789abcdef | true | uuid

### `access_token:expires_in`

*Seconds until oauth access token expires.*

Example | Serialized? | Type
--- | --- | ---
2592000 | true | number

### `access_token:id`

*Unique identifier of oauth access token.*

Example | Serialized? | Type
--- | --- | ---
01234567-89ab-cdef-0123-456789abcdef | true | uuid

### `access_token:token`

*Content of oauth access token.*

Example | Serialized? | Type
--- | --- | ---
01234567-89ab-cdef-0123-456789abcdef | true | string

### `client:secret`

*Oauth client secret used to obtain token.*

Example | Serialized? | Type
--- | --- | ---
01234567-89ab-cdef-0123-456789abcdef | false | string

### `created_at`

*When oauth token was created.*

Example | Serialized? | Type
--- | --- | ---
2012-01-01T12:00:00Z | true | datetime

### `grant:code`

*Grant code recieved from oauth web application authorization.*

Example | Serialized? | Type
--- | --- | ---
01234567-89ab-cdef-0123-456789abcdef | false | string

### `grant:type`

*Type of grant requested, one of `authorization_code` or `refresh_token`.*

Example | Serialized? | Type
--- | --- | ---
authorization_code | false | string

### `id`

*Unique identifier of oauth token.*

Example | Serialized? | Type
--- | --- | ---
01234567-89ab-cdef-0123-456789abcdef | true | uuid

### `refresh_token:expires_in`

*Seconds until oauth refresh token expires; may be `null` for a refresh token with indefinite lifetime.*

Example | Serialized? | Type
--- | --- | ---
2592000 | true | number

### `refresh_token:id`

*Unique identifier of oauth refresh token.*

Example | Serialized? | Type
--- | --- | ---
01234567-89ab-cdef-0123-456789abcdef | true | uuid

### `refresh_token:token`

*Content of oauth refresh token.*

Example | Serialized? | Type
--- | --- | ---
01234567-89ab-cdef-0123-456789abcdef | true | string

### `session:id`

*Unique identifier of oauth token session.*

Example | Serialized? | Type
--- | --- | ---
01234567-89ab-cdef-0123-456789abcdef | true | string

### `updated_at`

*When oauth token was updated.*

Example | Serialized? | Type
--- | --- | ---
2012-01-01T12:00:00Z | true | datetime

### `user:id`

*Unique identifier of the user.*

Example | Serialized? | Type
--- | --- | ---
01234567-89ab-cdef-0123-456789abcdef | true | uuid

