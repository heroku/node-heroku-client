# account-feature

An account feature represents a Heroku labs capability that can be enabled or disabled for an account on Heroku.

## Actions

### `info`

`heroku.account().features({(%23%2Fdefinitions%2Faccount-feature%2Fdefinitions%2Fidentity)}).info({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | /account/features/{(%23%2Fdefinitions%2Faccount-feature%2Fdefinitions%2Fidentity)} | ### `list`

`heroku.account().features().list({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | /account/features | ### `update`

`heroku.account().features({(%23%2Fdefinitions%2Faccount-feature%2Fdefinitions%2Fidentity)}).update({attributes}, {callback});`

Method | Path | Expected Status(es)
--- | --- | ---
PATCH | /account/features/{(%23%2Fdefinitions%2Faccount-feature%2Fdefinitions%2Fidentity)} | 