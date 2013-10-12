# ssl-endpoint

[SSL Endpoint](https://devcenter.heroku.com/articles/ssl-endpoint) is a public address serving custom SSL cert for HTTPS traffic to a Heroku app. Note that an app must have the `ssl:endpoint` addon installed before it can provision an SSL Endpoint using these APIs.

## Actions

### `create`

`heroku.apps({app_id_or_name}).sslEndpoints().create({attributes}, {callback});`

Method | Path | Expected Status(es)
--- | --- | ---
POST | apps/{app_id_or_name}/ssl-endpoints | ### `delete`

`heroku.apps({app_id_or_name}).sslEndpoints({ssl-endpoint_id_or_name}).delete({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
DELETE | apps/{app_id_or_name}/ssl-endpoints/{ssl-endpoint_id_or_name} | ### `info`

`heroku.apps({app_id_or_name}).sslEndpoints({ssl-endpoint_id_or_name}).info({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | apps/{app_id_or_name}/ssl-endpoints/{ssl-endpoint_id_or_name} | ### `list`

`heroku.apps({app_id_or_name}).sslEndpoints().list({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | apps/{app_id_or_name}/ssl-endpoints | ### `update`

`heroku.apps({app_id_or_name}).sslEndpoints({ssl-endpoint_id_or_name}).update({attributes}, {callback});`

Method | Path | Expected Status(es)
--- | --- | ---
PATCH | apps/{app_id_or_name}/ssl-endpoints/{ssl-endpoint_id_or_name} | 