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

*when plan was created*

Example | Serialized? | Type
--- | --- | ---
`2012-01-01T12:00:00Z` | true | datetime

### `description`

*description of plan*

Example | Serialized? | Type
--- | --- | ---
`Heroku Postgres Dev` | true | string

### `id`

*unique identifier of plan*

Example | Serialized? | Type
--- | --- | ---
`01234567-89ab-cdef-0123-456789abcdef` | true | uuid

### `name`

*unique name for plan*

Example | Serialized? | Type
--- | --- | ---
`heroku-postgresql:dev` | true | string

### `price:cents`

*price in cents per unit of plan*

Example | Serialized? | Type
--- | --- | ---
`0` | true | number

### `price:unit`

*unit of price for plan*

Example | Serialized? | Type
--- | --- | ---
`month` | true | string

### `state`

*release status for plan*

Example | Serialized? | Type
--- | --- | ---
`public` | true | string

### `updated_at`

*when plan was updated*

Example | Serialized? | Type
--- | --- | ---
`2012-01-01T12:00:00Z` | true | datetime

