# whitelisted-addon-service

Entities that have been whitelisted to be used by an Organization

## Actions

### `list`

`heroku.organizations({organization_name}).whitelistedAddonServices().list({callback});`

Method | Path
--- | ---
GET | /organizations/{organization_name}/whitelisted-addon-services

### `create`

`heroku.organizations({organization_name}).whitelistedAddonServices().create({attributes}, {callback});`

Method | Path
--- | ---
POST | /organizations/{organization_name}/whitelisted-addon-services

### `delete`

`heroku.organizations({organization_name}).whitelistedAddonServices({addon-service_id_or_name}).delete({callback});`

Method | Path
--- | ---
DELETE | /organizations/{organization_name}/whitelisted-addon-services/{addon-service_id_or_name}

