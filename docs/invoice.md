# invoice

An invoice is an itemized bill of goods for an account which includes pricing and charges.

## Actions

### `info`

`heroku.account().invoices({invoice_number}).info({callback});`

Method | Path
--- | ---
GET | /account/invoices/{invoice_number}

### `list`

`heroku.account().invoices().list({callback});`

Method | Path
--- | ---
GET | /account/invoices

