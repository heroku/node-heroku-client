# Account Feature

An account feature represents a Heroku labs capability that can be enabled or disabled for an account on Heroku.

## Actions

### `list`

`heroku.account().features().list({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | /account/features | 200, 206

### `info`

`heroku.account().features({feature_id_or_name}).info({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | /account/features/{feature_id_or_name} | 200

### `update`

`heroku.account().features({feature_id_or_name}).update({attributes}, {callback});`

Method | Path | Expected Status(es)
--- | --- | ---
PATCH | /account/features/{feature_id_or_name} | 200


#### Required Attributes

- enabled

## Attributes

### `created_at`

*When account feature was created.*

Example | Serialized? | Type
--- | --- | ---
`2012-01-01T12:00:00-00:00` | true | datetime

### `description`

*Description of account feature.*

Example | Serialized? | Type
--- | --- | ---
`Causes account to example.` | true | string

### `doc_url`

*Documentation url of account feature.*

Example | Serialized? | Type
--- | --- | ---
`http://devcenter.heroku.com/articles/example` | true | string

### `enabled`

*Whether or not account feature has been enabled.*

Example | Serialized? | Type
--- | --- | ---
`true` | true | boolean

### `id`

*Unique identifier of account feature.*

Example | Serialized? | Type
--- | --- | ---
`01234567-89ab-cdef-0123-456789abcdef` | true | uuid

### `name`

*Unique name of account feature.*

Example | Serialized? | Type
--- | --- | ---
`example` | true | string

### `updated_at`

*When account feature was updated.*

Example | Serialized? | Type
--- | --- | ---
`2012-01-01T12:00:00-00:00` | true | datetime

