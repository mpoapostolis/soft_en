## Create Listing

#### Request
```
POST /api/activity/:id
```

The request **header** contains:

| Key | Value |
| - | - |
| Authorization | Bearer token, with the `jwt` token supplied from the login |

The request **body** contains the following:

| Key | Value |
| - | - |
| Listings | A list of `{ Date, Remaining }` pairs, corresponding to the listing date and the initial number of tickets. |

The request **url parameter** contains:

| Key | Value |
| - | - |
| id | The **activity** id |

#### Response

##### The token is invalid
No response as of now.

##### No activity with the given id
No response as of now.

##### Not owner of activity
No response as of now.

##### User is not an owner
No response as of now.

##### Owner of existing activity
Dummy success response.
