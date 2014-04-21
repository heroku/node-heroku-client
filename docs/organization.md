# organization

Organizations allow you to manage access to a shared group of applications across your development team.

## Actions

### `list`

`heroku.organizations().list({callback});`

Method | Path
--- | ---
GET | /organizations

### `updateDefault`

`heroku.organizations({organization_name}).updateDefault({attributes}, {callback});`

Method | Path
--- | ---
PATCH | /organizations/{organization_name}

