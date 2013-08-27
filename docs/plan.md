# Plan

Plans represent different configurations of add-ons that may be added to apps.

## Actions

### `list`

`heroku.addonServices({addon_service_id_or_name}).plans().list({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | /addon-services/{addon_service_id_or_name}/plans | 200, 206

### `info`

`heroku.addonServices({addon_service_id_or_name}).plans({plan_id_or_name}).info({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | /addon-services/{addon_service_id_or_name}/plans/{plan_id_or_name} | 200

## Attributes

### `created_at`

*When plan was created.*

Example | Serialized? | Type
--- | --- | ---
`2012-01-01T12:00:00Z` | true | datetime

### `description`

*Description of plan.*

Example | Serialized? | Type
--- | --- | ---
`Heroku Postgres Dev` | true | string

### `id`

*Unique identifier of plan.*

Example | Serialized? | Type
--- | --- | ---
`01234567-89ab-cdef-0123-456789abcdef` | true | uuid

### `name`

*Unique name for plan.*

Example | Serialized? | Type
--- | --- | ---
`heroku-postgresql:dev` | true | string

### `price:cents`

*Price in cents per unit of plan.*

Example | Serialized? | Type
--- | --- | ---
`0` | true | number

### `price:unit`

*Unit of price for plan.*

Example | Serialized? | Type
--- | --- | ---
`month` | true | string

### `state`

*Release status for plan.*

Example | Serialized? | Type
--- | --- | ---
`public` | true | string

### `updated_at`

*When plan was updated.*

Example | Serialized? | Type
--- | --- | ---
`2012-01-01T12:00:00Z` | true | datetime

