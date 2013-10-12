# key

Keys represent public SSH keys associated with an account and are used to authorize accounts as they are performing git operations.

## Actions

### `create`

`heroku.account().keys().create({attributes}, {callback});`

Method | Path
--- | ---
POST | /account/keys

### `delete`

`heroku.account().keys({key_fingerprint_or_id}).delete({callback});`

Method | Path
--- | ---
DELETE | /account/keys/{key_fingerprint_or_id}

### `info`

`heroku.account().keys({key_fingerprint_or_id}).info({callback});`

Method | Path
--- | ---
GET | /account/keys/{key_fingerprint_or_id}

### `list`

`heroku.account().keys().list({callback});`

Method | Path
--- | ---
GET | /account/keys

