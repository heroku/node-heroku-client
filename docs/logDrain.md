# log-drain

[Log drains](https://devcenter.heroku.com/articles/logging#syslog-drains) provide a way to forward your Heroku logs to an external syslog server for long-term archiving. This external service must be configured to receive syslog packets from Heroku, whereupon its URL can be added to an app using this API.

## Actions

### `create`

Create a new log drain.

`heroku.apps({app_id_or_name}).logDrains().create({attributes}, {callback});`

Method | Path
--- | ---
POST | /apps/{app_id_or_name}/log-drains

### `delete`

Delete an existing log drain.

`heroku.apps({app_id_or_name}).logDrains({log-drain_id_or_url}).delete({callback});`

Method | Path
--- | ---
DELETE | /apps/{app_id_or_name}/log-drains/{log-drain_id_or_url}

### `info`

Info for existing log drain.

`heroku.apps({app_id_or_name}).logDrains({log-drain_id_or_url}).info({callback});`

Method | Path
--- | ---
GET | /apps/{app_id_or_name}/log-drains/{log-drain_id_or_url}

### `list`

List existing log drains.

`heroku.apps({app_id_or_name}).logDrains().list({callback});`

Method | Path
--- | ---
GET | /apps/{app_id_or_name}/log-drains

