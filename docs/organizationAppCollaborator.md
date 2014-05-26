# organization-app-collaborator

An organization collaborator represents an account that has been given access to an organization app on Heroku.

## Actions

### `create`

`heroku.organizations().apps({app_id_or_name}).collaborators().create({attributes}, {callback});`

Method | Path
--- | ---
POST | /organizations/apps/{app_id_or_name}/collaborators

### `delete`

`heroku.organizations().apps({app_id_or_name}).collaborators({collaborator_email_or_id}).delete({callback});`

Method | Path
--- | ---
DELETE | /organizations/apps/{app_id_or_name}/collaborators/{collaborator_email_or_id}

### `info`

`heroku.organizations().apps({app_id_or_name}).collaborators({collaborator_email_or_id}).info({callback});`

Method | Path
--- | ---
GET | /organizations/apps/{app_id_or_name}/collaborators/{collaborator_email_or_id}

### `list`

`heroku.organizations().apps({app_id_or_name}).collaborators().list({callback});`

Method | Path
--- | ---
GET | /organizations/apps/{app_id_or_name}/collaborators

