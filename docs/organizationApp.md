# organization-app

An organization app encapsulates the organization specific functionality of Heroku apps.

## Actions

### `create`

`heroku.organizations().apps().create({attributes}, {callback});`

Method | Path
--- | ---
POST | /organizations/apps

### `list`

`heroku.organizations().apps().list({callback});`

Method | Path
--- | ---
GET | /organizations/apps

### `listForOrganization`

`heroku.organizations({organization_name}).apps().listForOrganization({callback});`

Method | Path
--- | ---
GET | /organizations/{organization_name}/apps

### `info`

`heroku.organizations().apps({app_id_or_name}).info({callback});`

Method | Path
--- | ---
GET | /organizations/apps/{app_id_or_name}

### `updateLocked`

`heroku.organizations().apps({app_id_or_name}).updateLocked({attributes}, {callback});`

Method | Path
--- | ---
PATCH | /organizations/apps/{app_id_or_name}

### `transferToAccount`

`heroku.organizations().apps({app_id_or_name}).transferToAccount({attributes}, {callback});`

Method | Path
--- | ---
PATCH | /organizations/apps/{app_id_or_name}

### `transferToOrganization`

`heroku.organizations().apps({app_id_or_name}).transferToOrganization({attributes}, {callback});`

Method | Path
--- | ---
PATCH | /organizations/apps/{app_id_or_name}

