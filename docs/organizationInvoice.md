# organization-invoice

An organization invoice is an itemized bill of goods for an organization which includes pricing and charges.

## Actions

### `info`

`heroku.organizations({organization_name}).invoices({organization-invoice_number}).info({callback});`

Method | Path
--- | ---
GET | /organizations/{organization_name}/invoices/{organization-invoice_number}

### `list`

`heroku.organizations({organization_name}).invoices().list({callback});`

Method | Path
--- | ---
GET | /organizations/{organization_name}/invoices

