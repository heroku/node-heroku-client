# App Transfer

[Transfers](https://devcenter.heroku.com/articles/transferring-apps) allow a user to transfer ownership of their app to another user. Apps being transferred may be free or have paid resources, but if they are paid, the receiving user must have a [verified account](https://devcenter.heroku.com/articles/account-verification).

## Actions

### `create`

`heroku.account().appTransfers().create({attributes}, {callback});`

Method | Path | Expected Status(es)
--- | --- | ---
POST | /account/app-transfers | 201

#### Optional Attributes

- app:id
- app:name
- recipient:email
- recipient:id


### `list`

`heroku.account().appTransfers().list({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | /account/app-transfers | 200, 206

### `info`

`heroku.account().appTransfers({transfer_id}).info({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | /account/app-transfers/{transfer_id} | 200

### `update`

`heroku.account().appTransfers({transfer_id}).update({attributes}, {callback});`

Method | Path | Expected Status(es)
--- | --- | ---
PATCH | /account/app-transfers/{transfer_id} | 200


#### Required Attributes

- state

### `delete`

`heroku.account().appTransfers({transfer_id}).delete({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
DELETE | /account/app-transfers/{transfer_id} | 200

## Attributes

### `created_at`

*When the transfer was created.*

Example | Serialized? | Type
--- | --- | ---
`2012-01-01T12:00:00Z` | true | datetime

### `app:id`

*Unique identifier of the app being transferred.*

Example | Serialized? | Type
--- | --- | ---
`01234567-89ab-cdef-0123-456789abcdef` | true | string

### `app:name`

*Name of the app being transferred.*

Example | Serialized? | Type
--- | --- | ---
`example` | true | string

### `id`

*Unique identifier of this transfer.*

Example | Serialized? | Type
--- | --- | ---
`01234567-89ab-cdef-0123-456789abcdef` | true | uuid

### `owner:id`

*Unique identifier of the sending user.*

Example | Serialized? | Type
--- | --- | ---
`01234567-89ab-cdef-0123-456789abcdef` | true | string

### `owner:email`

*Email of the sending user.*

Example | Serialized? | Type
--- | --- | ---
`username@example.com` | true | string

### `recipient:id`

*Unique identifier of the receiving user.*

Example | Serialized? | Type
--- | --- | ---
`01234567-89ab-cdef-0123-456789abcdef` | true | string

### `recipient:email`

*Email of the receiving user.*

Example | Serialized? | Type
--- | --- | ---
`username@example.com` | true | string

### `state`

*New state of the transfer; accepted/declined/pending.*

Example | Serialized? | Type
--- | --- | ---
`pending` | true | string

### `updated_at`

*When the transfer was updated.*

Example | Serialized? | Type
--- | --- | ---
`2012-01-01T12:00:00Z` | true | datetime

