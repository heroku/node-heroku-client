# addon

Add-ons represent add-ons that have been provisioned for an app.

## Actions

### `create`

`heroku.apps({(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fidentity)}).addons().create({attributes}, {callback});`

Method | Path | Expected Status(es)
--- | --- | ---
POST | /apps/{(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fidentity)}/addons | ### `delete`

`heroku.apps({(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fidentity)}).addons({(%23%2Fdefinitions%2Faddon%2Fdefinitions%2Fidentity)}).delete({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
DELETE | /apps/{(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fidentity)}/addons/{(%23%2Fdefinitions%2Faddon%2Fdefinitions%2Fidentity)} | ### `info`

`heroku.apps({(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fidentity)}).addons({(%23%2Fdefinitions%2Faddon%2Fdefinitions%2Fidentity)}).info({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | /apps/{(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fidentity)}/addons/{(%23%2Fdefinitions%2Faddon%2Fdefinitions%2Fidentity)} | ### `list`

`heroku.apps({(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fidentity)}).addons().list({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | /apps/{(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fidentity)}/addons | ### `update`

`heroku.apps({(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fidentity)}).addons({(%23%2Fdefinitions%2Faddon%2Fdefinitions%2Fidentity)}).update({attributes}, {callback});`

Method | Path | Expected Status(es)
--- | --- | ---
PATCH | /apps/{(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fidentity)}/addons/{(%23%2Fdefinitions%2Faddon%2Fdefinitions%2Fidentity)} | 