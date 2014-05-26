# build

A build represents the process of transforming a code tarball into a slug

## Actions

### `create`

`heroku.apps({app_id_or_name}).builds().create({attributes}, {callback});`

Method | Path
--- | ---
POST | /apps/{app_id_or_name}/builds

### `info`

`heroku.apps({app_id_or_name}).builds({build_id}).info({callback});`

Method | Path
--- | ---
GET | /apps/{app_id_or_name}/builds/{build_id}

### `list`

`heroku.apps({app_id_or_name}).builds().list({callback});`

Method | Path
--- | ---
GET | /apps/{app_id_or_name}/builds

