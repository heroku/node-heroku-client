# oauth-authorization

OAuth authorizations represent clients that a Heroku user has authorized to automate, customize or extend their usage of the platform. For more information please refer to the [Heroku OAuth documentation](https://devcenter.heroku.com/articles/oauth)

## Actions

### `create`

`heroku.oauth().authorizations().create({attributes}, {callback});`

Method | Path
--- | ---
POST | /oauth/authorizations

### `delete`

`heroku.oauth().authorizations({oauth-authorization_id}).delete({callback});`

Method | Path
--- | ---
DELETE | /oauth/authorizations/{oauth-authorization_id}

### `info`

`heroku.oauth().authorizations({oauth-authorization_id}).info({callback});`

Method | Path
--- | ---
GET | /oauth/authorizations/{oauth-authorization_id}

### `list`

`heroku.oauth().authorizations().list({callback});`

Method | Path
--- | ---
GET | /oauth/authorizations

