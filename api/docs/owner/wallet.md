## Owner wallet

### View digital wallet dashboard

#### Request
```
GET /api/owner/wallet
```

The request **header** contains:

| Key | Value |
| - | - |
| Authorization | Bearer token, with the `jwt` token supplied from the login |

#### Response

##### The token is invalid
No response for now

##### The user is not an owner
No response for now

##### The user is an owner
Respond with the following `JSON` object
```
{
    Monthly Balance,
    Activities: [
        {
            ActivityName,
            Price,
            Images: []
        }
    ]
}
```
