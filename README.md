# ssm-report-data-client
Sample web client for viewing report data from a 77media platform.

Demo Site https://ssm-report-data-client.azurewebsites.net

#### request
A POST is preferred to a GET because more fields can be sent and data is not logged in the url like in a GET.

In production the route should always be secured with SSL encryption via https.

HTTP POST
https://safesport-platform-staging.azurewebsites.net/api/reports/progress

```javascript
{
  token: 'f7e1379c-35ad-45f9-b0fa-6ef011e73938', // required
  startDate: '2017-05-01T00:00:00', // required
  endDate: '2017-07-01T00:00:00', // required
  completed: false, // optional
  search: '', // optional parameter to filter first, last, or activity (default: '')
  start: 0,  // optional page       (default: 0)
  number: 10, // optional page size  (default: 10)
  sort: 'firstName',   // optional sort field (default: firstName)
  order : 'ASC'  // optional sort order (default: ASC)
} 
```

#### result

```javascript
{
  "count": 2,
  "rows": [
    {
      "transactionId": "9987",
      "firstName": "John",
      "lastName": "Doe",
      "email": "johndoe@fakeemail.com",
      "memberIdentifier": "12345",
      "activityId": "https://ssm-activity-sample.azurewebsites.net",
      "activityTitle": "Activity Sample",
      "registration": "f53f253f-248b-4bfa-a94b-55cac283765b",
      "dateStarted": "2017-05-11T12:00:50.279Z",
      "progress": "100",
      "dateCompleted": "2017-05-16T12:00:50.000Z",
      "completionCode": "Fake Code"
    },
    {
      "transactionId": "88367"
      "firstName": "Jane",
      "lastName": "Doe",
      "email": "janedoe@fakeemail.com",
      "memberIdentifier": "12346",
      "activityId": "https://ssm-activity-sample.azurewebsites.net",
      "activityTitle": "Activity Sample",
      "registration": "6903cb1d-fab4-48d0-9e39-ed45002df600",
      "dateStarted": "2017-05-25T17:58:24.384Z",
      "progress": 0,
      "dateCompleted": null,
      "completionCode": null
    }
  ]
}
```

## Process Overview

1. Your organization will be provided with a route to access completion data for your members.

2. The route has 3 required parameters which are token (which we provide you), start date and end date.  Other fields are optional.
```javascript
    token: DataTypes.UUID,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE
```

## Organization Registration Fields
The following fields will be reported to your organization.
```javascript
    transactionId: DataTypes: INTEGER,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true},
    memberIdentifier: DataTypes.STRING (not available for native implementations),
    activityId: DataTypes.STRING,
    activityTitle: DataTypes.STRING,
    registration: DataTypes.UUID,
    dateStarted: DataTypes.DATE,
    progress: DataTypes.DECIMAL,
    dateCompleted: DataTypes.DATE,
    completionCode: DataTypes.UUID  

```


## Samples
### Jquery

```javascript

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://safesport-platform-staging.azurewebsites.net/api/reports/progress",
  "method": "POST",
  "headers": {
    "content-type": "application/json"
  },
  "processData": false,
  "data": "{\n\t\"token\": \"f7e1379c-35ad-45f9-b0fa-6ef011e73938\",\n\t\"startDate\": \"2017-05-01T00:00:00\",\n\t\"endDate\": \"2017-07-01T00:00:00\",\n\t\"completed\": \"false\",\n\t\"search\": \"\"\n}"
}

$.ajax(settings).done(function (response) {
  console.log(response);
});

```


### NodeJS

```javascript

var request = require("request");

var options = { method: 'POST',
  url: 'https://safesport-platform-staging.azurewebsites.net/api/reports/progress',
  headers: { 'content-type': 'application/json' },
  body: 
   { token: 'f7e1379c-35ad-45f9-b0fa-6ef011e73938',
     startDate: '2017-05-01T00:00:00',
     endDate: '2017-07-01T00:00:00',
     completed: false,
     search: '' },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

```

### C#

```csharp

var client = new RestClient("https://safesport-platform-staging.azurewebsites.net/api/reports/progress");
var request = new RestRequest(Method.POST);
request.AddHeader("content-type", "application/json");
request.AddParameter("application/json", "{\n\t\"token\": \"f7e1379c-35ad-45f9-b0fa-6ef011e73938\",\n\t\"startDate\": \"2017-05-01T00:00:00\",\n\t\"endDate\": \"2017-07-01T00:00:00\",\n\t\"completed\": \"false\",\n\t\"search\": \"\"\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);

```