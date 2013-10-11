# oauth-authorization

OAuth authorizations represent clients that a Heroku user has authorized to automate, customize or extend their usage of the platform. For more information please refer to the [Heroku OAuth documentation](https://devcenter.heroku.com/articles/oauth)

## Actions

### `create`

`heroku.oauth().authorizations().create({attributes}, {callback});`

Method | Path | Expected Status(es)
--- | --- | ---
POST | /oauth/authorizations | ### `delete`

`heroku.oauth().authorizations({(%23%2Fdefinitions%2Foauth-authorization%2Fdefinitions%2Fidentity)}).delete({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
DELETE | /oauth/authorizations/{(%23%2Fdefinitions%2Foauth-authorization%2Fdefinitions%2Fidentity)} | ### `info`

`heroku.oauth().authorizations({(%23%2Fdefinitions%2Foauth-authorization%2Fdefinitions%2Fidentity)}).info({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | /oauth/authorizations/{(%23%2Fdefinitions%2Foauth-authorization%2Fdefinitions%2Fidentity)} | ### `list`

`heroku.oauth().authorizations().list({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | /oauth/authorizations | 