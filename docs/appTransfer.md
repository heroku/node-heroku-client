# app-transfer

An app transfer represents a two party interaction for transferring ownership of an app.

## Actions

### `create`

Create a new app transfer.

`heroku.account().appTransfers().create({attributes}, {callback});`

Method | Path
--- | ---
POST | /account/app-transfers

### `delete`

Delete an existing app transfer

`heroku.account().appTransfers({app-transfer_id}).delete({callback});`

Method | Path
--- | ---
DELETE | /account/app-transfers/{app-transfer_id}

### `info`

Info for existing app transfer.

`heroku.account().appTransfers({app-transfer_id}).info({callback});`

Method | Path
--- | ---
GET | /account/app-transfers/{app-transfer_id}

### `list`

List existing apps transfers.

`heroku.account().appTransfers().list({callback});`

Method | Path
--- | ---
GET | /account/app-transfers

### `update`

Update an existing app transfer.

`heroku.account().appTransfers({app-transfer_id}).update({attributes}, {callback});`

Method | Path
--- | ---
PATCH | /account/app-transfers/{app-transfer_id}

