# Log Session

Log sessions provide a URL to stream data from your app logs. Streaming is performed by doing an HTTP GET method on the provided Logplex URL and then repeatedly reading from the socket. Sessions remain available for about 5 minutes after creation or about one hour after connecting. For continuous access to an app's log, you should set up a [log drain](https://devcenter.heroku.com/articles/logging#syslog-drains).

## Actions

### `create`

`heroku.apps({app_id_or_name}).logSessions().create({attributes}, {callback});`

Method | Path | Expected Status(es)
--- | --- | ---
POST | /apps/{app_id_or_name}/log-sessions | 201

#### Optional Attributes

- dyno
- lines
- source
- tail


## Attributes

### `created_at`

*When log connection was created.*

Example | Serialized? | Type
--- | --- | ---
2012-01-01T12:00:00Z | true | datetime

### `dyno`

*Dyno to limit results to.*

Example | Serialized? | Type
--- | --- | ---
web.1 | false | string

### `id`

*Unique identifier of this log session.*

Example | Serialized? | Type
--- | --- | ---
01234567-89ab-cdef-0123-456789abcdef | true | uuid

### `lines`

*Number of log lines to stream at once.*

Example | Serialized? | Type
--- | --- | ---
10 | false | number

### `logplex_url`

*Url for log streaming session.*

Example | Serialized? | Type
--- | --- | ---
https://logplex.heroku.com/sessions/01234567-89ab-cdef-0123-456789abcdef?srv=1325419200 | true | string

### `source`

*Log source to limit results to.*

Example | Serialized? | Type
--- | --- | ---
app | false | string

### `tail`

*Whether to stream ongoing logs.*

Example | Serialized? | Type
--- | --- | ---
true | false | boolean

### `updated_at`

*When log session was updated.*

Example | Serialized? | Type
--- | --- | ---
2012-01-01T12:00:00Z | true | datetime

