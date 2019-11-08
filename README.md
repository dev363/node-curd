# UserApi
Hello, welcoe to your on UserApi. Many of these resources allow create, read, update and delete operations. The REST API maps CRUD operations to HTTP methods. The following table specifies which HTTP method maps to which operation.

## Basic Authentication
Basic authentication is a simple authentication scheme built into the HTTP protocol. The client sends HTTP requests with the Authorization header that contains the word Basic word followed by a space and a base64-encoded string username:password. For example, to authorize as demo / p@55w0rd the client would send
```
Authorization: Basic base64(username:password)

Authorization: Basic xxxxxxxx==

```

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

# Api operations

## Add new User

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
(Success 200)
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
(Error 404)
```
{
    "message": "User validation failed: name: email: is already taken."
}
{
    "message": "User validation failed: name: Path `name` is required."
}
```

## Get Users

### Request

All users
```
curl -X GET \
  http://localhost:6002/users/ \
  -H 'authorization: Basic XXXXXXXXX==' \
  -H 'cache-control: no-cache' \
```

User By Id
```
curl -X GET \
  http://localhost:6002/users/5dc5114741694202998bdeed \
  -H 'authorization: Basic XXXXXXXXX==' \
  -H 'cache-control: no-cache' \
```
### Response
Success (200)
```
{
    "user": {
        "_id": "5dc5114741694202998bdeed",
        "name": "xxxxx",
        "email": "xxxxxxx@gmail.com",
        "password": "xxxxxxxxx"
    }
}
```

## Update Users

### Request
````
curl -X PUT \
  http://localhost:6002/users/xxxxxxxxxxxxx \
  -H 'authorization: Basic xxxxxxxxxxxxxx==' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d '{
    "name": "xxxxxx",
    "email":"xxxxxx@gmail.com",
    "password":"xxxxxxx"
}'
````
### Response
Success (200)
```

```
error (404)
```
{
    "message": "xxxxx user is not available"
}

{
    "message": "No perameters pass."
}

```

## Delete User

### Request
```
curl -X DELETE \
  http://localhost:6002/users/xxxxxxxxxxxxxxx \
  -H 'authorization: Basic xxxxxxxxx==' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
```
### Response

success (200)
```
{
    "message": "User deleted successfully"
}

```
error (404)

```
{
    "message": "No User found with id xxxxxxxx"
}
```

## Forget password
To recover your password follow below steps:-

1) send Post /forget-password request
2) take recoveryToken from email and pass as perameter to 2) request POST /set-password
### Request
```
curl -X GET \
  'http://localhost:6002/users/forget-password?email=xxxxxxx@xxxx.xxx' \
  -H 'cache-control: no-cache' \
```

### Response
success (200)
```
{
    "message": "we have send password reset token. please check your email."
}
```

error(404)
```
{
    "message": "Please pass email perameter in query."
}
{
    "message": "No user registerd with this email."
}
```

# Set password

## Request
```
curl -X POST \
  http://localhost:6002/users/set-password \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d '{
  	"email":"xxxxx@xxxxxxxx.com",
  	"recoveryToken":"769356",
  	"password":"xxxxxx"
  }'
```

## Response
success (200)
```
{
    "message": "Your password reset successfully."
}
```
error (404)
```
{
    "message": "Please check email or recoveryToken invalid."
}
{
    "message": "perameters not available or someone missing.Please check again."
}

```

Thanks
