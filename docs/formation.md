# formation

The formation of processes that should be maintained for your application. Commands and types are defined by the Procfile uploaded with an app.

## Actions

### `info`

Info for a process type

`heroku.apps({app_id_or_name}).formation({formation_id_or_type}).info({callback});`

Method | Path
--- | ---
GET | /apps/{app_id_or_name}/formation/{formation_id_or_type}

### `list`

List process type formation

`heroku.apps({app_id_or_name}).formation().list({callback});`

Method | Path
--- | ---
GET | /apps/{app_id_or_name}/formation

### `update`

Update process type

`heroku.apps({app_id_or_name}).formation({formation_id_or_type}).update({attributes}, {callback});`

Method | Path
--- | ---
PATCH | /apps/{app_id_or_name}/formation/{formation_id_or_type}

