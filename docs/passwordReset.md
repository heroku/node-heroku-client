# password-reset

A password reset represents a in-process password reset attempt.

## Actions

### `resetPassword`

`heroku.passwordResets().resetPassword({attributes}, {callback});`

Method | Path
--- | ---
POST | /password-resets

### `completeResetPassword`

`heroku.passwordResets({account_email}).actions().finalize().completeResetPassword({attributes}, {callback});`

Method | Path
--- | ---
POST | /password-resets/{account_email}/actions/finalize

