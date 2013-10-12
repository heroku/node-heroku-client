# addon-service

Add-on services represent add-ons that may be provisioned for apps.

## Actions

### `info`

Info for existing addon-service.

`heroku.addonServices({addon-service_id_or_name}).info({callback});`

Method | Path
--- | ---
GET | /addon-services/{addon-service_id_or_name}

### `list`

List existing addon-services.

`heroku.addonServices().list({callback});`

Method | Path
--- | ---
GET | /addon-services

