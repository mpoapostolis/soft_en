## View Activities

### Query activities by filters

#### Request
```
GET /api/activity
```

The request **query** contains:

| Key | Value |
| - | - |
| Date | The desired activity date |
| Max_price | Maximum desired price **in points** |
| Min_price | Minimum desired price **in points** |
| Tag | Desired activity tags, delimited by `;`. |
| Long | Location longitude for geoqueries |
| Lat | Location latitude for geoqueries |
| Distance | Geoquery maximum distance **in kilometers** from the supplied `Long`,`Lat` |
| Search | Text query string |
| Page | Optional pagination |
| Offset | Optional pagination |

#### Response
Respond with a list of objects in the following format:
```
[
    {
        ActivityName,
        ActivityID,
        CompanyName,
        Price,
        Images: [],
        Tags: [],
        Rating
    }
]
```

### View activity details

#### Request
```
GET /api/activity/:id
```

The request **url parameter** contains:

| Key | Value |
| - | - |
| id | The activity `UUID` |

#### Response

##### No matching activity
No response for now

##### Matching activity
Respond with a `JSON` object of details for the activity:
```
{
    ActivityName,
    Description,
    Reviews: [],
    Price,
    Duration,
    Venue: {
        CompanyName,
        Address
    },
    Listings: [
        {
            EventDate,
            Remaining,
            Price
        }
    ]
}
```
