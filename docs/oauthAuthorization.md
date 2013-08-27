# OAuth Authorization

OAuth authorizations represent clients that a Heroku user has authorized to automate, customize or extend their usage of the platform. For more information please refer to the [Heroku OAuth documentation](https://devcenter.heroku.com/articles/oauth)

## Actions

### `create`

`heroku.oauth().authorizations().create({attributes}, {callback});`

Method | Path | Expected Status(es)
--- | --- | ---
POST | /oauth/authorizations | 201

#### Optional Attributes

- client:id
- description

#### Required Attributes

- scope

### `list`

`heroku.oauth().authorizations().list({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | /oauth/authorizations | 200, 206

### `info`

`heroku.oauth().authorizations({authorization_id}).info({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | /oauth/authorizations/{authorization_id} | 200

### `delete`

`heroku.oauth().authorizations({authorization_id}).delete({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
DELETE | /oauth/authorizations/{authorization_id} | 200

## Attributes

### `access_token:expires_in`

*Seconds until oauth access token expires.*

Example | Serialized? | Type
--- | --- | ---
`7200` | true | number

### `access_token:id`

*Unique identifier of this authorization's oauth access token.*

Example | Serialized? | Type
--- | --- | ---
`01234567-89ab-cdef-0123-456789abcdef` | true | uuid

### `access_token:token`

*The actual oauth access token.*

Example | Serialized? | Type
--- | --- | ---
`01234567-89ab-cdef-0123-456789abcdef` | true | string

### `client:id`

*Unique identifier of this oauth authorization client.*

Example | Serialized? | Type
--- | --- | ---
`01234567-89ab-cdef-0123-456789abcdef` | true | uuid

### `client:name`

*Oauth authorization client name.*

Example | Serialized? | Type
--- | --- | ---
`example` | true | string

### `client:redirect_uri`

*Endpoint for redirection after authorization with oauth authorization client.*

Example | Serialized? | Type
--- | --- | ---
`https://example.com/auth/heroku/callback` | true | string

### `created_at`

*When oauth authorization was created.*

Example | Serialized? | Type
--- | --- | ---
`2012-01-01T12:00:00Z` | true | datetime

### `description`

*Human-friendly description of this oauth authorization.*

Example | Serialized? | Type
--- | --- | ---
`sample authorization` | true | string

### `grant:code`

*Code for the oauth authorization grant.*

Example | Serialized? | Type
--- | --- | ---
`01234567-89ab-cdef-0123-456789abcdef` | true | string

### `grant:expires_in`

*Date in which this authorization grant is no longer valid.*

Example | Serialized? | Type
--- | --- | ---
`2012-01-01T12:00:00Z` | true | datetime

### `grant:id`

*Unique identifier for this authorization's grant.*

Example | Serialized? | Type
--- | --- | ---
`01234567-89ab-cdef-0123-456789abcdef` | true | uuid

### `id`

*Unique identifier of oauth authorization.*

Example | Serialized? | Type
--- | --- | ---
`01234567-89ab-cdef-0123-456789abcdef` | true | uuid

### `refresh_token:expires_in`

*Seconds until oauth refresh token expires; may be `null` for a refresh token with indefinite lifetime.*

Example | Serialized? | Type
--- | --- | ---
`7200` | true | number

### `refresh_token:id`

*Unique identifier of this authorization's oauth refresh token.*

Example | Serialized? | Type
--- | --- | ---
`01234567-89ab-cdef-0123-456789abcdef` | true | uuid

### `refresh_token:token`

*The actual oauth refresh token.*

Example | Serialized? | Type
--- | --- | ---
`01234567-89ab-cdef-0123-456789abcdef` | true | string

### `scope`

*The scope of access oauth authorization allows.*

Example | Serialized? | Type
--- | --- | ---
`global` | true | array[string]

### `updated_at`

*When oauth authorization was updated.*

Example | Serialized? | Type
--- | --- | ---
`2012-01-01T12:00:00Z` | true | datetime

