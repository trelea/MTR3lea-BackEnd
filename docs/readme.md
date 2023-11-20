
# API Documetation
> 1. Auth Routes.
> 2. CRUD Content Routes.
> 3. Comments Routes.
> 4. Account Settings Routes.

## Auth Routes 4 API_END_POINTS.

---

- ### Register New User On Platform.
```javascript
    POST  -->  {BASE_URI}/api/user/register
```
```javascript
REQUEST_BODY_JSON:
{
    "email" : "<new_user_email>",
    "username" : "<new_user_username>",
    "date" : "<new_user_dateofbirth>"
}
```
```javascript
RESPONSE_BODY:
HTTP/1.1 200 OK
{
	//comment"user_otp": 855632,
	"user_ip": "<userIP>",
	"user_email": "<new_user_email>",
	"otp_expire": "1h"
}
```
Use <__cookies.newUserVerificationInfo__> from response, as a cookie to fetch next __API_END_POINT /api/user/verificationStep__.

---

- ### Verify New User Email.
```javascript
    POST  -->  {BASE_URI}/api/user/verificationStep
```
```javascript
REQUEST_BODY_JSON:
{
	"otpCode": <INT_otp_code_sent_to_user_email>,
	"password": "<new_user_pass>",
	"passwordRetype": "<new_user_pass>"
}
```
```javascript
RESPONSE_BODY:
HTTP/1.1 200 OK
{
	"User": [
		{
			"id": "<new_incremental_id>",
			"user_id": "<new_user_id>",
			"user_name": "<new_user_username>",
			"user_email": "<new_user_email>",
			"user_dateofbirth": "<new_user_date_of_birth>",
			"user_password": "<new_user_ENC_password>",
			"user_thumbnail": "<default_profile_thumbnail>",
			"user_isverified": true,
			TIMESTAMPZ
		}
	]
}
```
This ia compulsory request for user. Without email verification data can not be stored in DataBase. After this step the server side cookie <__cookies.newUserVerificationInfo__> will be automaticly destroyed.

---

- ### Login User On Platform.
```javascript
	POST  -->  {BASE_URI}/api/user/login
```
```javascript
REQUEST_BODY_JSON:
{
	"username": "<existent_user_username>",
	"password": "<existent_user_password>"
}
```
```javascript
RESPONSE_BODY:
HTTP/1.1 200 OK
{
	"msg": "Logged In.",
	"user_id": "<user_id>",
	"user_name": "<user_username>",
	"user_thumbnail": "<user_profile_thumbnail>",
	"user_token": "<AES256ENC_JWT_Token>"
}
```
After fetching respective __API_END_POINT__, the server will send to you a AES256_TOKEN that represents the User_SecretToken __JSON("user_token")__, and actual User username. This token will be used to access protected __API_ENT_POINTS__ like: LoggingOut, Posting New Content, Posting Comments... And So More.

---

- ### Logout User From Platform.
Like how I explained in above section, Logout is a protected route so you will need a SecretToken to make a request to it.
```javascript
	POST  -->  {BASE_URI}/api/user/logout
```
```javascript
REQUEST_BODY_COOKIES:
User=Username
SecretToken=AES256_TOKEN
```
```javascript
RESPONSE_BODY:
HTTP/1.1 200 OK
{
	"msg": "Logout."
}
```
This __API_END_POINT__ will destroy respective cookies __Cookies(User=None, SecretToken=None)__ to cancel access to protected __API_END_POINTS__.

## CRUD Post Routes 5 API_END_POINTS.

---
- ### Get Posts (Home Page).
```javascript
```
```javascript
```
```javascript
```

---
- ### 
```javascript
```
```javascript
```
```javascript
```

---
- ### 
```javascript
```
```javascript
```
```javascript
```

---
- ### 
```javascript
```
```javascript
```
```javascript
```

---
- ### 
```javascript
```
```javascript
```
```javascript
```
---