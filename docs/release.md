# release

A release represents a combination of code, config vars and add-ons for an app on Heroku.

## Actions

### `info`

`heroku.apps({(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fidentity)}).releases({(%23%2Fdefinitions%2Frelease%2Fdefinitions%2Fidentity)}).info({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | /apps/{(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fidentity)}/releases/{(%23%2Fdefinitions%2Frelease%2Fdefinitions%2Fidentity)} | ### `list`

`heroku.apps({(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fidentity)}).releases().list({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | /apps/{(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fidentity)}/releases | ### `rollback`

`heroku.apps({(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fidentity)}).releases().rollback({attributes}, {callback});`

Method | Path | Expected Status(es)
--- | --- | ---
POST | /apps/{(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fidentity)}/releases | 