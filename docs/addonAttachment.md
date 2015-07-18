# addon-attachment

An add-on attachment represents a connection between an app and an add-on that it has been given access to.

## Actions

### `create`

`heroku.addonAttachments().create({attributes}, {callback});`

Method | Path
--- | ---
POST | /addon-attachments

### `delete`

`heroku.addonAttachments({addon-attachment_id}).delete({callback});`

Method | Path
--- | ---
DELETE | /addon-attachments/{addon-attachment_id}

### `info`

`heroku.addonAttachments({addon-attachment_id}).info({callback});`

Method | Path
--- | ---
GET | /addon-attachments/{addon-attachment_id}

### `list`

`heroku.addonAttachments().list({callback});`

Method | Path
--- | ---
GET | /addon-attachments

### `listByAddOn`

`heroku.addons({addon_id_or_name}).addonAttachments().listByAddOn({callback});`

Method | Path
--- | ---
GET | /addons/{addon_id_or_name}/addon-attachments

### `listByApp`

`heroku.apps({app_id_or_name}).addonAttachments().listByApp({callback});`

Method | Path
--- | ---
GET | /apps/{app_id_or_name}/addon-attachments

### `infoByApp`

`heroku.apps({app_id_or_name}).addonAttachments({addon-attachment_id}).infoByApp({callback});`

Method | Path
--- | ---
GET | /apps/{app_id_or_name}/addon-attachments/{addon-attachment_id}

