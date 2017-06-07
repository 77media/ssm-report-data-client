# ssm-report-data-client
Sample web client for viewing report data from a 77media platform.

Demo Site ssm-report-data-client

#### request
A POST is preferred to a GET because more fields can be sent and data is not logged in the url like in a GET.

In production the route should always be secured with SSL encryption via https.

HTTP POST
http://localhost:3000/api/reports/progress

```javascript
{  
    "token": "f7e1379c-35ad-45f9-b0fa-6ef011e73938",
    "startDate": "0001-01-01T00:00:00",
    "endDate": "0001-01-01T00:00:00"
}  
```

#### result

```javascript
[
    {  
        "firstName": "System Administrator",
        "lastName": "Administrator",
        "email": "admin@77media.com",
        "memberIdentifier": "12345",
        "activityTitle": "Youth Development Course",
        "registration": "a7e1379c-35ad-45f9-b0fa-6ef011e7368b",
        "dateStarted": "2017-05-11T00:00:00",
        "progress": "100",
        "dateCompleted": "2017-05-16T00:00:00",
        "completionCode": "Fake Code"
    },
    {  
        "firstName": "System Administrator",
        "lastName": "Administrator",
        "email": "admin@77media.com",
        "memberIdentifier": "12345",
        "activityTitle": "Test",
        "registration": "g7e1879c-35ad-45f9-b0fa-5ef011e7368b",
        "dateStarted": "2017-05-25T00:00:00",
        "progress": "0",
        "dateCompleted": "",
        "completionCode": ""
    }
]
```

## Process Overview
### Enhanced

1. Your organization will be provided with a route to access completion data for your members.

2. The route has 3 required parameters which are token (which we provide you), start date and end date.
```javascript
    token: DataTypes.UUID,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE
```

## Organization Registration Fields
The following fields will be reported to your organization whether you are pulling the data (Enhanced) or having the data pushed to you (Real-Time).
```javascript
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true},
    memberIdentifier: DataTypes.STRING (not available for native implementations),
    activityTitle: DataTypes.STRING,
    registration: DataTypes.UUID,
    dateStarted: DataTypes.DATE,
    progress: DataTypes.DECIMAL,
    dateCompleted: DataTypes.DATE,
    completionCode: DataTypes.UUID  

```
