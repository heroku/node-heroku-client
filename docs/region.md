# region

A region represents a geographic location in which your application may run.

## Actions

### `info`

`heroku.regions({region_id_or_name}).info({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | regions/{region_id_or_name} | ### `list`

`heroku.regions().list({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | regions | 