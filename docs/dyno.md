# dyno

Dynos encapsulate running processes of an app on Heroku.

## Actions

### `create`

`heroku.apps({app_id_or_name}).dynos().create({attributes}, {callback});`

Method | Path
--- | ---
POST | /apps/{app_id_or_name}/dynos

### `restart`

`heroku.apps({app_id_or_name}).dynos({dyno_id_or_name}).restart({callback});`

Method | Path
--- | ---
DELETE | /apps/{app_id_or_name}/dynos/{dyno_id_or_name}

### `restartAll`

`heroku.apps({app_id_or_name}).dynos().restartAll({callback});`

Method | Path
--- | ---
DELETE | /apps/{app_id_or_name}/dynos

### `info`

`heroku.apps({app_id_or_name}).dynos({dyno_id_or_name}).info({callback});`

Method | Path
--- | ---
GET | /apps/{app_id_or_name}/dynos/{dyno_id_or_name}

### `list`

`heroku.apps({app_id_or_name}).dynos().list({callback});`

Method | Path
--- | ---
GET | /apps/{app_id_or_name}/dynos

