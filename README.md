# ssm-report-data-client
Sample web client for viewing report data from a 77media platform.

#### request
A POST is preferred to a GET because more fields can be sent and data is not logged in the url like in a GET.

In production the route should always be secured with SSL encryption via https.

HTTP POST
http://localhost:3000/api/verify

```javascript
{  
    "lastName": "Doe",
    "confirmationNumber": "4567" 
}  
```

#### result

```javascript
{  
  "id": 1,
  "isValid": true,
  "firstName": "John",
  "lastName": "Doe",
  "email": null,
  "dateOfBirth": "0001-01-01T00:00:00",
  "country": null,
  "region": null,
  "address": null,
  "address2": null,
  "city": null,
  "postal": null,
  "gender": null,
  "position": null,
  "membershipId": "12345",
  "membershipExpiration": "2020-01-01T00:00:00" 
}
```

## Process Overview

1. Your organization would direct all of your members to register on the SafeSport portal using a special link. This link would be specific to your organization only and would automatically open a dialog box with your organization auto-selected. All your members would have to enter would be their member identifier.

2. Your members would enter their member identifier. This identifier would then be passed to your organization’s web service. Your system would then determine whether or not the identifier is valid.

3. If the identifier is valid, your organization passes back that it is valid as well as the user’s information to complete the SafeSport registration form. You can pass back as many or as few as fields as you wish. For any field not passed back, users must enter the information themselves.

4. If the identifier is NOT valid, then your organization passes back that it is invalid. The user then has the opportunity to re-enter or contact your organization for help.

## Organization Registration Fields
The following fields are required in the user registration process. Any field not passed to the platform in the service must be manually filled out by your members.
```javascript
    isValid: DataTypes.BOOLEAN,  
    firstName: DataTypes.STRING, 
    lastName: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true},
    dateOfBirth: DataTypes.DATE,
    country: DataTypes.STRING,
    region: DataTypes.STRING,
    address: DataTypes.STRING,  
    address2: DataTypes.STRING,
    city: DataTypes.STRING,
    postal: DataTypes.STRING,
    gender: DataTypes.STRING,
    position: DataTypes.STRING // (Administrator, Athlete, Coach, Official, Other, Parent, Volunteer)  

```

Membership expiration can be used if you want to require your members to verify again after their membership has expired. Post expiration, your members will not be able to complete courses on the platform until after they have re-verified their membership.

```javascript
    membershipExpiration: DataTypes.DATE
```
