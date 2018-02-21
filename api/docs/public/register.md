## Register a new user.

### Register Parent

#### Request
`POST /api/register`

The request **body** contains:

| Key | Value |
| - | - |
| Email | Parent email. |
| Password | Parent password |
| Role | 'Parent' |
| Name | Parent name |
| Address | Parent address in plain text |
| Phone | Parent phone |

#### Response
Upon successful registration, the client receives a placeholder success message
```
'Welcome to our service, ' + Name
```

### Register Owner

#### Request
`POST /api/register`

The request **body** contains:

| Key | Value |
| - | - |
| Email | Parent email. |
| Password | Parent password |
| Role | 'Owner' |
| CompanyName | Company name |
| TaxNumber | Company tax number |
| Address | Company address in plain text |
| IBAN | Company bank account IBAN |
| SWIFT | Company bank account SWIFT |
| BIC | Company bank account BIC |

#### Response
Upon successful registration, the client receives a placeholder success message
```
'Welcome to our service, ' + Name
```
