# inbound-ruleset

An inbound-ruleset is a collection of rules that specify what hosts can or cannot connect to an application.

## Actions

### `info`

`heroku.spaces({space_id_or_name}).inboundRuleset().info({callback});`

Method | Path
--- | ---
GET | /spaces/{space_id_or_name}/inbound-ruleset

### `info`

`heroku.spaces({space_id_or_name}).inboundRulesets({inbound-ruleset_id}).info({callback});`

Method | Path
--- | ---
GET | /spaces/{space_id_or_name}/inbound-rulesets/{inbound-ruleset_id}

### `list`

`heroku.spaces({space_id_or_name}).inboundRulesets().list({callback});`

Method | Path
--- | ---
GET | /spaces/{space_id_or_name}/inbound-rulesets

### `create`

`heroku.spaces({space_id_or_name}).inboundRuleset().create({attributes}, {callback});`

Method | Path
--- | ---
PUT | /spaces/{space_id_or_name}/inbound-ruleset

