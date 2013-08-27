# Region

Regions represent geographic locations in which your application may run.

## Actions

### `list`

`heroku.regions().list({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | /regions | 200, 206

### `info`

`heroku.regions({region_id_or_name}).info({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | /regions/{region_id_or_name} | 200

## Attributes

### `created_at`

*when region was created.*

Example | Serialized? | Type
--- | --- | ---
`2012-01-01T12:00:00Z` | true | datetime

### `description`

*description of the region.*

Example | Serialized? | Type
--- | --- | ---
`United States` | true | string

### `id`

*unique identifier of this region.*

Example | Serialized? | Type
--- | --- | ---
`01234567-89ab-cdef-0123-456789abcdef` | true | uuid

### `name`

*unique name of the region.*

Example | Serialized? | Type
--- | --- | ---
`us` | true | string

### `updated_at`

*when region was updated.*

Example | Serialized? | Type
--- | --- | ---
`2012-01-01T12:00:00Z` | true | datetime

