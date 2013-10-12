# formation

The formation of processes that should be maintained for your application. Commands and types are defined by the Procfile uploaded with an app.

## Actions

### `info`

`heroku.apps({app_id_or_name}).formation({formation_id_or_type}).info({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | apps/{app_id_or_name}/formation/{formation_id_or_type} | ### `list`

`heroku.apps({app_id_or_name}).formation().list({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | apps/{app_id_or_name}/formation | ### `update`

`heroku.apps({app_id_or_name}).formation({formation_id_or_type}).update({attributes}, {callback});`

Method | Path | Expected Status(es)
--- | --- | ---
PATCH | apps/{app_id_or_name}/formation/{formation_id_or_type} | 