# Add-on Service

Add-on services represent add-ons that may be provisioned for apps.

## Actions

### `list`

`heroku.addonServices().list({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | /addon-services | 200, 206

### `info`

`heroku.addonServices({addon_service_id_or_name}).info({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | /addon-services/{addon_service_id_or_name} | 200

## Attributes

### `created_at`

*when add-on service was created.*

Example | Serialized? | Type
--- | --- | ---
`2012-01-01T12:00:00Z` | true | datetime

### `id`

*unique identifier of service.*

Example | Serialized? | Type
--- | --- | ---
`01234567-89ab-cdef-0123-456789abcdef` | true | uuid

### `name`

*unique name for add-on service.*

Example | Serialized? | Type
--- | --- | ---
`heroku-postgresql` | true | string

### `updated_at`

*when add-on service was updated.*

Example | Serialized? | Type
--- | --- | ---
`2012-01-01T12:00:00Z` | true | datetime

