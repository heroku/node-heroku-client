# formation

The formation of processes that should be maintained for your application. Commands and types are defined by the Procfile uploaded with an app.

## Actions

### `info`

`heroku.apps({(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fidentity)}).formation({(%23%2Fdefinitions%2Fformation%2Fdefinitions%2Fidentity)}).info({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | /apps/{(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fidentity)}/formation/{(%23%2Fdefinitions%2Fformation%2Fdefinitions%2Fidentity)} | ### `list`

`heroku.apps({(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fidentity)}).formation().list({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | /apps/{(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fidentity)}/formation | ### `update`

`heroku.apps({(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fidentity)}).formation({(%23%2Fdefinitions%2Fformation%2Fdefinitions%2Fidentity)}).update({attributes}, {callback});`

Method | Path | Expected Status(es)
--- | --- | ---
PATCH | /apps/{(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fidentity)}/formation/{(%23%2Fdefinitions%2Fformation%2Fdefinitions%2Fidentity)} | 