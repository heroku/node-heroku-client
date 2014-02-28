# log-drain

[Log drains](https://devcenter.heroku.com/articles/logging#syslog-drains) provide a way to forward your Heroku logs to an external syslog server for long-term archiving. This external service must be configured to receive syslog packets from Heroku, whereupon its URL can be added to an app using this API. Some addons will add a log drain when they are provisioned to an app. These drains can only be removed by removing the add-on.

## Actions

### `create`

`heroku.apps({app_id_or_name}).logDrains().create({attributes}, {callback});`

Method | Path
--- | ---
POST | /apps/{app_id_or_name}/log-drains

### `delete`

`heroku.apps({app_id_or_name}).logDrains({log-drain_id_or_url}).delete({callback});`

Method | Path
--- | ---
DELETE | /apps/{app_id_or_name}/log-drains/{log-drain_id_or_url}

### `info`

`heroku.apps({app_id_or_name}).logDrains({log-drain_id_or_url}).info({callback});`

Method | Path
--- | ---
GET | /apps/{app_id_or_name}/log-drains/{log-drain_id_or_url}

### `list`

`heroku.apps({app_id_or_name}).logDrains().list({callback});`

Method | Path
--- | ---
GET | /apps/{app_id_or_name}/log-drains

