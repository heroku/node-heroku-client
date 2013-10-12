# account-feature

An account feature represents a Heroku labs capability that can be enabled or disabled for an account on Heroku.

## Actions

### `info`

`heroku.account().features({account-feature_id_or_name}).info({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | account/features/{account-feature_id_or_name} | ### `list`

`heroku.account().features().list({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | account/features | ### `update`

`heroku.account().features({account-feature_id_or_name}).update({attributes}, {callback});`

Method | Path | Expected Status(es)
--- | --- | ---
PATCH | account/features/{account-feature_id_or_name} | 