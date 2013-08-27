# Release

A release represents a combination of code, config vars and add-ons for an app on Heroku.

## Actions

### `list`

`heroku.apps({app_id_or_name}).releases().list({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | /apps/{app_id_or_name}/releases | 200, 206

### `info`

`heroku.apps({app_id_or_name}).releases({release_id_or_version}).info({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | /apps/{app_id_or_name}/releases/{release_id_or_version} | 200

## Attributes

### `created_at`

*when release was created.*

Example | Serialized? | Type
--- | --- | ---
`2012-01-01T12:00:00Z` | true | datetime

### `description`

*description of changes in this release.*

Example | Serialized? | Type
--- | --- | ---
`Added new feature` | true | string

### `id`

*unique identifier of this release.*

Example | Serialized? | Type
--- | --- | ---
`01234567-89ab-cdef-0123-456789abcdef` | true | uuid

### `updated_at`

*when region was updated.*

Example | Serialized? | Type
--- | --- | ---
`2012-01-01T12:00:00Z` | true | datetime

### `user:email`

*email address of user that created the release.*

Example | Serialized? | Type
--- | --- | ---
`username@example.com` | true | string

### `user:id`

*unique identifier of the user that created the release.*

Example | Serialized? | Type
--- | --- | ---
`01234567-89ab-cdef-0123-456789abcdef` | true | uuid

### `version`

*unique version assigned to the release.*

Example | Serialized? | Type
--- | --- | ---
`456` | true | number

