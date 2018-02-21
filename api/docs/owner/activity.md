## Create Activity

#### Request
```
POST /api/activity
```

The request **header** contains:

| Key | Value |
| - | - |
| Authorization | Bearer token, with the `jwt` token supplied from the login |

The request **body** contains the following as `form-data`:

| Key | Value |
| - | - |
| ActivityName | The activity name |
| AgeGroups | **TODO** Impement age groups. Send `null` for now |
| Description | Activity description |
| image | Up to 8 image files uploaded with the key `image` will be forwarded to the media service for processing and then saved to our image volume.<br><br>**Max total request size must be less than `20M`** |
| Long | Activity location longitude |
| Lat | Activity location latitude |
| Tag | Any attributes with the `tag` key will be added as tags to the new activity |
| Price | Activity price |
| Duration | Activity duration |

#### Response
Respond with a JSON object corresponding to the newly created activity:
```
[
    {
        ActivityName,
        ActivityID,
        Price
    }
]
```
