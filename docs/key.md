# key

Keys represent public SSH keys associated with an account and are used to authorize accounts as they are performing git operations.

## Actions

### `create`

`heroku.account().keys().create({attributes}, {callback});`

Method | Path | Expected Status(es)
--- | --- | ---
POST | /account/keys | ### `delete`

`heroku.account().keys({(%23%2Fdefinitions%2Fkey%2Fdefinitions%2Fidentity)}).delete({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
DELETE | /account/keys/{(%23%2Fdefinitions%2Fkey%2Fdefinitions%2Fidentity)} | ### `info`

`heroku.account().keys({(%23%2Fdefinitions%2Fkey%2Fdefinitions%2Fidentity)}).info({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | /account/keys/{(%23%2Fdefinitions%2Fkey%2Fdefinitions%2Fidentity)} | ### `list`

`heroku.account().keys().list({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | /account/keys | 