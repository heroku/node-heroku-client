# Key

Keys represent public SSH keys associated with an account and are used to authorize users as they are performing git operations.

## Actions

### `create`

`heroku.account().keys().create({attributes}, {callback});`

Method | Path | Expected Status(es)
--- | --- | ---
POST | /account/keys | 201


#### Required Attributes

- public_key

### `list`

`heroku.account().keys().list({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | /account/keys | 200

### `info`

`heroku.account().keys({key_id_or_fingerprint}).info({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | /account/keys/{key_id_or_fingerprint} | 200

### `delete`

`heroku.account().keys({key_id_or_fingerprint}).delete({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
DELETE | /account/keys/{key_id_or_fingerprint} | 200

## Attributes

### `created_at`

*when key was created*

Example | Serialized? | Type
--- | --- | ---
`2012-01-01T12:00:00Z` | true | datetime

### `email`

*email address provided in key contents*

Example | Serialized? | Type
--- | --- | ---
`username@example.com` | true | string

### `fingerprint`

*a unique identifying string based on contents*

Example | Serialized? | Type
--- | --- | ---
`17:63:a4:ba:24:d3:7f:af:17:c8:94:82:7e:80:56:bf` | true | string

### `id`

*unique identifier of this key*

Example | Serialized? | Type
--- | --- | ---
`01234567-89ab-cdef-0123-456789abcdef` | true | uuid

### `public_key`

*full public_key as uploaded*

Example | Serialized? | Type
--- | --- | ---
`ssh-rsa AAAAB3NzaC1ycVc/../839Uv username@example.com` | true | string

### `updated_at`

*when key was updated*

Example | Serialized? | Type
--- | --- | ---
`2012-01-01T12:00:00Z` | true | datetime

