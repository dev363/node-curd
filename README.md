# UserApi
Hello, welcoe to your on UserApi. Many of these resources allow create, read, update and delete operations. The REST API maps CRUD operations to HTTP methods. The following table specifies which HTTP method maps to which operation.

## CRUD Operation	HTTP Method
```
Create	POST
Read	GET
Update  PUT
Delete	DELETE
```
## Api perameter
```
_id: Unique Id,
name: Unique, required,
email: Unique, lowecase,Valid email,
password:required, String,
recoveryToken: String (Only use for set-password)
```

#Api operations

## Add new User
Resources are created by sending HTTP POST requests to the API. The type of resource is determined by the URL of the request. The body of the request should contain a JSON object describing the resource to create. The object in the request body determines the initial state of the resource will be when it is created. Some resources require certain properties be provided when they are created, others can be created with an empty JSON object.

Creating a resource while setting the name property. POST

### Request
```
curl -X POST \
  http://localhost:6002/users/add \
  -H 'authorization: Basic XXXXXXXXXXXXX' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d '{
    "name": "xxxxxxx",
    "email":"xxxxx@xxxx.com",
    "password":"xxxxxxxx"
}'
```
### Response
####(Success 200)
```
{
    "message": "user added successfully",
    "data": [
        {
            "_id": "5dc51a0fdf622d089302b245",
            "name": "xxxxx",
            "email": "xxxxx@xxxx.com",
            "password": "xxxxxx",
            "__v": 0
        }
    ]
}
```
####(Error 404)
```
{
    "message": "User validation failed: name: email: is already taken."
}
{
    "message": "User validation failed: name: Path `name` is required."
}
```
