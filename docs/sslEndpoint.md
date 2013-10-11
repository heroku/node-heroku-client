# ssl-endpoint

[SSL Endpoint](https://devcenter.heroku.com/articles/ssl-endpoint) is a public address serving custom SSL cert for HTTPS traffic to a Heroku app. Note that an app must have the `ssl:endpoint` addon installed before it can provision an SSL Endpoint using these APIs.

## Actions

### `create`

`heroku.apps({(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fidentity)}).sslEndpoints().create({attributes}, {callback});`

Method | Path | Expected Status(es)
--- | --- | ---
POST | /apps/{(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fidentity)}/ssl-endpoints | ### `delete`

`heroku.apps({(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fidentity)}).sslEndpoints({(%23%2Fdefinitions%2Fssl-endpoint%2Fdefinitions%2Fidentity)}).delete({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
DELETE | /apps/{(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fidentity)}/ssl-endpoints/{(%23%2Fdefinitions%2Fssl-endpoint%2Fdefinitions%2Fidentity)} | ### `info`

`heroku.apps({(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fidentity)}).sslEndpoints({(%23%2Fdefinitions%2Fssl-endpoint%2Fdefinitions%2Fidentity)}).info({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | /apps/{(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fidentity)}/ssl-endpoints/{(%23%2Fdefinitions%2Fssl-endpoint%2Fdefinitions%2Fidentity)} | ### `list`

`heroku.apps({(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fidentity)}).sslEndpoints().list({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | /apps/{(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fidentity)}/ssl-endpoints | ### `update`

`heroku.apps({(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fidentity)}).sslEndpoints({(%23%2Fdefinitions%2Fssl-endpoint%2Fdefinitions%2Fidentity)}).update({attributes}, {callback});`

Method | Path | Expected Status(es)
--- | --- | ---
PATCH | /apps/{(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fidentity)}/ssl-endpoints/{(%23%2Fdefinitions%2Fssl-endpoint%2Fdefinitions%2Fidentity)} | 