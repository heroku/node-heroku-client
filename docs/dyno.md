# Dyno

Dynos encapsulate running processes of an app on Heroku.

## Actions

### `create`

`heroku.apps({app_id_or_name}).dynos().create({attributes}, {callback});`

Method | Path | Expected Status(es)
--- | --- | ---
POST | /apps/{app_id_or_name}/dynos | 201

#### Optional Attributes

- attach
- size

#### Required Attributes

- command

### `list`

`heroku.apps({app_id_or_name}).dynos().list({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | /apps/{app_id_or_name}/dynos | 200, 206

### `info`

`heroku.apps({app_id_or_name}).dynos({dyno_id_or_name}).info({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | /apps/{app_id_or_name}/dynos/{dyno_id_or_name} | 200

### `delete`

`heroku.apps({app_id_or_name}).dynos({dyno_id_or_name}).delete({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
DELETE | /apps/{app_id_or_name}/dynos/{dyno_id_or_name} | 200

## Attributes

### `attach`

*Whether to stream output or not.*

Example | Serialized? | Type
--- | --- | ---
true | false | boolean

### `attach_url`

*A url to stream output from for attached processes or null for non-attached processes.*

Example | Serialized? | Type
--- | --- | ---
rendezvous://rendezvous.runtime.heroku.com:5000/{rendezvous-id} | true | string

### `command`

*Command used to start this process.*

Example | Serialized? | Type
--- | --- | ---
bash | true | string

### `created_at`

*When domain was created.*

Example | Serialized? | Type
--- | --- | ---
2012-01-01T12:00:00Z | true | datetime

### `id`

*Unique identifier of this dyno.*

Example | Serialized? | Type
--- | --- | ---
01234567-89ab-cdef-0123-456789abcdef | true | uuid

### `name`

*The name of this process on this app.*

Example | Serialized? | Type
--- | --- | ---
run.1 | true | string

### `release:id`

*The unique identifier of the release this process was started with.*

Example | Serialized? | Type
--- | --- | ---
01234567-89ab-cdef-0123-456789abcdef | true | uuid

### `release:version`

*The unique version of the release this process was started with.*

Example | Serialized? | Type
--- | --- | ---
456 | true | number

### `size`

*Dyno size (default: 1).*

Example | Serialized? | Type
--- | --- | ---
1 | true | number

### `state`

*Current status of process (either: crashed, down, idle, starting, or up).*

Example | Serialized? | Type
--- | --- | ---
up | true | string

### `type`

*Type of process.*

Example | Serialized? | Type
--- | --- | ---
run | true | string

### `updated_at`

*When process last changed state.*

Example | Serialized? | Type
--- | --- | ---
2012-01-01T12:00:00Z | true | datetime

