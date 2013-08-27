# App

An app represents the program that you would like to deploy and run on Heroku.

## Actions

### `create`

`heroku.apps().create({attributes}, {callback});`

Method | Path | Expected Status(es)
--- | --- | ---
POST | /apps | 201

#### Optional Attributes

- name
- region:id
- region:name
- stack


### `list`

`heroku.apps().list({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | /apps | 200, 206

### `info`

`heroku.apps({app_id_or_name}).info({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | /apps/{app_id_or_name} | 200

### `update`

`heroku.apps({app_id_or_name}).update({attributes}, {callback});`

Method | Path | Expected Status(es)
--- | --- | ---
PATCH | /apps/{app_id_or_name} | 200

#### Optional Attributes

- maintenance
- name


### `delete`

`heroku.apps({app_id_or_name}).delete({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
DELETE | /apps/{app_id_or_name} | 200

## Attributes

### `archived_at`

*when app was archived*

Example | Serialized? | Type
--- | --- | ---
`2012-01-01T12:00:00Z` | true | datetime

### `buildpack_provided_description`

*description from buildpack of app*

Example | Serialized? | Type
--- | --- | ---
`Ruby/Rack` | true | string

### `created_at`

*when app was created*

Example | Serialized? | Type
--- | --- | ---
`2012-01-01T12:00:00Z` | true | datetime

### `git_url`

*git repo URL of app*

Example | Serialized? | Type
--- | --- | ---
`git@heroku.com/example.git` | true | string

### `id`

*unique identifier of app*

Example | Serialized? | Type
--- | --- | ---
`01234567-89ab-cdef-0123-456789abcdef` | true | uuid

### `maintenance`

*maintenance status of app*

Example | Serialized? | Type
--- | --- | ---
`false` | true | boolean

### `name`

*unique name of app*

Example | Serialized? | Type
--- | --- | ---
`example` | true | string

### `owner:email`

*email address of app owner*

Example | Serialized? | Type
--- | --- | ---
`username@example.com` | true | string

### `owner:id`

*unique identifier of app owner*

Example | Serialized? | Type
--- | --- | ---
`01234567-89ab-cdef-0123-456789abcdef` | true | uuid

### `region:id`

*unique identifier of app region*

Example | Serialized? | Type
--- | --- | ---
`01234567-89ab-cdef-0123-456789abcdef` | true | uuid

### `region:name`

*name of app region*

Example | Serialized? | Type
--- | --- | ---
`us` | true | string

### `released_at`

*when app was last released*

Example | Serialized? | Type
--- | --- | ---
`2012-01-01T12:00:00Z` | true | datetime

### `repo_size`

*app git repo size in bytes*

Example | Serialized? | Type
--- | --- | ---
`1024` | true | number

### `slug_size`

*app slug size in bytes*

Example | Serialized? | Type
--- | --- | ---
`512` | true | number

### `stack`

*stack of app*

Example | Serialized? | Type
--- | --- | ---
`cedar` | true | string

### `updated_at`

*when app was updated*

Example | Serialized? | Type
--- | --- | ---
`2012-01-01T12:00:00Z` | true | datetime

### `web_url`

*web URL of app*

Example | Serialized? | Type
--- | --- | ---
`http://example.herokuapp.com` | true | string

