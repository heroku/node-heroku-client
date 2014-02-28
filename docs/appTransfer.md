# app-transfer

An app transfer represents a two party interaction for transferring ownership of an app.

## Actions

### `create`

`heroku.account().appTransfers().create({attributes}, {callback});`

Method | Path
--- | ---
POST | /account/app-transfers

### `delete`

`heroku.account().appTransfers({app_id_or_name}).delete({callback});`

Method | Path
--- | ---
DELETE | /account/app-transfers/{app_id_or_name}

### `info`

`heroku.account().appTransfers({app_id_or_name}).info({callback});`

Method | Path
--- | ---
GET | /account/app-transfers/{app_id_or_name}

### `list`

`heroku.account().appTransfers().list({callback});`

Method | Path
--- | ---
GET | /account/app-transfers

### `update`

`heroku.account().appTransfers({app_id_or_name}).update({attributes}, {callback});`

Method | Path
--- | ---
PATCH | /account/app-transfers/{app_id_or_name}

