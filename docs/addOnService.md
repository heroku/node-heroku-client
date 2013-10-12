# addon-service

Add-on services represent add-ons that may be provisioned for apps.

## Actions

### `info`

`heroku.addonServices({addon-service_id_or_name}).info({callback});`

Method | Path
--- | ---
GET | /addon-services/{addon-service_id_or_name}

### `list`

`heroku.addonServices().list({callback});`

Method | Path
--- | ---
GET | /addon-services

