# Log Drain

[Log drains](https://devcenter.heroku.com/articles/logging#syslog-drains) provide a way to forward your Heroku logs to an external syslog server for long-term archiving. This external service must be configured to receive syslog packets from Heroku, whereupon its URL can be added to an app using this API.

## Actions

### `create`

`heroku.apps({app_id_or_name}).logDrains().create({attributes}, {callback});`

Method | Path | Expected Status(es)
--- | --- | ---
POST | /apps/{app_id_or_name}/log-drains | 201


#### Required Attributes

- url

### `list`

`heroku.apps({app_id_or_name}).logDrains().list({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | /apps/{app_id_or_name}/log-drains | 200

### `info`

`heroku.apps({app_id_or_name}).logDrains({drain_id_or_url}).info({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | /apps/{app_id_or_name}/log-drains/{drain_id_or_url} | 200

### `delete`

`heroku.apps({app_id_or_name}).logDrains({drain_id_or_url}).delete({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
DELETE | /apps/{app_id_or_name}/log-drains/{drain_id_or_url} | 200

## Attributes

### `addon:id`

*unique identifier of the addon that provides the drain*

Example | Serialized? | Type
--- | --- | ---
`01234567-89ab-cdef-0123-456789abcdef` | true | uuid

### `created_at`

*when log drain was created*

Example | Serialized? | Type
--- | --- | ---
`2012-01-01T12:00:00Z` | true | datetime

### `id`

*unique identifier of this log drain*

Example | Serialized? | Type
--- | --- | ---
`01234567-89ab-cdef-0123-456789abcdef` | true | uuid

### `updated_at`

*when log session was updated*

Example | Serialized? | Type
--- | --- | ---
`2012-01-01T12:00:00Z` | true | datetime

### `url`

*url associated with the log drain*

Example | Serialized? | Type
--- | --- | ---
`https://example.com/drain` | true | string

