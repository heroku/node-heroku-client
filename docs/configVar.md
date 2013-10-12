# config-var

Config Vars allow you to manage the configuration information provided to an app on Heroku.

## Actions

### `info`

Get config-vars for app.

`heroku.apps({app_id_or_name}).configVars().info({callback});`

Method | Path
--- | ---
GET | /apps/{app_id_or_name}/config-vars

### `update`

Update config-vars for app.

`heroku.apps({app_id_or_name}).configVars().update({attributes}, {callback});`

Method | Path
--- | ---
PATCH | /apps/{app_id_or_name}/config-vars

