# organization

Organizations allow you to manage access to a shared group of applications across your development team.

## Actions

### `list`

`heroku.organizations().list({callback});`

Method | Path
--- | ---
GET | /organizations

### `info`

`heroku.organizations({organization_name}).info({callback});`

Method | Path
--- | ---
GET | /organizations/{organization_name}

### `update`

`heroku.organizations({organization_name}).update({attributes}, {callback});`

Method | Path
--- | ---
PATCH | /organizations/{organization_name}

