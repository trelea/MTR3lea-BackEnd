# ABOUT

In this repository is the souce code, config files, middlewares and controllers of MTR3lea Backend Platform. 

## All Routes

### Auth Routes
```javascript
POST    /api/auth/signin
POST    /api/auth/signup
POST    /api/auth/verification
POST    /api/auth/signout
```

### Content Routes
```javascript
GET     /api/content/?page={pageNr}&limit={limitPosts}
GET     /api/content/:post_id
POST    /api/content/
PUT     /api/content/:post_id
DELETE  /api/content/:post_id
PUT     /api/content/like/:post_id
GET     /api/content/search/:post_title
GET     /api/content/top10
```

### Comment Routes
```javascript
POST    /api/comment/:post_id 
PUT     /api/comment/:comment_id
DELETE  /api/comment/:comment_id
```

### User Routes
```javascript
GET     /api/user/profile
GET     /api/user/:user_name
```

### Settings Routes
```javascript
POST    /api/settings/generatepswdtoken
PUT     /api/settings/resetpswd
PUT     /api/settings/updateprofile
PUT     /api/settings/removethumb
DELETE  /api/settings/deleteacc
```

