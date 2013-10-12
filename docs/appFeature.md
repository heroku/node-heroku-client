# app-feature

An app feature represents a Heroku labs capability that can be enabled or disabled for an app on Heroku.

## Actions

### `info`

Info for an existing app feature.

`heroku.apps({app_id_or_name}).features({app_id_or_name}).info({callback});`

Method | Path
--- | ---
GET | /apps/{app_id_or_name}/features/{app_id_or_name}

### `list`

List existing app features.

`heroku.apps({app_id_or_name}).features().list({callback});`

Method | Path
--- | ---
GET | /apps/{app_id_or_name}/features

### `update`

Update an existing app feature.

`heroku.apps({app_id_or_name}).features({app_id_or_name}).update({attributes}, {callback});`

Method | Path
--- | ---
PATCH | /apps/{app_id_or_name}/features/{app_id_or_name}

