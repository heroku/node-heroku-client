# plan

Plans represent different configurations of add-ons that may be added to apps.

## Actions

### `info`

`heroku.addonServices({(%23%2Fdefinitions%2Faddon-service%2Fdefinitions%2Fidentity)}).plans({(%23%2Fdefinitions%2Fplan%2Fdefinitions%2Fidentity)}).info({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | /addon-services/{(%23%2Fdefinitions%2Faddon-service%2Fdefinitions%2Fidentity)}/plans/{(%23%2Fdefinitions%2Fplan%2Fdefinitions%2Fidentity)} | ### `list`

`heroku.addonServices({(%23%2Fdefinitions%2Faddon-service%2Fdefinitions%2Fidentity)}).plans().list({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | /addon-services/{(%23%2Fdefinitions%2Faddon-service%2Fdefinitions%2Fidentity)}/plans | 