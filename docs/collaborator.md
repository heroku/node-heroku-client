# Collaborator

Collaborators are other users who have been given access to an app on Heroku.

## Actions

### `create`

`heroku.apps({app_id_or_name}).collaborators().create({attributes}, {callback});`

Method | Path | Expected Status(es)
--- | --- | ---
POST | /apps/{app_id_or_name}/collaborators | 201

#### Optional Attributes

- silent
- user:email
- user:id


### `list`

`heroku.apps({app_id_or_name}).collaborators().list({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | /apps/{app_id_or_name}/collaborators | 200, 206

### `info`

`heroku.apps({app_id_or_name}).collaborators({collaborator_id_or_email}).info({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | /apps/{app_id_or_name}/collaborators/{collaborator_id_or_email} | 200

### `delete`

`heroku.apps({app_id_or_name}).collaborators({collaborator_id_or_email}).delete({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
DELETE | /apps/{app_id_or_name}/collaborators/{collaborator_id_or_email} | 200

## Attributes

### `created_at`

*When collaborator was created.*

Example | Serialized? | Type
--- | --- | ---
`2012-01-01T12:00:00Z` | true | datetime

### `id`

*Unique identifier of this collaborator.*

Example | Serialized? | Type
--- | --- | ---
`01234567-89ab-cdef-0123-456789abcdef` | true | uuid

### `silent`

*When true, suppresses the invitation to collaborate e-mail.*

Example | Serialized? | Type
--- | --- | ---
`false` | false | boolean

### `updated_at`

*When collaborator was updated.*

Example | Serialized? | Type
--- | --- | ---
`2012-01-01T12:00:00Z` | true | datetime

### `user:email`

*Collaborator email address.*

Example | Serialized? | Type
--- | --- | ---
`collaborator@example.com` | true | string

### `user:id`

*Unique identifier of the user.*

Example | Serialized? | Type
--- | --- | ---
`01234567-89ab-cdef-0123-456789abcdef` | true | uuid

