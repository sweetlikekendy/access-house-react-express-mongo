# An Application Created To Find Access Codes for Delivery Drivers

A CRUD application that allows a single user to add a home to a database with the corresponding gate/access code. The user will be able to search for the home when they're on route. The search mechanics are case-sensitive.

[Live Demo](https://protected-oasis-33800.herokuapp.com/)

## Usage

All responses will have this form

```json
{
  "data": "Mixed type holding the content of the response"
}
```

### List all the homes

**Definition**
`GET /api/homes`

**Response**

- `200 OK` on success

```json
{
  "data": [
    {
      "_id": "5cfad0e6c6b20f1127ef5e52",
      "address": "1 Hello Ave.",
      "city": "San Diego",
      "zip": "19191",
      "code": "1290",
      "__v": 0
    },
    {
      "_id": "5cfd81821e55265667267ab5",
      "address": "1111 Test",
      "city": "San Diego",
      "zip": "91010",
      "code": "0000",
      "__v": 0
    }
  ]
}
```

### Creating a new home

**Definition**
`POST /api/homes`

**Response**

- `201 Created` on success

**Arguments**

- `"id":string` a globally unique identifier for this device created by MongoDB
- `"address":string` an address of the home
- `"city":string` the city of the home
- `"zip":string` the zip code of the home
- `"code":string` the gate/access code of the home

```json
{
  "_id": "5cfad0e6c6b20f1127ef5e52",
  "address": "1 Hello Ave.",
  "city": "San Diego",
  "zip": "19191",
  "code": "1290"
}
```

### List a single home

**Definition**
`GET /api/homes/<id>`

**Response**

- `404 Not Found` if the home does not exist
- `200 OK` on success

```json
{
  "data": [
    {
      "_id": "5cfad0e6c6b20f1127ef5e52",
      "address": "1 Hello Ave.",
      "city": "San Diego",
      "zip": "19191",
      "code": "1290",
      "__v": 0
    }
  ]
}
```

## Delete a device

**Definition**

`DELETE /api/homes/<identifier>`

**Response**

- `404 Not Found` if the device does not exist
- `204 No Content` on success

```json
{
  "redirect": "/homes"
}
```
