module.exports = {
  "description": "The platform API empowers developers to automate, extend and combine Heroku with other services. You can use the platform API to programmatically create apps, provision add-ons and perform other tasks that could previously only be accomplished with Heroku toolbelt or dashboard. For details on getting started, see the [quickstart](https://devcenter.heroku.com/articles/platform-api-quickstart).",
  "overview": {
    "Authentication": [
      "HTTP basic authentication must be constructed from email address and [api token](https://devcenter.heroku.com/articles/authentication) as `{email-address}:{api-token}`, base64 encoded and passed as the Authorization header for each request, for example `Authorization: Basic 0123456789ABCDEF=`.",
      "API token authentication works well for personal scripts, but is not recommended for third party services. We plan to deliver OAuth later in the beta to provide better granularity and control when providing access to third party services."
    ],
    "Caching":          "All responses include an `ETag` (or Entity Tag) header, identifying the specific version of a returned resource. You may use this value to check for changes to a resource by repeating the request and passing the `ETag` value in the `If-None-Match` header. If the resource has not changed, a `304 Not Modified` status will be returned with an empty body. If the resource has changed, the request will proceed normally.",
    "Clients":          "Clients must address requests to `api.heroku.com` using HTTPS and specify the `Accept: application/vnd.heroku+json; version=3` Accept header. Clients should specify a `User-Agent` header to facilitate tracking and debugging.",
    "cURL Examples": [
      "cURL examples are provided to facilitate experimentation. Variable values are represented as `$SOMETHING` so that you can manipulate them using environment variables. Examples use the `-n` option to fetch credentials from a `~/.netrc` file, which should include an entry for `api.heroku.com` similar to the following:",
      "```\nmachine api.heroku.com\n  login {your-email}\n  password {your-api-token}\n```"
    ],
    "Custom Types": [
      { "Name": "datetime", "JSON Type": "string", "Description": "timestamp in iso8601 format" },
      { "Name": "uuid",     "JSON Type": "string", "Description": "uuid in 8-4-4-4-12 format" }
    ],
    "Data Integrity": [
      "Both unique id and more human-friendly attributes can be used reference resources. For example you can use `name` or `id` to refer to an app. Though the human-friendly version may be more convenient, `id` should be preferred to avoid ambiguity.",
      "You may pass the `If-Match` header with an `ETag` value from a previous response to ensure a resource has not changed since you last received it. If the resource has changed, you will receive a `412 Precondition Failed` response. If the resource has not changed, the request will proceed normally."
    ],
    "Errors":           "Failing responses will have an appropriate [status](#statuses) and a JSON body.",
    "Error Attributes": [
      { "Name": "id",       "Type": "string", "Description": "id of error raised",                 "Example": "<code>\"rate_limit\"</code>" },
      { "Name": "message",  "Type": "string", "Description": "end user message of error raised ",  "Example": "<code>\"Your account reached the API limit. Please wait a few minutes before making new requests\"</code>" }
    ],
    "Error Response": "```\nHTTP/1.1 429 Too Many Requests\n```\n```javascript\n{\n  \"id\":       \"rate_limit\",\n  \"message\":  \"Your account reached the API rate limit\\nPlease wait a few minutes before making new requests\"\n}\n```",
    "Methods": [
      { "Method": "DELETE", "Usage": "used for destroying existing objects" },
      { "Method": "GET",    "Usage": "used for retrieving lists and individual objects" },
      { "Method": "HEAD",   "Usage": "used for retrieving metadata about existing objects" },
      { "Method": "PATCH",  "Usage": "used for updating existing objects" },
      { "Method": "PUT",    "Usage": "used for replacing existing objects" },
      { "Method": "POST",   "Usage": "used for creating new objects" }
    ],
    "Method Override":  "When using a client that does not support all of the [methods](#methods), you can override by using a `POST` and setting the `X-Http-Method-Override` header to the desired methed. For instance, to do a `PATCH` request, do a `POST` with header `X-Http-Method-Override: PATCH`.",
    "Parameters":       "Values that can be provided for an action are divided between optional and required values. The expected type for each value is specified and unlisted values should be considered immutable. Parameters should be JSON encoded and passed in the request body.",
    "Ranges":           [
      "List requests will return a `Content-Range` header indicating the range of values returned. Large lists may require additional requests to retrieve. If a list response has been truncated you will receive a `206 Partial Content` status and one or both of `Next-Range` and `Prev-Range` headers if there are next and previous ranges respectively. To retrieve the next or previous range, repeat the request with the `Range` header set to either the `Next-Range` or `Prev-Range` value from the previous request.",
      "The number of values returned in a range can be controlled using a `max` key in the `Range` header. For example, to get only the first 10 values, set this header: `Range: ids ..; max=10;`. `max` can also be passed when iterating over `Next-Range` and `Prev-Range`. The default page size is 200 and maximum page size is 1000."
    ],
    "Rate Limits":      "The API limits the number of requests each user can make per hour to protect against abuse and buggy code. Each account has a pool of request tokens that can hold at most 1200 tokens. Each API call removes one token from the pool. Tokens are added to the account pool at a rate of 1200 per hour, up to a maximum of 1200. If no tokens remain, further calls will return 429 `Too Many Requests` until more tokens become available. You can use the `RateLimit-Remaining` response header to check your current token count. If you find your account is being rate limited but don't know the cause, consider cycling your API key on the account page on Heroku dashboard.",
    "Request Id":       "Each API request is given a unique request id to facilitate tracking. When reporting issues, providing this value makes it easier to pinpoint problems and provide solutions more quickly.",
    "Responses":        "Values returned by the API are split into a section with example status code and relevant headers (with common http headers omitted) and a section with an example JSON body (if any).",
    "Response Headers": [
      { "Header": "RateLimit-Remaining", "Description": "allowed requests remaining in current interval" }
    ],
    "Statuses": [
      { "Code": 200, "Culprit": "Both",   "Id": "OK",                               "Message": "request succeeded" },
      { "Code": 201, "Culprit": "Both",   "Id": "Created",                          "Message": "resource created, for example a new app was created or an add-on was provisioned" },
      { "Code": 202, "Culprit": "Both",   "Id": "Accepted",                         "Message": "request accepted, but the processing has not been completed" },
      { "Code": 206, "Culprit": "Both",   "Id": "Partial Content",                  "Message": "request succeeded, but this is only a partial response, see <a href='#ranges'>ranges</a>" },
      { "Code": 400, "Culprit": "Client", "Id": "Bad Request",                      "Message": "request invalid, validate usage and try again" },
      { "Code": 401, "Culprit": "Client", "Id": "Unauthorized",                     "Message": "request not authenticated, validate credentials and try again" },
      { "Code": 402, "Culprit": "Client", "Id": "Payment Required",                 "Message": "request could not be billed, validate billing information and try again" },
      { "Code": 403, "Culprit": "Client", "Id": "Forbidden",                        "Message": "request not authorized, provided credentials do not provide access to specified resource" },
      { "Code": 404, "Culprit": "Client", "Id": "Not Found",                        "Message": "request failed, the specified resource does not exist" },
      { "Code": 406, "Culprit": "Client", "Id": "Not Acceptable",                   "Message": "request failed, set <code>Accept: application/vnd.heroku+json; version=3</code> header and try again" },
      { "Code": 416, "Culprit": "Client", "Id": "Requested Range Not Satisfiable",  "Message": "request failed, validate <code>Content-Range</code> header and try again" },
      { "Code": 422, "Culprit": "Client", "Id": "Unprocessable Entity",             "Message": "request failed, validate parameters try again" },
      { "Code": 429, "Culprit": "Client", "Id": "Too Many Requests",                "Message": "request failed, wait for rate limits to reset and try again, see <a href='#rate-limits'>rate limits</a>" },
      { "Code": 500, "Culprit": "Heroku", "Id": "Internal Server Error",            "Message": "error occurred, we are notified, but contact <a href='https://help.heroku.com'>support</a> if the issue persists" },
      { "Code": 503, "Culprit": "Heroku", "Id": "Service Unavailable",              "Message": "API is unavailable, check response body or <a href='https://status.heroku.com'>Heroku status</a> for details" }
    ],
    "Versioning":       "The beta and release of the api will all occur within version 3. We will provide warning and migration strategies for any backwards incompatible changes we might make during the beta and will commit to no backwards incompatible changes to version 3 after the release.",
    "Warnings":         "Responses with warnings will have add headers describing the warning.",
    "Warning Headers": [
      { "Header": "id",       "Description": "id of warning",                 "Example": "<code>\"stack_deprecated\"</code>" },
      { "Header": "message",  "Description": "end user message for warning",  "Example": "<code>\"This stack is deprecated.\"</code>" }
    ]
  },

  "resources": {

    "Account": {
      "actions": {
        "Info": {
          "method":     "GET",
          "path":       "/account",
          "statuses":   [200]
        },
        "Update": {
          "attributes": {
            "optional": [
              "allow_tracking",
              "email"
            ]
          },
          "method":     "PATCH",
          "path":       "/account",
          "statuses":   [200]
        }
      },
      "attributes": {
        "allow_tracking": {
          "description":  "whether to allow web activity tracking with third-party services like Google Analytics",
          "example":      true,
          "serialized":   true,
          "type":         "boolean"
        },
        "beta": {
          "description":  "whether to utilize beta Heroku features",
          "example":      false,
          "serialized":   true,
          "type":         "boolean"
        },
        "created_at": {
          "description":  "when account was created",
          "example":      "2012-01-01T12:00:00-00:00",
          "serialized":   true,
          "type":         "datetime"
        },
        "email": {
          "description":  "email address of account",
          "example":      "username@example.com",
          "serialized":   true,
          "type":         "string"
        },
        "id": {
          "description":  "unique identifier of account",
          "example":      "01234567-89ab-cdef-0123-456789abcdef",
          "serialized":   true,
          "type":         "uuid"
        },
        "last_login": {
          "description":  "when account last authorized with Heroku",
          "example":      "2012-01-01T12:00:00-00:00",
          "serialized":   true,
          "type":         "datetime"
        },
        "updated_at": {
          "description":  "when account was updated",
          "example":      "2012-01-01T12:00:00-00:00",
          "serialized":   true,
          "type":         "datetime"
        },
        "verified": {
          "description":  "whether the account has been verified with billing information",
          "example":      false,
          "serialized":   true,
          "type":         "boolean"
        }
      },
      "description": "An account represents you on Heroku."
    },

    "Account Password": {
      "actions": {
        "Update": {
          "attributes": {
            "required": [
              "current_password",
              "password"
            ]
          },
          "method":     "PUT",
          "path":       "/account/password",
          "statuses":   [200]
        }
      },
      "attributes": {
        "current_password": {
          "description":  "existing password value",
          "example":      "0123456789abcdef",
          "serialized":   false,
          "type":         "string"
        },
        "password": {
          "description":  "new password value",
          "example":      "abcdef0123456789",
          "serialized":   false,
          "type":         "string"
        }
      }
    },

    "Add-on": {
      "actions": {
        "Create": {
          "attributes": {
            "optional": [
              "plan:name"
            ]
          },
          "method":     "POST",
          "path":       "/apps/{app_id_or_name}/addons",
          "statuses":   [201]
        },
        "List": {
          "method":     "GET",
          "path":       "/apps/{app_id_or_name}/addons",
          "statuses":   [200, 206]
        },
        "Info": {
          "method":     "GET",
          "path":       "/apps/{app_id_or_name}/addons/{addon_id_or_name}",
          "statuses":   [200]
        },
        "Update": {
          "attributes": {
            "optional": [
              "plan:name"
            ]
          },
          "method":     "PATCH",
          "path":       "/apps/{app_id_or_name}/addons/{addon_id_or_name}",
          "statuses":   [200]
        },
        "Delete": {
          "method":     "DELETE",
          "path":       "/apps/{app_id_or_name}/addons/{addon_id_or_name}",
          "statuses":   [200]
        }
      },
      "attributes": {
        "created_at": {
          "description":  "when add-on was created",
          "example":      "2012-01-01T12:00:00-00:00",
          "serialized":   true,
          "type":         "datetime"
        },
        "id": {
          "description":  "unique identifier of this add-on",
          "example":      "01234567-89ab-cdef-0123-456789abcdef",
          "serialized":   true,
          "type":         "uuid"
        },
        "plan:name":         {
          "description":  "unique name for plan",
          "example":      "heroku-postgresql:dev",
          "serialized":   true,
          "type":         "string"
        },
        "updated_at": {
          "description":  "when add-on was updated",
          "example":      "2012-01-01T12:00:00-00:00",
          "serialized":   true,
          "type":         "datetime"
        }
      },
      "description": "Add-ons represent add-ons that have been provisioned for an app."
    },

    "Add-on Service": {
      "actions": {
        "List": {
          "method":     "GET",
          "path":       "/addon-services",
          "statuses":   [200, 206]
        },
        "Info": {
          "method":     "GET",
          "path":       "/addon-services/{addon_service_id_or_name}",
          "statuses":   [200]
        }
      },
      "attributes": {
        "created_at": {
          "description":  "when add-on service was created",
          "example":      "2012-01-01T12:00:00-00:00",
          "serialized":   true,
          "type":         "datetime"
        },
        "name":         {
          "description":  "unique name for add-on service",
          "example":      "heroku-postgresql",
          "serialized":   true,
          "type":         "string"
        },
        "updated_at": {
          "description":  "when add-on service was updated",
          "example":      "2012-01-01T12:00:00-00:00",
          "serialized":   true,
          "type":         "datetime"
        }
      },
      "description": "Add-on services represent add-ons that may be provisioned for apps."
    },


    "App": {
      "actions": {
        "Create": {
          "attributes": {
            "optional": [
              "name",
              "region:id",
              "region:name",
              "stack"
            ]
          },
          "method":     "POST",
          "path":       "/apps",
          "statuses":   [201]
        },
        "List": {
          "method":     "GET",
          "path":       "/apps",
          "statuses":   [200, 206]
        },
        "Info": {
          "method":     "GET",
          "path":       "/apps/{app_id_or_name}",
          "statuses":   [200]
        },
        "Update": {
          "attributes": {
            "optional": [
              "maintenance",
              "name",
              "owner:email",
              "owner:id"
            ]
          },
          "method":     "PATCH",
          "path":       "/apps/{app_id_or_name}",
          "statuses":   [200]
        },
        "Delete": {
          "method":     "DELETE",
          "path":       "/apps/{app_id_or_name}",
          "statuses":   [200]
        }
      },
      "attributes": {
        "buildpack_provided_description": {
          "description":  "description from buildpack of app",
          "example":      "Ruby/Rack",
          "serialized":   true,
          "type":         "string"
        },
        "created_at": {
          "description":  "when app was created",
          "example":      "2012-01-01T12:00:00-00:00",
          "serialized":   true,
          "type":         "datetime"
        },
        "git_url": {
          "description":  "git repo URL of app",
          "example":      "git@heroku.com/example.git",
          "serialized":   true,
          "type":         "string"
        },
        "id": {
          "description":  "unique identifier of app",
          "example":      "01234567-89ab-cdef-0123-456789abcdef",
          "serialized":   true,
          "type":         "uuid"
        },
        "maintenance": {
          "description":  "maintenance status of app",
          "example":      false,
          "serialized":   true,
          "type":         "boolean"
        },
        "name": {
          "description":  "unique name of app",
          "example":      "example",
          "serialized":   true,
          "type":         "string"
        },
        "owner:email": {
          "description":  "email address of app owner",
          "example":      "username@example.com",
          "serialized":   true,
          "type":         "string"
        },
        "owner:id": {
          "description":  "unique identifier of app owner",
          "example":      "01234567-89ab-cdef-0123-456789abcdef",
          "serialized":   true,
          "type":         "uuid"
        },
        "region:id": {
          "description":  "unique identifier of app region",
          "example":      "01234567-89ab-cdef-0123-456789abcdef",
          "serialized":   true,
          "type":         "uuid"
        },
        "region:name": {
          "description":  "name of app region",
          "example":      "us",
          "serialized":   true,
          "type":         "string"
        },
        "released_at": {
          "description":  "when app was last released",
          "example":      "2012-01-01T12:00:00-00:00",
          "serialized":   true,
          "type":         "datetime"
        },
        "repo_size": {
          "description":  "app git repo size in bytes",
          "example":      1024,
          "serialized":   true,
          "type":         "number"
        },
        "slug_size": {
          "description":  "app slug size in bytes",
          "example":      512,
          "serialized":   true,
          "type":         "number"
        },
        "stack": {
          "description":  "stack of app",
          "example":      "cedar",
          "serialized":   true,
          "type":         "string"
        },
        "updated_at": {
          "description":  "when app was updated",
          "example":      "2012-01-01T12:00:00-00:00",
          "serialized":   true,
          "type":         "datetime"
        },
        "web_url": {
          "description":  "web URL of app",
          "example":      "http://example.herokuapp.com",
          "serialized":   true,
          "type":         "string"
        }
      },
      "description": "An app represents the program that you would like to deploy and run on Heroku."
    },

    "App Transfer": {
      "actions": {
        "Create": {
          "attributes": {
            "optional": [
              "app:id",
              "app:name",
              "recipient:email",
              "recipient:id"
            ]
          },
          "method":     "POST",
          "path":       "/app-transfers",
          "statuses":   [201]
        },
        "List": {
          "method":     "GET",
          "path":       "/app-transfers",
          "statuses":   [200, 206]
        },
        "Info": {
          "method":     "GET",
          "path":       "/app-transfers/{transfer_id}",
          "statuses":   [200]
        },
        "Update": {
          "attributes": {
            "required": [
              "state"
            ]
          },
          "method":     "PATCH",
          "path":       "/app-transfers/{transfer_id}",
          "statuses":   [200]
        },
        "Delete": {
          "method":     "DELETE",
          "path":       "/app-transfers/{transfer_id}",
          "statuses":   [200]
        }
      },
      "attributes": {
        "created_at": {
          "description":  "when the transfer was created",
          "example":      "2012-01-01T12:00:00-00:00",
          "serialized":   true,
          "type":         "datetime"
        },
        "app:id": {
          "description":  "unique identifier of the app being transferred",
          "example":      "01234567-89ab-cdef-0123-456789abcdef",
          "serialized":   true,
          "type":         "string"
        },
        "app:name": {
          "description":  "name of the app being transferred",
          "example":      "example",
          "serialized":   true,
          "type":         "string"
        },
        "id": {
          "description":  "unique identifier of this transfer",
          "example":      "01234567-89ab-cdef-0123-456789abcdef",
          "serialized":   true,
          "type":         "uuid"
        },
        "owner:id": {
          "description":  "unique identifier of the sending user",
          "example":      "01234567-89ab-cdef-0123-456789abcdef",
          "serialized":   true,
          "type":         "string"
        },
        "owner:email": {
          "description":  "email of the sending user",
          "example":      "username@example.com",
          "serialized":   true,
          "type":         "string"
        },
        "recipient:id": {
          "description":  "unique identifier of the receiving user",
          "example":      "01234567-89ab-cdef-0123-456789abcdef",
          "serialized":   true,
          "type":         "string"
        },
        "recipient:email": {
          "description":  "email of the receiving user",
          "example":      "username@example.com",
          "serialized":   true,
          "type":         "string"
        },
        "state": {
          "description":  "new state of the transfer; accepted/declined/pending",
          "example":      "pending",
          "serialized":   true,
          "type":         "string"
        },
        "updated_at": {
          "description":  "when the transfer was updated",
          "example":      "2012-01-01T12:00:00-00:00",
          "serialized":   true,
          "type":         "datetime"
        }
      },
      "description": "[Transfers](https://devcenter.heroku.com/articles/transferring-apps) allow a user to transfer ownership of their app to another user. Apps being transferred may be free or have paid resources, but if they are paid, the receiving user must have a [verified account](https://devcenter.heroku.com/articles/account-verification)."
    },

    "Collaborator": {
      "actions": {
        "Create": {
          "attributes": {
            "optional": [
              "user:email",
              "user:id"
            ]
          },
          "method":     "POST",
          "path":       "/apps/{app_id_or_name}/collaborators",
          "statuses":   [201]
        },
        "List": {
          "method":     "GET",
          "path":       "/apps/{app_id_or_name}/collaborators",
          "statuses":   [200, 206]
        },
        "Info": {
          "method":     "GET",
          "path":       "/apps/{app_id_or_name}/collaborators/{collaborator_id_or_email}",
          "statuses":   [200]
        },
        "Delete": {
          "method":     "DELETE",
          "path":       "/apps/{app_id_or_name}/collaborators/{collaborator_id_or_email}",
          "statuses":   [200]
        }
      },
      "attributes": {
        "created_at": {
          "description":  "when collaborator was created",
          "example":      "2012-01-01T12:00:00-00:00",
          "serialized":   true,
          "type":         "datetime"
        },
        "id": {
          "description":  "unique identifier of this collaborator",
          "example":      "01234567-89ab-cdef-0123-456789abcdef",
          "serialized":   true,
          "type":         "uuid"
        },
        "updated_at": {
          "description":  "when collaborator was updated",
          "example":      "2012-01-01T12:00:00-00:00",
          "serialized":   true,
          "type":         "datetime"
        },
        "user:email": {
          "description":  "collaborator email address",
          "example":      "collaborator@example.com",
          "serialized":   true,
          "type":         "string"
        },
        "user:id": {
          "description":  "unique identifier of the user",
          "example":      "01234567-89ab-cdef-0123-456789abcdef",
          "serialized":   true,
          "type":         "uuid"
        }
      },
      "description": "Collaborators are other users who have been given access to an app on Heroku."
    },

    "Config Var": {
      "actions": {
        "Info": {
          "method":     "GET",
          "path":       "/apps/{app_id_or_name}/config-vars",
          "serialization": {
            "FOO":  "bar",
            "BAZ":  "qux",
            "QUUX": "corge"
          },
          "statuses":   [200]
        },
        "Update": {
          "attributes": {
            "FOO": null,
            "BAZ": "grault"
          },
          "method":     "PATCH",
          "path":       "/apps/{app_id_or_name}/config-vars",
          "serialization": {
            "BAZ":  "grault",
            "QUUX": "corge"
          },
          "statuses":   [200]
        }
      },
      "attributes": {
        "{key}": {
          "description":  "key/value pair for dyno env",
          "example":      "{value}",
          "serialized":   true,
          "type":         "string"
        }
      },
      "description": "Config Vars allow you to manage the configuration information provided to an app on Heroku."
    },

    "Domain": {
      "actions": {
        "Create": {
          "attributes": {
            "required": [
              "hostname"
            ]
          },
          "method":     "POST",
          "path":       "/apps/{app_id_or_name}/domains",
          "statuses":   [201]
        },
        "List": {
          "method":     "GET",
          "path":       "/apps/{app_id_or_name}/domains",
          "statuses":   [200, 206]
        },
        "Info": {
          "method":     "GET",
          "path":       "/apps/{app_id_or_name}/domains/{domain_id_or_hostname}",
          "statuses":   [200]
        },
        "Delete": {
          "method":     "DELETE",
          "path":       "/apps/{app_id_or_name}/domains/{domain_id_or_hostname}",
          "statuses":   [200]
        }
      },
      "attributes": {
        "created_at": {
          "description":  "when domain was created",
          "example":      "2012-01-01T12:00:00-00:00",
          "serialized":   true,
          "type":         "datetime"
        },
        "hostname": {
          "description":  "full hostname",
          "example":      "subdomain.example.com",
          "serialized":   true,
          "type":         "string"
        },
        "id": {
          "description":  "unique identifier of this domain",
          "example":      "01234567-89ab-cdef-0123-456789abcdef",
          "serialized":   true,
          "type":         "uuid"
        },
        "updated_at": {
          "description":  "when domain was updated",
          "example":      "2012-01-01T12:00:00-00:00",
          "serialized":   true,
          "type":         "datetime"
        }
      },
      "description": "Domains define what web routes should be routed to an app on Heroku."
    },

    "Dyno": {
      "actions": {
        "Create": {
          "attributes": {
            "optional": [
              "attach",
              "size"
            ],
            "required": [
              "command"
            ]
          },
          "method":     "POST",
          "path":       "/apps/{app_id_or_name}/dynos",
          "statuses":   [201]
        },
        "List": {
          "method":     "GET",
          "path":       "/apps/{app_id_or_name}/dynos",
          "statuses":   [200, 206]
        },
        "Info": {
          "method":     "GET",
          "path":       "/apps/{app_id_or_name}/dynos/{dyno_id_or_name}",
          "statuses":   [200]
        },
        "Delete": {
          "method":     "DELETE",
          "path":       "/apps/{app_id_or_name}/dynos/{dyno_id_or_name}",
          "statuses":   [200]
        }
      },
      "attributes": {
        "attach": {
          "description":  "whether to stream output or not",
          "example":      true,
          "serialized":   false,
          "type":         "boolean"
        },
        "attach_url": {
          "description":  "a URL to stream output from for attached processes or null for non-attached processes",
          "example":      "rendezvous://rendezvous.runtime.heroku.com:5000/{rendezvous-id}",
          "serialized":   true,
          "type":         "string"
        },
        "command": {
          "description":  "command used to start this process",
          "example":      "bash",
          "serialized":   true,
          "type":         "string"
        },
        "created_at": {
          "description":  "when domain was created",
          "example":      "2012-01-01T12:00:00-00:00",
          "serialized":   true,
          "type":         "datetime"
        },
        "id": {
          "description":  "unique identifier of this dyno",
          "example":      "01234567-89ab-cdef-0123-456789abcdef",
          "serialized":   true,
          "type":         "uuid"
        },
        "name": {
          "description":  "the name of this process on this app",
          "example":      "run.1",
          "serialized":   true,
          "type":         "string"
        },
        "release:id": {
          "description":  "the unique identifier of the release this process was started with",
          "example":      "01234567-89ab-cdef-0123-456789abcdef",
          "serialized":   true,
          "type":         "uuid"
        },
        "release:name": {
          "description":  "the name of the release this process was started with",
          "example":      "v123",
          "serialized":   true,
          "type":         "string"
        },
        "size": {
          "description":  "dyno size (default: 1)",
          "example":      1,
          "serialized":   true,
          "type":         "number"
        },
        "state": {
          "description":  "current status of process (either: crashed, down, idle, starting, or up)",
          "example":      "up",
          "serialized":   true,
          "type":         "string"
        },
        "type": {
          "description":  "type of process",
          "example":      "run",
          "serialized":   true,
          "type":         "string"
        },
        "updated_at": {
          "description":  "when process last changed state",
          "example":      "2012-01-01T12:00:00-00:00",
          "serialized":   true,
          "type":         "datetime"
        }
      },
      "description": "Dynos encapsulate running processes of an app on Heroku."
    },

    "Formation": {
      "actions": {
        "List": {
          "method":     "GET",
          "path":       "/apps/{app_id_or_name}/formation",
          "statuses":   [200, 206]
        },
        "Info": {
          "method":     "GET",
          "path":       "/apps/{app_id_or_name}/formation/{formation_id_or_type}",
          "statuses":   [200]
        },
        "Update": {
          "attributes": {
            "optional": [
              "quantity",
              "size"
            ]
          },
          "method":     "PATCH",
          "path":       "/apps/{app_id_or_name}/formation/{formation_id_or_type}",
          "statuses":   [200]
        }
      },
      "attributes": {
        "command": {
          "description":  "command to use for process type",
          "example":      "bundle exec rails server -p $PORT",
          "serialized":   true,
          "type":         "string"
        },
        "created_at": {
          "description":  "when domain was created",
          "example":      "2012-01-01T12:00:00-00:00",
          "serialized":   true,
          "type":         "datetime"
        },
        "id": {
          "description":  "unique identifier of this process type",
          "example":      "01234567-89ab-cdef-0123-456789abcdef",
          "serialized":   true,
          "type":         "uuid"
        },
        "quantity": {
          "description":  "number of processes to maintain",
          "example":      1,
          "serialized":   true,
          "type":         "number"
        },
        "size": {
          "description":  "dyno size (default: 1)",
          "example":      1,
          "serialized":   true,
          "type":         "number"
        },
        "type": {
          "description":  "type of process to maintain",
          "example":      "web",
          "serialized":   true,
          "type":         "string"
        },
        "updated_at": {
          "description":  "when dyno type was updated",
          "example":      "2012-01-01T12:00:00-00:00",
          "serialized":   true,
          "type":         "datetime"
        }
      },
      "description": "The formation of processes that should be maintained for your application. Commands and types are defined by the Procfile uploaded with an app."
    },

    "Key": {
      "actions": {
        "Create": {
          "attributes": {
            "required": [
              "public_key"
            ]
          },
          "method":     "POST",
          "path":       "/account/keys",
          "statuses":   [201]
        },
        "List": {
          "method":     "GET",
          "path":       "/account/keys",
          "statuses":   [200]
        },
        "Info": {
          "method":     "GET",
          "path":       "/account/keys/{key_id_or_fingerprint}",
          "statuses":   [200]
        },
        "Delete": {
          "method":     "DELETE",
          "path":       "/account/keys/{key_id_or_fingerprint}",
          "statuses":   [200]
        }
      },
      "attributes": {
        "created_at": {
          "description":  "when key was created",
          "example":      "2012-01-01T12:00:00-00:00",
          "serialized":   true,
          "type":         "datetime"
        },
        "email": {
          "description":  "email address provided in key contents",
          "example":      "username@example.com",
          "serialized":   true,
          "type":         "string"
        },
        "fingerprint": {
          "description":  "a unique identifying string based on contents",
          "example":      "17:63:a4:ba:24:d3:7f:af:17:c8:94:82:7e:80:56:bf",
          "serialized":   true,
          "type":         "string"
        },
        "id": {
          "description":  "unique identifier of this key",
          "example":      "01234567-89ab-cdef-0123-456789abcdef",
          "serialized":   true,
          "type":         "uuid"
        },
        "public_key": {
          "description":  "full public_key as uploaded",
          "example":      "ssh-rsa AAAAB3NzaC1ycVc/../839Uv username@example.com",
          "serialized":   true,
          "type":         "string"
        },
        "updated_at": {
          "description":  "when key was updated",
          "example":      "2012-01-01T12:00:00-00:00",
          "serialized":   true,
          "type":         "datetime"
        }
      },
      "description": "Keys represent public SSH keys associated with an account and are used to authorize users as they are performing git operations."
    },

    "Log Drain": {
      "actions": {
        "Create": {
          "attributes": {
            "required": [
              "url"
            ]
          },
          "method":     "POST",
          "path":       "/apps/{app_id_or_name}/log-drains",
          "statuses":   [201]
        },
        "List": {
          "method":     "GET",
          "path":       "/apps/{app_id_or_name}/log-drains",
          "statuses":   [200]
        },
        "Info": {
          "method":     "GET",
          "path":       "/apps/{app_id_or_name}/log-drains/{drain_id_or_url}",
          "statuses":   [200]
        },
        "Delete": {
          "method":     "DELETE",
          "path":       "/apps/{app_id_or_name}/log-drains/{drain_id_or_url}",
          "statuses":   [200]
        }
      },
      "attributes": {
        "addon:id": {
          "description":  "unique identifier of the addon that provides the drain",
          "example":      "01234567-89ab-cdef-0123-456789abcdef",
          "serialized":   true,
          "type":         "uuid"
        },
        "created_at": {
          "description":  "when log drain was created",
          "example":      "2012-01-01T12:00:00-00:00",
          "serialized":   true,
          "type":         "datetime"
        },
        "id": {
          "description":  "unique identifier of this log drain",
          "example":      "01234567-89ab-cdef-0123-456789abcdef",
          "serialized":   true,
          "type":         "uuid"
        },
        "updated_at": {
          "description":  "when log session was updated",
          "example":      "2012-01-01T12:00:00-00:00",
          "serialized":   true,
          "type":         "datetime"
        },
        "url": {
          "description":  "url associated with the log drain",
          "example":      "https://example.com/drain",
          "serialized":   true,
          "type":         "string"
        }
      },
      "description": "[Log drains](https://devcenter.heroku.com/articles/logging#syslog-drains) provide a way to forward your Heroku logs to an external syslog server for long-term archiving. This external service must be configured to receive syslog packets from Heroku, whereupon its URL can be added to an app using this API."
    },

    "Log Session": {
      "actions": {
        "Create": {
          "attributes": {
            "optional": [
              "dyno",
              "lines",
              "source",
              "tail"
            ]
          },
          "method":     "POST",
          "path":       "/apps/{app_id_or_name}/log-sessions",
          "statuses":   [201]
        }
      },
      "attributes": {
        "created_at": {
          "description":  "when log connection was created",
          "example":      "2012-01-01T12:00:00-00:00",
          "serialized":   true,
          "type":         "datetime"
        },
        "dyno": {
          "description":  "dyno to limit results to",
          "example":      "web.1",
          "serialized":   false,
          "type":         "string"
        },
        "id": {
          "description":  "unique identifier of this log session",
          "example":      "01234567-89ab-cdef-0123-456789abcdef",
          "serialized":   true,
          "type":         "uuid"
        },
        "lines": {
          "description":  "number of log lines to stream at once",
          "example":      10,
          "serialized":   false,
          "type":         "number"
        },
        "logplex_url": {
          "description":  "URL for log streaming session",
          "example":      "https://logplex.heroku.com/sessions/01234567-89ab-cdef-0123-456789abcdef?srv=1325419200",
          "serialized":   true,
          "type":         "string"
        },
        "source": {
          "description":  "log source to limit results to",
          "example":      "app",
          "serialized":    false,
          "type":         "string"
        },
        "tail": {
          "description":  "whether to stream ongoing logs",
          "example":      true,
          "serialized":   false,
          "type":         "boolean"
        },
        "updated_at": {
          "description":  "when log session was updated",
          "example":      "2012-01-01T12:00:00-00:00",
          "serialized":   true,
          "type":         "datetime"
        }
      },
      "description": "Log sessions provide a URL to stream data from your app logs. Streaming is performed by doing an HTTP GET method on the provided Logplex URL and then repeatedly reading from the socket. Sessions remain available for about 5 minutes after creation or about one hour after connecting. For continuous access to an app's log, you should set up a [log drain](https://devcenter.heroku.com/articles/logging#syslog-drains)."
    },

    "OAuth Authorization": {
      "actions": {
        "Create": {
          "attributes": {
            "optional": [
              "client:id",
              "description"
            ],
            "required": [
              "scope"
            ]
          },
          "method":     "POST",
          "path":       "/oauth/authorizations",
          "statuses":   [201]
        },
        "List": {
          "method":     "GET",
          "path":       "/oauth/authorizations",
          "statuses":   [200, 206]
        },
        "Info": {
          "method":     "GET",
          "path":       "/oauth/authorizations/{authorization_id}",
          "statuses":   [200]
        },
        "Delete": {
          "method":     "DELETE",
          "path":       "/oauth/authorizations/{authorization_id}",
          "statuses":   [200]
        }
      },
      "attributes": {
        "access_token:expires_in": {
          "description":  "date in which this OAuth access token is no longer valid",
          "example":      "2012-01-01T12:00:00-00:00",
          "serialized":   true,
          "type":         "datetime"
        },
        "access_token:id": {
          "description":  "unique identifier of this authorization's OAuth access token",
          "example":      "01234567-89ab-cdef-0123-456789abcdef",
          "serialized":   true,
          "type":         "uuid"
        },
        "access_token:token": {
          "description":  "the actual OAuth access token",
          "example":      "01234567-89ab-cdef-0123-456789abcdef",
          "serialized":   true,
          "type":         "string"
        },
        "client:id": {
          "description":  "unique identifier of this OAuth authorization client",
          "example":      "01234567-89ab-cdef-0123-456789abcdef",
          "serialized":   true,
          "type":         "uuid"
        },
        "client:name": {
          "description":  "OAuth authorization client name",
          "example":      "example",
          "serialized":   true,
          "type":         "string"
        },
        "client:redirect_uri": {
          "description":  "endpoint for redirection after authorization with OAuth authorization client",
          "example":      "https://example.com/auth/heroku/callback",
          "serialized":   true,
          "type":         "string"
        },
        "created_at": {
          "description":  "when OAuth authorization was created",
          "example":      "2012-01-01T12:00:00-00:00",
          "serialized":   true,
          "type":         "datetime"
        },
        "description": {
          "description":  "human-friendly description of this OAuth authorization",
          "example":      "sample authorization",
          "serialized":   true,
          "type":         "string"
        },
        "grant:code": {
          "description":  "code for the OAuth authorization grant",
          "example":      "01234567-89ab-cdef-0123-456789abcdef",
          "serialized":   true,
          "type":         "string"
        },
        "grant:expires_in": {
          "description":  "date in which this authorization grant is no longer valid",
          "example":      "2012-01-01T12:00:00-00:00",
          "serialized":   true,
          "type":         "datetime"
        },
        "grant:id": {
          "description":  "unique identifier for this authorization's grant",
          "example":      "01234567-89ab-cdef-0123-456789abcdef",
          "serialized":   true,
          "type":         "uuid"
        },
        "id": {
          "description":  "unique identifier of OAuth authorization",
          "example":      "01234567-89ab-cdef-0123-456789abcdef",
          "serialized":   true,
          "type":         "uuid"
        },
        "refresh_token:expires_in": {
          "description":  "date in which this OAuth refresh token is no longer valid",
          "example":      "2012-01-01T12:00:00-00:00",
          "serialized":   true,
          "type":         "datetime"
        },
        "refresh_token:id": {
          "description":  "unique identifier of this authorization's OAuth refresh token",
          "example":      "01234567-89ab-cdef-0123-456789abcdef",
          "serialized":   true,
          "type":         "uuid"
        },
        "refresh_token:token": {
          "description":  "the actual OAuth refresh token",
          "example":      "01234567-89ab-cdef-0123-456789abcdef",
          "serialized":   true,
          "type":         "string"
        },
        "scope": {
          "description":  "The scope of access OAuth authorization allows",
          "example":      "global",
          "serialized":   true,
          "type":         "string"
        },
        "updated_at": {
          "description":  "when OAuth authorization was updated",
          "example":      "2012-01-01T12:00:00-00:00",
          "serialized":   true,
          "type":         "datetime"
        }
      },
      "description": "OAuth authorizations represent clients that a Heroku user has authorized to automate, customize or extend their usage of the platform. For more information please refer to the [Heroku OAuth documentation](https://devcenter.heroku.com/articles/oauth)"
    },

    "OAuth Client": {
      "actions": {
        "Create": {
          "attributes": {
            "required": [
              "name",
              "redirect_uri"
            ]
          },
          "method":     "POST",
          "path":       "/oauth/clients",
          "statuses":   [201]
        },
        "List": {
          "method":     "GET",
          "path":       "/oauth/clients",
          "statuses":   [200, 206]
        },
        "Info": {
          "method":     "GET",
          "path":       "/oauth/clients/{client_id}",
          "statuses":   [200]
        },
        "Update": {
          "attributes": {
            "optional": [
              "name",
              "redirect_uri"
            ]
          },
          "method":     "PATCH",
          "path":       "/oauth/clients/{client_id}",
          "statuses":   [200]
        },
        "Delete": {
          "method":     "DELETE",
          "path":       "/oauth/clients/{client_id}",
          "statuses":   [200]
        }
      },
      "attributes": {
        "created_at": {
          "description":  "when OAuth client was created",
          "example":      "2012-01-01T12:00:00-00:00",
          "serialized":   true,
          "type":         "datetime"
        },
        "id": {
          "description":  "unique identifier of this OAuth client",
          "example":      "01234567-89ab-cdef-0123-456789abcdef",
          "serialized":   true,
          "type":         "uuid"
        },
        "name": {
          "description":  "OAuth client name",
          "example":      "example",
          "serialized":   true,
          "type":         "string"
        },
        "redirect_uri": {
          "description":  "endpoint for redirection after authorization with OAuth client",
          "example":      "https://example.com/auth/heroku/callback",
          "serialized":   true,
          "type":         "string"
        },
        "secret": {
          "description":  "secret used to obtain OAuth authorizations under this client",
          "example":      "01234567-89ab-cdef-0123-456789abcdef",
          "serialized":   true,
          "type":         "string"
        },
        "updated_at": {
          "description":  "when OAuth client was updated",
          "example":      "2012-01-01T12:00:00-00:00",
          "serialized":   true,
          "type":         "datetime"
        }
      },
      "description": "OAuth clients are applications that Heroku users can authorize to automate, customize or extend their usage of the platform. For more information please refer to the [Heroku OAuth documentation](https://devcenter.heroku.com/articles/oauth)"
    },

    "OAuth Token": {
      "actions": {
        "Create": {
          "attributes": {
            "optional": [
              "client:secret",
              "grant:code",
              "refresh_token:token"
            ],
            "required": [
              "grant:type"
            ]
          },
          "method":     "POST",
          "path":       "/oauth/tokens",
          "statuses":   [201]
        }
      },
      "attributes": {
        "authorization:id": {
          "description":  "unique identifier of OAuth token authorization",
          "example":      "01234567-89ab-cdef-0123-456789abcdef",
          "serialized":   true,
          "type":         "uuid"
        },
        "access_token:expires_in": {
          "description":  "seconds until OAuth access token expires",
          "example":      2592000,
          "serialized":   true,
          "type":         "number"
        },
        "access_token:id": {
          "description":  "unique identifier of OAuth access token",
          "example":      "01234567-89ab-cdef-0123-456789abcdef",
          "serialized":   true,
          "type":         "uuid"
        },
        "access_token:token": {
          "description":  "content of OAuth access token",
          "example":      "01234567-89ab-cdef-0123-456789abcdef",
          "serialized":   true,
          "type":         "string"
        },
        "client:secret": {
          "description":  "OAuth client secret used to obtain token",
          "example":      "01234567-89ab-cdef-0123-456789abcdef",
          "serialized":   false,
          "type":         "string"
        },
        "created_at": {
          "description":  "when OAuth token was created",
          "example":      "2012-01-01T12:00:00-00:00",
          "serialized":   true,
          "type":         "datetime"
        },
        "grant:code": {
          "description":  "grant code recieved from OAuth web application authorization",
          "example":      "01234567-89ab-cdef-0123-456789abcdef",
          "serialized":   false,
          "type":         "string"
        },
        "grant:type": {
          "description":  "type of grant requested, one of `authorization_code` or `refresh_token`",
          "example":      "authorization_code",
          "serialized":   false,
          "type":         "string"
        },
        "id": {
          "description":  "unique identifier of OAuth token",
          "example":      "01234567-89ab-cdef-0123-456789abcdef",
          "serialized":   true,
          "type":         "uuid"
        },
        "refresh_token:expires_in": {
          "description":  "seconds until OAuth refresh token expires",
          "example":      2592000,
          "serialized":   true,
          "type":         "number"
        },
        "refresh_token:id": {
          "description":  "unique identifier of OAuth refresh token",
          "example":      "01234567-89ab-cdef-0123-456789abcdef",
          "serialized":   true,
          "type":         "uuid"
        },
        "refresh_token:token": {
          "description":  "content of OAuth refresh token",
          "example":      "01234567-89ab-cdef-0123-456789abcdef",
          "serialized":   true,
          "type":         "string"
        },
        "session:id": {
          "description":  "unique identifier of OAuth token session",
          "example":      "01234567-89ab-cdef-0123-456789abcdef",
          "serialized":   true,
          "type":         "string"
        },
        "updated_at": {
          "description":  "when OAuth token was updated",
          "example":      "2012-01-01T12:00:00-00:00",
          "serialized":   true,
          "type":         "datetime"
        }
      },
      "description": "OAuth tokens provide access for authorized clients to act on behalf of a Heroku user to automate, customize or extend their usage of the platform. For more information please refer to the [Heroku OAuth documentation](https://devcenter.heroku.com/articles/oauth)"
    },

    "Plan": {
      "actions": {
        "List": {
          "method":     "GET",
          "path":       "/addon-services/{addon_service_id_or_name}/plans",
          "statuses":   [200, 206]
        },
        "Info": {
          "method":     "GET",
          "path":       "/addon-services/{addon_service_id_or_name}/plans/{plan_id_or_name}",
          "statuses":   [200]
        }
      },
      "attributes": {
        "created_at": {
          "description":  "when plan was created",
          "example":      "2012-01-01T12:00:00-00:00",
          "serialized":   true,
          "type":         "datetime"
        },
        "description": {
          "description":  "description of plan",
          "example":      "Heroku Postgres Dev",
          "serialized":   true,
          "type":         "string"
        },
        "id": {
          "description":  "unique identifier of plan",
          "example":      "01234567-89ab-cdef-0123-456789abcdef",
          "serialized":   true,
          "type":         "uuid"
        },
        "name":         {
          "description":  "unique name for plan",
          "example":      "heroku-postgresql:dev",
          "serialized":   true,
          "type":         "string"
        },
        "price:cents": {
          "description":  "price in cents per unit of plan",
          "example":      0,
          "serialized":   true,
          "type":         "number"
        },
        "price:unit": {
          "description":  "unit of price for plan",
          "example":      "month",
          "serialized":   true,
          "type":         "string"
        },
        "state":        {
          "description":  "release status for plan",
          "example":      "public",
          "serialized":   true,
          "type":         "string"
        },
        "updated_at": {
          "description":  "when plan was updated",
          "example":      "2012-01-01T12:00:00-00:00",
          "serialized":   true,
          "type":         "datetime"
        }
      },
      "description": "Plans represent different configurations of add-ons that may be added to apps."
    },

    "Region": {
      "actions": {
        "List": {
          "method":     "GET",
          "path":       "/regions",
          "statuses":   [200, 206]
        },
        "Info": {
          "method":     "GET",
          "path":       "/regions/{region_id_or_name}",
          "statuses":   [200]
        }
      },
      "attributes": {
        "created_at": {
          "description":  "when region was created",
          "example":      "2012-01-01T12:00:00-00:00",
          "serialized":   true,
          "type":         "datetime"
        },
        "description": {
          "description":  "description of the region",
          "example":      "United States",
          "serialized":   true,
          "type":         "string"
        },
        "id": {
          "description":  "unique identifier of this region",
          "example":      "01234567-89ab-cdef-0123-456789abcdef",
          "serialized":   true,
          "type":         "uuid"
        },
        "name": {
          "description":  "unique name of the region",
          "example":      "us",
          "serialized":   true,
          "type":         "string"
        },
        "updated_at": {
          "description":  "when region was updated",
          "example":      "2012-01-01T12:00:00-00:00",
          "serialized":   true,
          "type":         "datetime"
        }
      },
      "description": "Regions represent geographic locations in which your application may run."
    },

    "Release": {
      "actions": {
        "List": {
          "method":     "GET",
          "path":       "/apps/{app_id_or_name}/releases",
          "statuses":   [200, 206]
        },
        "Info": {
          "method":     "GET",
          "path":       "/apps/{app_id_or_name}/releases/{release_id_or_name}",
          "statuses":   [200]
        }
      },
      "attributes": {
        "created_at": {
          "description":  "when release was created",
          "example":      "2012-01-01T12:00:00-00:00",
          "serialized":   true,
          "type":         "datetime"
        },
        "description": {
          "description":  "description of changes in this release",
          "example":      "Added new feature",
          "serialized":   true,
          "type":         "string"
        },
        "id": {
          "description":  "unique identifier of this release",
          "example":      "01234567-89ab-cdef-0123-456789abcdef",
          "serialized":   true,
          "type":         "uuid"
        },
        "updated_at": {
          "description":  "when region was updated",
          "example":      "2012-01-01T12:00:00-00:00",
          "serialized":   true,
          "type":         "datetime"
        },
        "user:email": {
          "description":  "email address of user that created the release",
          "example":      "username@example.com",
          "serialized":   true,
          "type":         "string"
        },
        "user:id": {
          "description":  "unique identifier of the user that created the release",
          "example":      "01234567-89ab-cdef-0123-456789abcdef",
          "serialized":   true,
          "type":         "uuid"
        },
        "version": {
          "description":  "unique version assigned to the release",
          "example":      456,
          "serialized":   true,
          "type":         "number"
        }
      },
      "description": "A release represents a combination of code, config vars and add-ons for an app on Heroku."
    }

  }
}
