# app-transfer

An app transfer represents a two party interaction for transferring ownership of an app.

## Actions

### `create`

`heroku.account().appTransfers().create({attributes}, {callback});`

Method | Path | Expected Status(es)
--- | --- | ---
POST | /account/app-transfers | ### `delete`

`heroku.account().appTransfers({(%23%2Fdefinitions%2Fapp-transfer%2Fdefinitions%2Fidentity)}).delete({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
DELETE | /account/app-transfers/{(%23%2Fdefinitions%2Fapp-transfer%2Fdefinitions%2Fidentity)} | ### `info`

`heroku.account().appTransfers({(%23%2Fdefinitions%2Fapp-transfer%2Fdefinitions%2Fidentity)}).info({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | /account/app-transfers/{(%23%2Fdefinitions%2Fapp-transfer%2Fdefinitions%2Fidentity)} | ### `list`

`heroku.account().appTransfers().list({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | /account/app-transfers | ### `update`

`heroku.account().appTransfers({(%23%2Fdefinitions%2Fapp-transfer%2Fdefinitions%2Fidentity)}).update({attributes}, {callback});`

Method | Path | Expected Status(es)
--- | --- | ---
PATCH | /account/app-transfers/{(%23%2Fdefinitions%2Fapp-transfer%2Fdefinitions%2Fidentity)} | 