# SSL Endpoint

[SSL Endpoints](https://devcenter.heroku.com/articles/ssl-endpoint) are public addresses serving custom SSL certs for HTTPS traffic to Heroku apps. Note that an app must have the `ssl:endpoint` addon installed before it can provision an SSL Endpoint using these APIs.

## Actions

### `create`

`heroku.apps({app_id_or_name}).sslEndpoints().create({attributes}, {callback});`

Method | Path | Expected Status(es)
--- | --- | ---
POST | /apps/{app_id_or_name}/ssl-endpoints | 201


#### Required Attributes

- certificate_chain
- private_key

### `list`

`heroku.apps({app_id_or_name}).sslEndpoints().list({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | /apps/{app_id_or_name}/ssl-endpoints | 200, 206

### `info`

`heroku.apps({app_id_or_name}).sslEndpoints({ssl_endpoint_id_or_name}).info({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | /apps/{app_id_or_name}/ssl-endpoints/{ssl_endpoint_id_or_name} | 200

### `update`

`heroku.apps({app_id_or_name}).sslEndpoints({ssl_endpoint_id_or_name}).update({attributes}, {callback});`

Method | Path | Expected Status(es)
--- | --- | ---
PATCH | /apps/{app_id_or_name}/ssl-endpoints/{ssl_endpoint_id_or_name} | 200

#### Optional Attributes

- certificate_chain
- private_key
- rollback


### `delete`

`heroku.apps({app_id_or_name}).sslEndpoints({ssl_endpoint_id_or_name}).delete({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
DELETE | /apps/{app_id_or_name}/ssl-endpoints/{ssl_endpoint_id_or_name} | 200

## Attributes

### `certificate_chain`

*raw contents of the public certificate chain (eg: .crt or .pem file).*

Example | Serialized? | Type
--- | --- | ---
`-----BEGIN CERTIFICATE----- ...` | true | string

### `cname`

*canonical name record, the address to point a domain at.*

Example | Serialized? | Type
--- | --- | ---
`example.herokussl.com` | true | string

### `created_at`

*when endpoint was created.*

Example | Serialized? | Type
--- | --- | ---
`2012-01-01T12:00:00-00:00` | true | datetime

### `id`

*unique identifier of this SSL endpoint.*

Example | Serialized? | Type
--- | --- | ---
`01234567-89ab-cdef-0123-456789abcdef` | true | uuid

### `name`

*unique name for SSL endpoint.*

Example | Serialized? | Type
--- | --- | ---
`tokyo-1234` | true | string

### `private_key`

*contents of the private key (eg .key file).*

Example | Serialized? | Type
--- | --- | ---
`-----BEGIN RSA PRIVATE KEY----- ...` | false | string

### `rollback`

*indicates that a rollback should be performed.*

Example | Serialized? | Type
--- | --- | ---
`true` | false | boolean

### `updated_at`

*when endpoint was updated.*

Example | Serialized? | Type
--- | --- | ---
`2012-01-01T12:00:00-00:00` | true | datetime

