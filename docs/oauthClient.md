# OAuth Client

OAuth clients are applications that Heroku users can authorize to automate, customize or extend their usage of the platform. For more information please refer to the [Heroku OAuth documentation](https://devcenter.heroku.com/articles/oauth)

## Actions

### `create`

`heroku.oauth().clients().create({attributes}, {callback});`

Method | Path | Expected Status(es)
--- | --- | ---
POST | /oauth/clients | 201


#### Required Attributes

- name
- redirect_uri

### `list`

`heroku.oauth().clients().list({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | /oauth/clients | 200, 206

### `info`

`heroku.oauth().clients({client_id}).info({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | /oauth/clients/{client_id} | 200

### `update`

`heroku.oauth().clients({client_id}).update({attributes}, {callback});`

Method | Path | Expected Status(es)
--- | --- | ---
PATCH | /oauth/clients/{client_id} | 200

#### Optional Attributes

- name
- redirect_uri


### `delete`

`heroku.oauth().clients({client_id}).delete({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
DELETE | /oauth/clients/{client_id} | 200

## Attributes

### `created_at`

*when OAuth client was created*

Example | Serialized? | Type
--- | --- | ---
`2012-01-01T12:00:00Z` | true | datetime

### `id`

*unique identifier of this OAuth client*

Example | Serialized? | Type
--- | --- | ---
`01234567-89ab-cdef-0123-456789abcdef` | true | uuid

### `name`

*OAuth client name*

Example | Serialized? | Type
--- | --- | ---
`example` | true | string

### `redirect_uri`

*endpoint for redirection after authorization with OAuth client*

Example | Serialized? | Type
--- | --- | ---
`https://example.com/auth/heroku/callback` | true | string

### `secret`

*secret used to obtain OAuth authorizations under this client*

Example | Serialized? | Type
--- | --- | ---
`01234567-89ab-cdef-0123-456789abcdef` | true | string

### `updated_at`

*when OAuth client was updated*

Example | Serialized? | Type
--- | --- | ---
`2012-01-01T12:00:00Z` | true | datetime

