## Parent wallet

### View digital wallet details

#### Request
```
GET /api/parent/wallet
```

The request **header** contains:

| Key | Value |
| - | - |
| Authorization | Bearer token, with the `jwt` token supplied from the login |

#### Response

##### The token is invalid
No response for now

##### The user is not a parent
No response for now

##### The user is a parent
Respond with the following `JSON` object
```
{
    Balance,
    BonusPoints,
    bookings: [
        {
            Quantity,
            Price,
            EventDate,
            ActivityName
        }
    ]
}
```

### Top Up digital wallet

#### Request
```
POST /api/parent/wallet
```

The request **header** contains:

| Key | Value |
| - | - |
| Authorization | Bearer token, with the `jwt` token supplied from the login |

The request **body** contains:

| Key | Value |
| - | - |
| Amount | The amount of points that the parent wants to top up from. There is no need for card information, as this call is guaranteed to succeed. |

#### Response
This call is always successful and returns the following `JSON` object:
```
{
    Balance
}
```
