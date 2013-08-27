# Rate Limits

Rate Limits represent the number of request tokens each account holds. Requests to this endpoint do not count towards the rate limit.

## Actions

### `list`

`heroku.account().rateLimits().list({callback});`

Method | Path | Expected Status(es)
--- | --- | ---
GET | /account/rate-limits | 200

## Attributes

### `remaining`

*allowed requests remaining in current interval*

Example | Serialized? | Type
--- | --- | ---
`2399` | true | number

