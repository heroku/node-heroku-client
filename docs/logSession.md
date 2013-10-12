# log-session

A log session is a reference to the http based log stream for an app.

## Actions

### `create`

`heroku.apps({app_id_or_name}).logSessions().create({attributes}, {callback});`

Method | Path
--- | ---
POST | /apps/{app_id_or_name}/log-sessions

