# pipeline

A pipeline allows grouping of apps into different stages.

## Actions

### `create`

`heroku.pipelines().create({attributes}, {callback});`

Method | Path
--- | ---
POST | /pipelines

### `info`

`heroku.pipelines({pipeline_id_or_name}).info({callback});`

Method | Path
--- | ---
GET | /pipelines/{pipeline_id_or_name}

### `delete`

`heroku.pipelines({pipeline_id_or_name}).delete({callback});`

Method | Path
--- | ---
DELETE | /pipelines/{pipeline_id_or_name}

### `update`

`heroku.pipelines({pipeline_id_or_name}).update({attributes}, {callback});`

Method | Path
--- | ---
PATCH | /pipelines/{pipeline_id_or_name}

### `list`

`heroku.pipelines().list({callback});`

Method | Path
--- | ---
GET | /pipelines

