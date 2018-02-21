## Owner Statistics

### Overall sales statistics

#### Request
```
GET /api/statistics
```

The request **header** contains:

| Key | Value |
| - | - |
| Authorization | Bearer token, with the `jwt` token supplied from the login |

#### Response
Respond with a list of objects containing monthly income statistics.
The contained Date will be truncated to 'month', using [date_trunc](http://www.postgresqltutorial.com/postgresql-date_trunc/):
```
[
    {
        Date,
        Income
    }
]
```

### View activity income details

#### Request
```
GET /api/statistics/:id
```

The request **header** contains:

| Key | Value |
| - | - |
| Authorization | Bearer token, with the `jwt` token supplied from the login |

The request **url parameter** contains:

| Key | Value |
| - | - |
| id | The activity `UUID` |

#### Response

##### No matching activity
No response for now

##### Matching activity
Respond with a list of objects containing monthly income statistics.
The contained Date will be truncated to 'month', using [date_trunc](http://www.postgresqltutorial.com/postgresql-date_trunc/):
```
[
    {
        Date,
        Income
    }
]
```
