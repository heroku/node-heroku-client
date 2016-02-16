# account

An account represents an individual signed up to use the Heroku platform.

## Actions

### `info`

`heroku.account().info({callback});`

Method | Path
--- | ---
GET | /account

### `update`

`heroku.account().update({attributes}, {callback});`

Method | Path
--- | ---
PATCH | /account

### `changeEmail`

`heroku.account().changeEmail({attributes}, {callback});`

Method | Path
--- | ---
PATCH | /account

### `changePassword`

`heroku.account().changePassword({attributes}, {callback});`

Method | Path
--- | ---
PATCH | /account

### `delete`

`heroku.account().delete({callback});`

Method | Path
--- | ---
DELETE | /account

### `info`

`heroku.users({account_email_or_id_or_self}).info({callback});`

Method | Path
--- | ---
GET | /users/{account_email_or_id_or_self}

### `update`

`heroku.users({account_email_or_id_or_self}).update({attributes}, {callback});`

Method | Path
--- | ---
PATCH | /users/{account_email_or_id_or_self}

### `changeEmail`

`heroku.users({account_email_or_id_or_self}).changeEmail({attributes}, {callback});`

Method | Path
--- | ---
PATCH | /users/{account_email_or_id_or_self}

### `changePassword`

`heroku.users({account_email_or_id_or_self}).changePassword({attributes}, {callback});`

Method | Path
--- | ---
PATCH | /users/{account_email_or_id_or_self}

### `delete`

`heroku.users({account_email_or_id_or_self}).delete({callback});`

Method | Path
--- | ---
DELETE | /users/{account_email_or_id_or_self}

