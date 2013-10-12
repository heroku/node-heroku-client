# domain

Domains define what web routes should be routed to an app on Heroku.

## Actions

### `create`

`heroku.apps({app_id_or_name}).domains().create({attributes}, {callback});`

Method | Path
--- | ---
POST | /apps/{app_id_or_name}/domains

### `delete`

`heroku.apps({app_id_or_name}).domains({domain_hostname_or_id}).delete({callback});`

Method | Path
--- | ---
DELETE | /apps/{app_id_or_name}/domains/{domain_hostname_or_id}

### `info`

`heroku.apps({app_id_or_name}).domains({domain_hostname_or_id}).info({callback});`

Method | Path
--- | ---
GET | /apps/{app_id_or_name}/domains/{domain_hostname_or_id}

### `list`

`heroku.apps({app_id_or_name}).domains().list({callback});`

Method | Path
--- | ---
GET | /apps/{app_id_or_name}/domains

