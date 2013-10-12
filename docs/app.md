# app

An app represents the program that you would like to deploy and run on Heroku.

## Actions

### `create`

`heroku.apps().create({attributes}, {callback});`

Method | Path | Expected Status(es)
--- | --- | ---
POST | /apps | ### `delete`

`heroku.apps({app_id_or_name}).delete({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
DELETE | /apps/{app_id_or_name} | ### `info`

`heroku.apps({app_id_or_name}).info({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | /apps/{app_id_or_name} | ### `list`

`heroku.apps().list({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | /apps | ### `update`

`heroku.apps({app_id_or_name}).update({attributes}, {callback});`

Method | Path | Expected Status(es)
--- | --- | ---
PATCH | /apps/{app_id_or_name} | 