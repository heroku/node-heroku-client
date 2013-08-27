# Account

An account represents you on Heroku.

## Actions

### `info`

`heroku.account().info({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | /account | 200

### `update`

`heroku.account().update({attributes}, {callback});`

Method | Path | Expected Status(es)
--- | --- | ---
PATCH | /account | 200

#### Optional Attributes

- allow_tracking
- email


## Attributes

### `allow_tracking`

*whether to allow web activity tracking with third-party services like Google Analytics.*

Example | Serialized? | Type
--- | --- | ---
`true` | true | boolean

### `beta`

*whether to utilize beta Heroku features.*

Example | Serialized? | Type
--- | --- | ---
`false` | true | boolean

### `created_at`

*when account was created.*

Example | Serialized? | Type
--- | --- | ---
`2012-01-01T12:00:00Z` | true | datetime

### `email`

*email address of account.*

Example | Serialized? | Type
--- | --- | ---
`username@example.com` | true | string

### `id`

*unique identifier of account.*

Example | Serialized? | Type
--- | --- | ---
`01234567-89ab-cdef-0123-456789abcdef` | true | uuid

### `last_login`

*when account last authorized with Heroku.*

Example | Serialized? | Type
--- | --- | ---
`2012-01-01T12:00:00Z` | true | datetime

### `updated_at`

*when account was updated.*

Example | Serialized? | Type
--- | --- | ---
`2012-01-01T12:00:00Z` | true | datetime

### `verified`

*whether the account has been verified with billing information.*

Example | Serialized? | Type
--- | --- | ---
`false` | true | boolean

