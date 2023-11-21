# ABOUT

In this repository is the souce code, config files, middlewares and controllers of MTR3lea Backend Platform. 

## All Routes:

### Auth Routes:
```javascript
POST /api/auth/signin
POST /api/auth/signup
POST /api/auth/verification
POST /api/auth/signout
```

### Content Routes:
```javascript
GET    /api/content/?page={pageNr}&limit={limitPosts}
GET    /api/content/:post_id
POST   /api/content/
PUT    /api/content/:post_id
DELETE /api/content/:post_id
PUT.   /api/content/like/:post_id
```
