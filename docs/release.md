# release

A release represents a combination of code, config vars and add-ons for an app on Heroku.

## Actions

### `info`

`heroku.apps({app_id_or_name}).releases({release_id_or_version}).info({callback});`

Method | Path
--- | ---
GET | /apps/{app_id_or_name}/releases/{release_id_or_version}

### `list`

`heroku.apps({app_id_or_name}).releases().list({callback});`

Method | Path
--- | ---
GET | /apps/{app_id_or_name}/releases

### `create`

`heroku.apps({app_id_or_name}).releases().create({attributes}, {callback});`

Method | Path
--- | ---
POST | /apps/{app_id_or_name}/releases

### `rollback`

`heroku.apps({app_id_or_name}).releases().rollback({attributes}, {callback});`

Method | Path
--- | ---
POST | /apps/{app_id_or_name}/releases

