# oauth-client

OAuth clients are applications that Heroku users can authorize to automate, customize or extend their usage of the platform. For more information please refer to the [Heroku OAuth documentation](https://devcenter.heroku.com/articles/oauth).

## Actions

### `create`

`heroku.oauth().clients().create({attributes}, {callback});`

Method | Path | Expected Status(es)
--- | --- | ---
POST | oauth/clients | ### `delete`

`heroku.oauth().clients({oauth-client_id}).delete({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
DELETE | oauth/clients/{oauth-client_id} | ### `info`

`heroku.oauth().clients({oauth-client_id}).info({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | oauth/clients/{oauth-client_id} | ### `list`

`heroku.oauth().clients().list({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | oauth/clients | ### `update`

`heroku.oauth().clients({oauth-client_id}).update({attributes}, {callback});`

Method | Path | Expected Status(es)
--- | --- | ---
PATCH | oauth/clients/{oauth-client_id} | 