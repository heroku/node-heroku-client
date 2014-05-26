# app-setup

An app setup represents an app on Heroku that is setup using an environment, addons, and scripts described in an app.json manifest file.

## Actions

### `create`

`heroku.appSetups().create({attributes}, {callback});`

Method | Path
--- | ---
POST | /app-setups

### `info`

`heroku.appSetups({app-setup_id}).info({callback});`

Method | Path
--- | ---
GET | /app-setups/{app-setup_id}

