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

*When app was archived.*

Example | Serialized? | Type
--- | --- | ---
2012-01-01T12:00:00Z | true | datetime

### `buildpack_provided_description`

*Description from buildpack of app.*

Example | Serialized? | Type
--- | --- | ---
Ruby/Rack | true | string

### `created_at`

*When app was created.*

Example | Serialized? | Type
--- | --- | ---
2012-01-01T12:00:00Z | true | datetime

### `git_url`

*Git repo url of app.*

Example | Serialized? | Type
--- | --- | ---
git@heroku.com/example.git | true | string

### `id`

*Unique identifier of app.*

Example | Serialized? | Type
--- | --- | ---
01234567-89ab-cdef-0123-456789abcdef | true | uuid

### `maintenance`

*Maintenance status of app.*

Example | Serialized? | Type
--- | --- | ---
false | true | boolean

### `name`

*Unique name of app.*

Example | Serialized? | Type
--- | --- | ---
example | true | string

### `owner:email`

*Email address of app owner.*

Example | Serialized? | Type
--- | --- | ---
username@example.com | true | string

### `owner:id`

*Unique identifier of app owner.*

Example | Serialized? | Type
--- | --- | ---
01234567-89ab-cdef-0123-456789abcdef | true | uuid

### `region:id`

*Unique identifier of app region.*

Example | Serialized? | Type
--- | --- | ---
01234567-89ab-cdef-0123-456789abcdef | true | uuid

### `region:name`

*Name of app region.*

Example | Serialized? | Type
--- | --- | ---
us | true | string

### `released_at`

*When app was last released.*

Example | Serialized? | Type
--- | --- | ---
2012-01-01T12:00:00Z | true | datetime

### `repo_size`

*App git repo size in bytes.*

Example | Serialized? | Type
--- | --- | ---
1024 | true | number

### `slug_size`

*App slug size in bytes.*

Example | Serialized? | Type
--- | --- | ---
512 | true | number

### `stack`

*Stack of app.*

Example | Serialized? | Type
--- | --- | ---
cedar | true | string

### `updated_at`

*When app was updated.*

Example | Serialized? | Type
--- | --- | ---
2012-01-01T12:00:00Z | true | datetime

### `web_url`

*Web url of app.*

Example | Serialized? | Type
--- | --- | ---
http://example.herokuapp.com | true | string

