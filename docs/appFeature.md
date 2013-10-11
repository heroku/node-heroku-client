# app-feature

An app feature represents a Heroku labs capability that can be enabled or disabled for an app on Heroku.

## Actions

### `info`

`heroku.apps({(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fidentity)}).features({(%23%2Fdefinitions%2Fapp-feature%2Fdefinitions%2Fidentity)}).info({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | /apps/{(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fidentity)}/features/{(%23%2Fdefinitions%2Fapp-feature%2Fdefinitions%2Fidentity)} | ### `list`

`heroku.apps({(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fidentity)}).features().list({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | /apps/{(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fidentity)}/features | ### `update`

`heroku.apps({(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fidentity)}).features({(%23%2Fdefinitions%2Fapp-feature%2Fdefinitions%2Fidentity)}).update({attributes}, {callback});`

Method | Path | Expected Status(es)
--- | --- | ---
PATCH | /apps/{(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fidentity)}/features/{(%23%2Fdefinitions%2Fapp-feature%2Fdefinitions%2Fidentity)} | 