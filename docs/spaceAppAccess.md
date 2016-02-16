# space-app-access

Space access represents the privileges a particular user has on a particular space.

## Actions

### `info`

`heroku.spaces({space_id_or_name}).members({account_email_or_id_or_self}).info({callback});`

Method | Path
--- | ---
GET | /spaces/{space_id_or_name}/members/{account_email_or_id_or_self}

### `update`

`heroku.spaces({space_id_or_name}).members({account_email_or_id_or_self}).update({attributes}, {callback});`

Method | Path
--- | ---
PATCH | /spaces/{space_id_or_name}/members/{account_email_or_id_or_self}

### `list`

`heroku.spaces({space_id_or_name}).members().list({callback});`

Method | Path
--- | ---
GET | /spaces/{space_id_or_name}/members

