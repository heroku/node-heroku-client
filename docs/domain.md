# Domain

Domains define what web routes should be routed to an app on Heroku.

## Actions

### `create`

`heroku.apps({app_id_or_name}).domains().create({attributes}, {callback});`

Method | Path | Expected Status(es)
--- | --- | ---
POST | /apps/{app_id_or_name}/domains | 201


#### Required Attributes

- hostname

### `list`

`heroku.apps({app_id_or_name}).domains().list({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | /apps/{app_id_or_name}/domains | 200, 206

### `info`

`heroku.apps({app_id_or_name}).domains({domain_id_or_hostname}).info({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | /apps/{app_id_or_name}/domains/{domain_id_or_hostname} | 200

### `delete`

`heroku.apps({app_id_or_name}).domains({domain_id_or_hostname}).delete({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
DELETE | /apps/{app_id_or_name}/domains/{domain_id_or_hostname} | 200

## Attributes

### `created_at`

*When domain was created.*

Example | Serialized? | Type
--- | --- | ---
2012-01-01T12:00:00Z | true | datetime

### `hostname`

*Full hostname.*

Example | Serialized? | Type
--- | --- | ---
subdomain.example.com | true | string

### `id`

*Unique identifier of this domain.*

Example | Serialized? | Type
--- | --- | ---
01234567-89ab-cdef-0123-456789abcdef | true | uuid

### `updated_at`

*When domain was updated.*

Example | Serialized? | Type
--- | --- | ---
2012-01-01T12:00:00Z | true | datetime

