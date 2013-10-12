# region

A region represents a geographic location in which your application may run.

## Actions

### `info`

Info for existing region.

`heroku.regions({region_id_or_name}).info({callback});`

Method | Path
--- | ---
GET | /regions/{region_id_or_name}

### `list`

List existing regions.

`heroku.regions().list({callback});`

Method | Path
--- | ---
GET | /regions

