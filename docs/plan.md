# plan

Plans represent different configurations of add-ons that may be added to apps. Endpoints under add-on services can be accessed without authentication.

## Actions

### `info`

`heroku.addonServices({addon-service_id_or_name}).plans({plan_id_or_name}).info({callback});`

Method | Path
--- | ---
GET | /addon-services/{addon-service_id_or_name}/plans/{plan_id_or_name}

### `list`

`heroku.addonServices({addon-service_id_or_name}).plans().list({callback});`

Method | Path
--- | ---
GET | /addon-services/{addon-service_id_or_name}/plans

