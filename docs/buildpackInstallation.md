# buildpack-installation

An buildpack installtion represents a buildpack that will be run against an app.

## Actions

### `update`

`heroku.apps({app_id_or_name}).buildpackInstallations().update({attributes}, {callback});`

Method | Path
--- | ---
PUT | /apps/{app_id_or_name}/buildpack-installations

### `list`

`heroku.apps({app_id_or_name}).buildpackInstallations().list({callback});`

Method | Path
--- | ---
GET | /apps/{app_id_or_name}/buildpack-installations

