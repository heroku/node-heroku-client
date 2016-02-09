# invitation

An invitation represents an invite sent to a user to use the Heroku platform.

## Actions

### `info`

`heroku.invitations({invitation_token}).info({callback});`

Method | Path
--- | ---
GET | /invitations/{invitation_token}

### `finalizeInvitation`

`heroku.invitations({invitation_token}).finalizeInvitation({attributes}, {callback});`

Method | Path
--- | ---
PATCH | /invitations/{invitation_token}

### `invitation`

`heroku.invitations().invitation({attributes}, {callback});`

Method | Path
--- | ---
POST | /invitations

