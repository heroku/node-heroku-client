# app

An app represents the program that you would like to deploy and run on Heroku.

## Actions

### `create`

`heroku.apps().create({attributes}, {callback});`

Method | Path | Expected Status(es)
--- | --- | ---
POST | /apps | ### `delete`

`heroku.apps({(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fidentity)}).delete({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
DELETE | /apps/{(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fidentity)} | ### `info`

`heroku.apps({(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fidentity)}).info({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | /apps/{(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fidentity)} | ### `list`

`heroku.apps().list({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | /apps | ### `update`

`heroku.apps({(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fidentity)}).update({attributes}, {callback});`

Method | Path | Expected Status(es)
--- | --- | ---
PATCH | /apps/{(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fidentity)} | 