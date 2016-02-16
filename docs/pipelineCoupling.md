# pipeline-coupling

Information about an app's coupling to a pipeline

## Actions

### `list`

`heroku.pipelines({pipeline_id_or_name}).pipelineCouplings().list({callback});`

Method | Path
--- | ---
GET | /pipelines/{pipeline_id_or_name}/pipeline-couplings

### `list`

`heroku.pipelineCouplings().list({callback});`

Method | Path
--- | ---
GET | /pipeline-couplings

### `create`

`heroku.pipelineCouplings().create({attributes}, {callback});`

Method | Path
--- | ---
POST | /pipeline-couplings

### `info`

`heroku.pipelineCouplings({pipeline-coupling_id}).info({callback});`

Method | Path
--- | ---
GET | /pipeline-couplings/{pipeline-coupling_id}

### `delete`

`heroku.pipelineCouplings({pipeline-coupling_id}).delete({callback});`

Method | Path
--- | ---
DELETE | /pipeline-couplings/{pipeline-coupling_id}

### `update`

`heroku.pipelineCouplings({pipeline-coupling_id}).update({attributes}, {callback});`

Method | Path
--- | ---
PATCH | /pipeline-couplings/{pipeline-coupling_id}

### `info`

`heroku.apps({app_id_or_name}).pipelineCouplings().info({callback});`

Method | Path
--- | ---
GET | /apps/{app_id_or_name}/pipeline-couplings

