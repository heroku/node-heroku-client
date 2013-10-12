# oauth-authorization

OAuth authorizations represent clients that a Heroku user has authorized to automate, customize or extend their usage of the platform. For more information please refer to the [Heroku OAuth documentation](https://devcenter.heroku.com/articles/oauth)

## Actions

### `create`

Create a new OAuth authorization.

`heroku.oauth().authorizations().create({attributes}, {callback});`

Method | Path
--- | ---
POST | /oauth/authorizations

### `delete`

Delete OAuth authorization.

`heroku.oauth().authorizations({oauth-authorization_id}).delete({callback});`

Method | Path
--- | ---
DELETE | /oauth/authorizations/{oauth-authorization_id}

### `info`

Info for an OAuth authorization.

`heroku.oauth().authorizations({oauth-authorization_id}).info({callback});`

Method | Path
--- | ---
GET | /oauth/authorizations/{oauth-authorization_id}

### `list`

List OAuth authorizations.

`heroku.oauth().authorizations().list({callback});`

Method | Path
--- | ---
GET | /oauth/authorizations

