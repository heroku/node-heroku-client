# space

A space is an isolated, highly available, secure app execution environments, running in the modern VPC substrate.

## Actions

### `list`

`heroku.spaces().list({callback});`

Method | Path
--- | ---
GET | /spaces

### `info`

`heroku.spaces({space_id_or_name}).info({callback});`

Method | Path
--- | ---
GET | /spaces/{space_id_or_name}

### `update`

`heroku.spaces({space_id_or_name}).update({attributes}, {callback});`

Method | Path
--- | ---
PATCH | /spaces/{space_id_or_name}

### `delete`

`heroku.spaces({space_id_or_name}).delete({callback});`

Method | Path
--- | ---
DELETE | /spaces/{space_id_or_name}

### `create`

`heroku.spaces().create({attributes}, {callback});`

Method | Path
--- | ---
POST | /spaces

