# sms-number

SMS numbers are used for recovery on accounts with two-factor authentication enabled.

## Actions

### `smsNumber`

`heroku.users({account_email_or_id}).smsNumber().smsNumber({callback});`

Method | Path
--- | ---
GET | /users/{account_email_or_id}/sms-number

### `recover`

`heroku.users({account_email_or_id}).smsNumber().actions().recover().recover({attributes}, {callback});`

Method | Path
--- | ---
POST | /users/{account_email_or_id}/sms-number/actions/recover

### `confirm`

`heroku.users({account_email_or_id}).smsNumber().actions().confirm().confirm({attributes}, {callback});`

Method | Path
--- | ---
POST | /users/{account_email_or_id}/sms-number/actions/confirm

