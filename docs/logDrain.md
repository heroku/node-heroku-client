# log-drain

[Log drains](https://devcenter.heroku.com/articles/logging#syslog-drains) provide a way to forward your Heroku logs to an external syslog server for long-term archiving. This external service must be configured to receive syslog packets from Heroku, whereupon its URL can be added to an app using this API.

## Actions

### `create`

`heroku.apps({app_id_or_name}).logDrains().create({attributes}, {callback});`

Method | Path | Expected Status(es)
--- | --- | ---
POST | apps/{app_id_or_name}/log-drains | ### `delete`

`heroku.apps({app_id_or_name}).logDrains({log-drain_id_or_url}).delete({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
DELETE | apps/{app_id_or_name}/log-drains/{log-drain_id_or_url} | ### `info`

`heroku.apps({app_id_or_name}).logDrains({log-drain_id_or_url}).info({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | apps/{app_id_or_name}/log-drains/{log-drain_id_or_url} | ### `list`

`heroku.apps({app_id_or_name}).logDrains().list({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | apps/{app_id_or_name}/log-drains | 