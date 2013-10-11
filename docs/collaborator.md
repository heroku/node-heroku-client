# collaborator

A collaborator represents an account that has been given access to an app on Heroku.

## Actions

### `create`

`heroku.apps({(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fidentity)}).collaborators().create({attributes}, {callback});`

Method | Path | Expected Status(es)
--- | --- | ---
POST | /apps/{(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fidentity)}/collaborators | ### `delete`

`heroku.apps({(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fidentity)}).collaborators({(%23%2Fdefinitions%2Fcollaborator%2Fdefinitions%2Fidentity)}).delete({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
DELETE | /apps/{(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fidentity)}/collaborators/{(%23%2Fdefinitions%2Fcollaborator%2Fdefinitions%2Fidentity)} | ### `info`

`heroku.apps({(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fidentity)}).collaborators({(%23%2Fdefinitions%2Fcollaborator%2Fdefinitions%2Fidentity)}).info({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | /apps/{(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fidentity)}/collaborators/{(%23%2Fdefinitions%2Fcollaborator%2Fdefinitions%2Fidentity)} | ### `list`

`heroku.apps({(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fidentity)}).collaborators().list({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | /apps/{(%23%2Fdefinitions%2Fapp%2Fdefinitions%2Fidentity)}/collaborators | 