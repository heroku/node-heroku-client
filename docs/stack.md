# stack

Stacks are the different application execution environment available in the Heroku platform.

## Actions

### `info`

Stack info.

`heroku.stacks({stack_id_or_name}).info({callback});`

Method | Path
--- | ---
GET | /stacks/{stack_id_or_name}

### `list`

List available stacks.

`heroku.stacks().list({callback});`

Method | Path
--- | ---
GET | /stacks

