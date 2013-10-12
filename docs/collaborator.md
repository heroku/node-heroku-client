# collaborator

A collaborator represents an account that has been given access to an app on Heroku.

## Actions

### `create`

Create a new collaborator.

`heroku.apps({app_id_or_name}).collaborators().create({attributes}, {callback});`

Method | Path
--- | ---
POST | /apps/{app_id_or_name}/collaborators

### `delete`

Delete an existing collaborator.

`heroku.apps({app_id_or_name}).collaborators({collaborator_email_or_id}).delete({callback});`

Method | Path
--- | ---
DELETE | /apps/{app_id_or_name}/collaborators/{collaborator_email_or_id}

### `info`

Info for existing collaborator.

`heroku.apps({app_id_or_name}).collaborators({collaborator_email_or_id}).info({callback});`

Method | Path
--- | ---
GET | /apps/{app_id_or_name}/collaborators/{collaborator_email_or_id}

### `list`

List existing collaborators.

`heroku.apps({app_id_or_name}).collaborators().list({callback});`

Method | Path
--- | ---
GET | /apps/{app_id_or_name}/collaborators

