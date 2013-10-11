# oauth-client

OAuth clients are applications that Heroku users can authorize to automate, customize or extend their usage of the platform. For more information please refer to the [Heroku OAuth documentation](https://devcenter.heroku.com/articles/oauth).

## Actions

### `create`

`heroku.oauth().clients().create({attributes}, {callback});`

Method | Path | Expected Status(es)
--- | --- | ---
POST | /oauth/clients | ### `delete`

`heroku.oauth().clients({(%23%2Fdefinitions%2Foauth-client%2Fdefinitions%2Fidentity)}).delete({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
DELETE | /oauth/clients/{(%23%2Fdefinitions%2Foauth-client%2Fdefinitions%2Fidentity)} | ### `info`

`heroku.oauth().clients({(%23%2Fdefinitions%2Foauth-client%2Fdefinitions%2Fidentity)}).info({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | /oauth/clients/{(%23%2Fdefinitions%2Foauth-client%2Fdefinitions%2Fidentity)} | ### `list`

`heroku.oauth().clients().list({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | /oauth/clients | ### `update`

`heroku.oauth().clients({(%23%2Fdefinitions%2Foauth-client%2Fdefinitions%2Fidentity)}).update({attributes}, {callback});`

Method | Path | Expected Status(es)
--- | --- | ---
PATCH | /oauth/clients/{(%23%2Fdefinitions%2Foauth-client%2Fdefinitions%2Fidentity)} | 