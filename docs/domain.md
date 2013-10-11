# domain

Domains define what web routes should be routed to an app on Heroku.

## Actions

### `create`

`heroku.apps({(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fidentity)}).domains().create({attributes}, {callback});`

Method | Path | Expected Status(es)
--- | --- | ---
POST | /apps/{(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fidentity)}/domains | ### `delete`

`heroku.apps({(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fidentity)}).domains({(%23%2Fdefinitions%2Fdomain%2Fdefinitions%2Fidentity)}).delete({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
DELETE | /apps/{(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fidentity)}/domains/{(%23%2Fdefinitions%2Fdomain%2Fdefinitions%2Fidentity)} | ### `info`

`heroku.apps({(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fidentity)}).domains({(%23%2Fdefinitions%2Fdomain%2Fdefinitions%2Fidentity)}).info({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | /apps/{(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fidentity)}/domains/{(%23%2Fdefinitions%2Fdomain%2Fdefinitions%2Fidentity)} | ### `list`

`heroku.apps({(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fidentity)}).domains().list({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | /apps/{(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fidentity)}/domains | 