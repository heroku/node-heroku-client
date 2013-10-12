# collaborator

A collaborator represents an account that has been given access to an app on Heroku.

## Actions

### `create`

`heroku.apps({app_id_or_name}).collaborators().create({attributes}, {callback});`

Method | Path | Expected Status(es)
--- | --- | ---
POST | apps/{app_id_or_name}/collaborators | ### `delete`

`heroku.apps({app_id_or_name}).collaborators({collaborator_email_or_id}).delete({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
DELETE | apps/{app_id_or_name}/collaborators/{collaborator_email_or_id} | ### `info`

`heroku.apps({app_id_or_name}).collaborators({collaborator_email_or_id}).info({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | apps/{app_id_or_name}/collaborators/{collaborator_email_or_id} | ### `list`

`heroku.apps({app_id_or_name}).collaborators().list({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | apps/{app_id_or_name}/collaborators | 