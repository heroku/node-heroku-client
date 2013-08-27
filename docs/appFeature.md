# App Feature

An app feature represents a Heroku labs capability that can be enabled or disabled for an app on Heroku.

## Actions

### `list`

`heroku.apps({app_id_or_name}).features().list({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | /apps/{app_id_or_name}/features | 200, 206

### `info`

`heroku.apps({app_id_or_name}).features({feature_id_or_name}).info({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | /apps/{app_id_or_name}/features/{feature_id_or_name} | 200

### `update`

`heroku.apps({app_id_or_name}).features({feature_id_or_name}).update({attributes}, {callback});`

Method | Path | Expected Status(es)
--- | --- | ---
PATCH | /apps/{app_id_or_name}/features/{feature_id_or_name} | 200


#### Required Attributes

- enabled

## Attributes

### `created_at`

*when app feature was created.*

Example | Serialized? | Type
--- | --- | ---
`2012-01-01T12:00:00-00:00` | true | datetime

### `description`

*description of app feature.*

Example | Serialized? | Type
--- | --- | ---
`Causes app to example.` | true | string

### `doc_url`

*documentation URL of app feature.*

Example | Serialized? | Type
--- | --- | ---
`http://devcenter.heroku.com/articles/example` | true | string

### `enabled`

*whether or not app feature has been enabled.*

Example | Serialized? | Type
--- | --- | ---
`true` | true | boolean

### `id`

*unique identifier of app feature.*

Example | Serialized? | Type
--- | --- | ---
`01234567-89ab-cdef-0123-456789abcdef` | true | uuid

### `name`

*unique name of app feature.*

Example | Serialized? | Type
--- | --- | ---
`example` | true | string

### `updated_at`

*when app feature was updated.*

Example | Serialized? | Type
--- | --- | ---
`2012-01-01T12:00:00-00:00` | true | datetime

