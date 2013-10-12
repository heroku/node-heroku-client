# release

A release represents a combination of code, config vars and add-ons for an app on Heroku.

## Actions

### `info`

Info for existing release.

`heroku.apps({app_id_or_name}).releases({release_id_or_version}).info({callback});`

Method | Path
--- | ---
GET | /apps/{app_id_or_name}/releases/{release_id_or_version}

### `list`

List existing releases.

`heroku.apps({app_id_or_name}).releases().list({callback});`

Method | Path
--- | ---
GET | /apps/{app_id_or_name}/releases

### `post`

Rollback to an existing release.

`heroku.apps({app_id_or_name}).releases().post({attributes}, {callback});`

Method | Path
--- | ---
POST | /apps/{app_id_or_name}/releases

