## User login.

#### Request
```
POST /api/login
```

The request **body** contains:

| Key | Value |
| - | - |
| Email | User email. |
| Password | User password |

#### Response
| Status | Response |
| - | - |
| User is not stored in the database | `User not found` |
| The password is wrong | `Wrong password` |
| Error signing token | `oops` |
| Weird DB error | `ERR` |
| Successful login | A `jwt` token containing `Role` and `UserID` for the given user, that should be used as a `Bearer token` for every subsequent protected API call. |
