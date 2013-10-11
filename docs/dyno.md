# dyno

Dynos encapsulate running processes of an app on Heroku.

## Actions

### `create`

`heroku.apps({(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fidentity)}).dynos().create({attributes}, {callback});`

Method | Path | Expected Status(es)
--- | --- | ---
POST | /apps/{(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fidentity)}/dynos | ### `restartDyno`

`heroku.apps({(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fidentity)}).dynos({(%23%2Fdefinitions%2Fdyno%2Fdefinitions%2Fidentity)}).restartDyno({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
DELETE | /apps/{(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fidentity)}/dynos/{(%23%2Fdefinitions%2Fdyno%2Fdefinitions%2Fidentity)} | ### `restartAllDynos`

`heroku.apps({(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fidentity)}).dynos().restartAllDynos({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
DELETE | /apps/{(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fidentity)}/dynos | ### `info`

`heroku.apps({(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fidentity)}).dynos({(%23%2Fdefinitions%2Fdyno%2Fdefinitions%2Fidentity)}).info({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | /apps/{(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fidentity)}/dynos/{(%23%2Fdefinitions%2Fdyno%2Fdefinitions%2Fidentity)} | ### `list`

`heroku.apps({(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fidentity)}).dynos().list({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | /apps/{(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fidentity)}/dynos | 