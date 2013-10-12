# app-transfer

An app transfer represents a two party interaction for transferring ownership of an app.

## Actions

### `create`

`heroku.account().appTransfers().create({attributes}, {callback});`

Method | Path | Expected Status(es)
--- | --- | ---
POST | account/app-transfers | ### `delete`

`heroku.account().appTransfers({app-transfer_id}).delete({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
DELETE | account/app-transfers/{app-transfer_id} | ### `info`

`heroku.account().appTransfers({app-transfer_id}).info({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | account/app-transfers/{app-transfer_id} | ### `list`

`heroku.account().appTransfers().list({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | account/app-transfers | ### `update`

`heroku.account().appTransfers({app-transfer_id}).update({attributes}, {callback});`

Method | Path | Expected Status(es)
--- | --- | ---
PATCH | account/app-transfers/{app-transfer_id} | 