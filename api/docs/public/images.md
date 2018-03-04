## Load static images

#### Request
```
GET /images/:image
```

The request **url path** contains:

| Param | Value |
| - | - |
| image | The name of the static image to be loaded |

#### Response

| Status | Response |
| - | - |
| Image exists | The image |
| Image not found | nginx resource not found error |
