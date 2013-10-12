# config-var

Config Vars allow you to manage the configuration information provided to an app on Heroku.

## Actions

### `info`

`heroku.apps({app_id_or_name}).configVars().info({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | apps/{app_id_or_name}/config-vars | ### `update`

`heroku.apps({app_id_or_name}).configVars().update({attributes}, {callback});`

Method | Path | Expected Status(es)
--- | --- | ---
PATCH | apps/{app_id_or_name}/config-vars | 