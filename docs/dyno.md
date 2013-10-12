# dyno

Dynos encapsulate running processes of an app on Heroku.

## Actions

### `create`

Create a new dyno.

`heroku.apps({app_id_or_name}).dynos().create({attributes}, {callback});`

Method | Path
--- | ---
POST | /apps/{app_id_or_name}/dynos

### `delete`

Restart dyno.

`heroku.apps({app_id_or_name}).dynos({dyno_id_or_name}).delete({callback});`

Method | Path
--- | ---
DELETE | /apps/{app_id_or_name}/dynos/{dyno_id_or_name}

### `delete`

Restart all dynos

`heroku.apps({app_id_or_name}).dynos().delete({callback});`

Method | Path
--- | ---
DELETE | /apps/{app_id_or_name}/dynos

### `info`

Info for existing dyno.

`heroku.apps({app_id_or_name}).dynos({dyno_id_or_name}).info({callback});`

Method | Path
--- | ---
GET | /apps/{app_id_or_name}/dynos/{dyno_id_or_name}

### `list`

List existing dynos.

`heroku.apps({app_id_or_name}).dynos().list({callback});`

Method | Path
--- | ---
GET | /apps/{app_id_or_name}/dynos

