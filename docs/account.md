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

*Whether to allow web activity tracking with third-party services like google analytics.*

Example | Serialized? | Type
--- | --- | ---
true | true | boolean

### `beta`

*Whether to utilize beta heroku features.*

Example | Serialized? | Type
--- | --- | ---
false | true | boolean

### `created_at`

*When account was created.*

Example | Serialized? | Type
--- | --- | ---
2012-01-01T12:00:00Z | true | datetime

### `email`

*Email address of account.*

Example | Serialized? | Type
--- | --- | ---
username@example.com | true | string

### `id`

*Unique identifier of account.*

Example | Serialized? | Type
--- | --- | ---
01234567-89ab-cdef-0123-456789abcdef | true | uuid

### `last_login`

*When account last authorized with heroku.*

Example | Serialized? | Type
--- | --- | ---
2012-01-01T12:00:00Z | true | datetime

### `updated_at`

*When account was updated.*

Example | Serialized? | Type
--- | --- | ---
2012-01-01T12:00:00Z | true | datetime

### `verified`

*Whether the account has been verified with billing information.*

Example | Serialized? | Type
--- | --- | ---
false | true | boolean

