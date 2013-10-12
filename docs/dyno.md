# dyno

Dynos encapsulate running processes of an app on Heroku.

## Actions

### `create`

`heroku.apps({app_id_or_name}).dynos().create({attributes}, {callback});`

Method | Path | Expected Status(es)
--- | --- | ---
POST | apps/{app_id_or_name}/dynos | ### `restartDyno`

`heroku.apps({app_id_or_name}).dynos({dyno_id_or_name}).restartDyno({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
DELETE | apps/{app_id_or_name}/dynos/{dyno_id_or_name} | ### `restartAllDynos`

`heroku.apps({app_id_or_name}).dynos().restartAllDynos({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
DELETE | apps/{app_id_or_name}/dynos | ### `info`

`heroku.apps({app_id_or_name}).dynos({dyno_id_or_name}).info({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | apps/{app_id_or_name}/dynos/{dyno_id_or_name} | ### `list`

`heroku.apps({app_id_or_name}).dynos().list({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | apps/{app_id_or_name}/dynos | 