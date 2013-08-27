# Add-on

Add-ons represent add-ons that have been provisioned for an app.

## Actions

### `create`

`heroku.apps({app_id_or_name}).addons().create({attributes}, {callback});`

Method | Path | Expected Status(es)
--- | --- | ---
POST | /apps/{app_id_or_name}/addons | 201

#### Optional Attributes

- config
- plan:id
- plan:name

### `list`

`heroku.apps({app_id_or_name}).addons().list({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | /apps/{app_id_or_name}/addons | 200, 206

### `info`

`heroku.apps({app_id_or_name}).addons({addon_id}).info({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | /apps/{app_id_or_name}/addons/{addon_id} | 200

### `update`

`heroku.apps({app_id_or_name}).addons({addon_id}).update({attributes}, {callback});`

Method | Path | Expected Status(es)
--- | --- | ---
PATCH | /apps/{app_id_or_name}/addons/{addon_id} | 200

#### Optional Attributes

- config
- plan:id
- plan:name

### `delete`

`heroku.apps({app_id_or_name}).addons({addon_id}).delete({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
DELETE | /apps/{app_id_or_name}/addons/{addon_id} | 200

## Attributes

### `config`

*Additional add-on service specific configuration.*

Example | Serialized? | Type
--- | --- | ---
[object Object] | false | object

### `created_at`

*When add-on was created.*

Example | Serialized? | Type
--- | --- | ---
2012-01-01T12:00:00Z | true | datetime

### `id`

*Unique identifier of this add-on.*

Example | Serialized? | Type
--- | --- | ---
01234567-89ab-cdef-0123-456789abcdef | true | uuid

### `plan:id`

*Unique identifier for plan.*

Example | Serialized? | Type
--- | --- | ---
01234567-89ab-cdef-0123-456789abcdef | true | uuid

### `plan:name`

*Unique name for plan.*

Example | Serialized? | Type
--- | --- | ---
heroku-postgresql:dev | true | string

### `updated_at`

*When add-on was updated.*

Example | Serialized? | Type
--- | --- | ---
2012-01-01T12:00:00Z | true | datetime

