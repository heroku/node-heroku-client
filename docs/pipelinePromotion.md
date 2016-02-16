# pipeline-promotion

Promotions allow you to move code from an app in a pipeline to all targets

## Actions

### `create`

`heroku.pipelinePromotions().create({attributes}, {callback});`

Method | Path
--- | ---
POST | /pipeline-promotions

### `info`

`heroku.pipelinePromotions({pipeline-promotion_id}).info({callback});`

Method | Path
--- | ---
GET | /pipeline-promotions/{pipeline-promotion_id}

