# sms-number

SMS numbers are used for recovery on accounts with two-factor authentication enabled.

## Actions

### `smsNumber`

`heroku.users({account_email_or_id_or_self}).smsNumber().smsNumber({callback});`

Method | Path
--- | ---
GET | /users/{account_email_or_id_or_self}/sms-number

### `recover`

`heroku.users({account_email_or_id_or_self}).smsNumber().actions().recover().recover({attributes}, {callback});`

Method | Path
--- | ---
POST | /users/{account_email_or_id_or_self}/sms-number/actions/recover

### `confirm`

`heroku.users({account_email_or_id_or_self}).smsNumber().actions().confirm().confirm({attributes}, {callback});`

Method | Path
--- | ---
POST | /users/{account_email_or_id_or_self}/sms-number/actions/confirm

