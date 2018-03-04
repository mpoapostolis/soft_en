## Book an activity

#### Request
```
POST /api/booking/:id
```

The request **header** contains:

| Key | Value |
| - | - |
| Authorization | Bearer token, with the `jwt` token supplied from the login |

The request **body** contains:

| Key | Value |
| - | - |
| Quantity | The amount of tickets that the parent wants to purchase. |

The request **url parameter** contains:

| Key | Value |
| - | - |
| id | The **listing** id |

#### Response
The call is executed as a transaction, checking if the user has the necessary
funds and also if there are tickets remaining. If both conditions are met,
a dummy success response is sent.

In case it fails in one of the 2 checks, it responds with a suitable message.
