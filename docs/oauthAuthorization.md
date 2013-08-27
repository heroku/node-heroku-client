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

*seconds until OAuth access token expires*

Example | Serialized? | Type
--- | --- | ---
`7200` | true | number

### `access_token:id`

*unique identifier of this authorization's OAuth access token*

Example | Serialized? | Type
--- | --- | ---
`01234567-89ab-cdef-0123-456789abcdef` | true | uuid

### `access_token:token`

*the actual OAuth access token*

Example | Serialized? | Type
--- | --- | ---
`01234567-89ab-cdef-0123-456789abcdef` | true | string

### `client:id`

*unique identifier of this OAuth authorization client*

Example | Serialized? | Type
--- | --- | ---
`01234567-89ab-cdef-0123-456789abcdef` | true | uuid

### `client:name`

*OAuth authorization client name*

Example | Serialized? | Type
--- | --- | ---
`example` | true | string

### `client:redirect_uri`

*endpoint for redirection after authorization with OAuth authorization client*

Example | Serialized? | Type
--- | --- | ---
`https://example.com/auth/heroku/callback` | true | string

### `created_at`

*when OAuth authorization was created*

Example | Serialized? | Type
--- | --- | ---
`2012-01-01T12:00:00Z` | true | datetime

### `description`

*human-friendly description of this OAuth authorization*

Example | Serialized? | Type
--- | --- | ---
`sample authorization` | true | string

### `grant:code`

*code for the OAuth authorization grant*

Example | Serialized? | Type
--- | --- | ---
`01234567-89ab-cdef-0123-456789abcdef` | true | string

### `grant:expires_in`

*date in which this authorization grant is no longer valid*

Example | Serialized? | Type
--- | --- | ---
`2012-01-01T12:00:00Z` | true | datetime

### `grant:id`

*unique identifier for this authorization's grant*

Example | Serialized? | Type
--- | --- | ---
`01234567-89ab-cdef-0123-456789abcdef` | true | uuid

### `id`

*unique identifier of OAuth authorization*

Example | Serialized? | Type
--- | --- | ---
`01234567-89ab-cdef-0123-456789abcdef` | true | uuid

### `refresh_token:expires_in`

*seconds until OAuth refresh token expires; may be `null` for a refresh token with indefinite lifetime*

Example | Serialized? | Type
--- | --- | ---
`7200` | true | number

### `refresh_token:id`

*unique identifier of this authorization's OAuth refresh token*

Example | Serialized? | Type
--- | --- | ---
`01234567-89ab-cdef-0123-456789abcdef` | true | uuid

### `refresh_token:token`

*the actual OAuth refresh token*

Example | Serialized? | Type
--- | --- | ---
`01234567-89ab-cdef-0123-456789abcdef` | true | string

### `scope`

*The scope of access OAuth authorization allows*

Example | Serialized? | Type
--- | --- | ---
`global` | true | array[string]

### `updated_at`

*when OAuth authorization was updated*

Example | Serialized? | Type
--- | --- | ---
`2012-01-01T12:00:00Z` | true | datetime

