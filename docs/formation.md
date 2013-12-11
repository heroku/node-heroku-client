# formation

The formation of processes that should be maintained for an app. Update the formation to scale processes or change dyno sizes. Commands and types are defined by the Procfile uploaded with an app.

## Actions

### `info`

`heroku.apps({app_id_or_name}).formation({formation_id_or_type}).info({callback});`

Method | Path
--- | ---
GET | /apps/{app_id_or_name}/formation/{formation_id_or_type}

### `list`

`heroku.apps({app_id_or_name}).formation().list({callback});`

Method | Path
--- | ---
GET | /apps/{app_id_or_name}/formation

### `batchUpdate`

`heroku.apps({app_id_or_name}).formation().batchUpdate({attributes}, {callback});`

Method | Path
--- | ---
PATCH | /apps/{app_id_or_name}/formation

### `update`

`heroku.apps({app_id_or_name}).formation({formation_id_or_type}).update({attributes}, {callback});`

Method | Path
--- | ---
PATCH | /apps/{app_id_or_name}/formation/{formation_id_or_type}

