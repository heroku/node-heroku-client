# slug

A slug is a snapshot of your application code that is ready to run on the platform.

## Actions

### `info`

`heroku.apps({app_id_or_name}).slugs({slug_id}).info({callback});`

Method | Path
--- | ---
GET | /apps/{app_id_or_name}/slugs/{slug_id}

### `create`

`heroku.apps({app_id_or_name}).slugs().create({attributes}, {callback});`

Method | Path
--- | ---
POST | /apps/{app_id_or_name}/slugs

