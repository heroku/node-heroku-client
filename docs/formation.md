# Formation

The formation of processes that should be maintained for your application. Commands and types are defined by the Procfile uploaded with an app.

## Actions

### `list`

`heroku.apps({app_id_or_name}).formation().list({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | /apps/{app_id_or_name}/formation | 200, 206

### `info`

`heroku.apps({app_id_or_name}).formation({formation_id_or_type}).info({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | /apps/{app_id_or_name}/formation/{formation_id_or_type} | 200

### `update`

`heroku.apps({app_id_or_name}).formation({formation_id_or_type}).update({attributes}, {callback});`

Method | Path | Expected Status(es)
--- | --- | ---
PATCH | /apps/{app_id_or_name}/formation/{formation_id_or_type} | 200

#### Optional Attributes

- quantity
- size


## Attributes

### `command`

*Command to use for process type.*

Example | Serialized? | Type
--- | --- | ---
bundle exec rails server -p $PORT | true | string

### `created_at`

*When domain was created.*

Example | Serialized? | Type
--- | --- | ---
2012-01-01T12:00:00Z | true | datetime

### `id`

*Unique identifier of this process type.*

Example | Serialized? | Type
--- | --- | ---
01234567-89ab-cdef-0123-456789abcdef | true | uuid

### `quantity`

*Number of processes to maintain.*

Example | Serialized? | Type
--- | --- | ---
1 | true | number

### `size`

*Dyno size (default: 1).*

Example | Serialized? | Type
--- | --- | ---
1 | true | number

### `type`

*Type of process to maintain.*

Example | Serialized? | Type
--- | --- | ---
web | true | string

### `updated_at`

*When dyno type was updated.*

Example | Serialized? | Type
--- | --- | ---
2012-01-01T12:00:00Z | true | datetime

