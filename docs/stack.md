# stack

Stacks are the different application execution environment available in the Heroku platform.

## Actions

### `info`

`heroku.stacks({stack_id_or_name}).info({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | stacks/{stack_id_or_name} | ### `list`

`heroku.stacks().list({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | stacks | 