require('dotenv').config();


//PACKAGES
const express = require('express');
const cors = require('cors');
const app = require('express')();
const cookieParser = require('cookie-parser');
const path = require('path')


//ROUTES MODULES
const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/user');
const postsCRUDRoutes = require('./routes/post');
const commentsRoutes = require('./routes/comment');
const route404 = require('./config/route404');


//GENERAL MIDDLEWARES
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:3000", "http://92.115.2.5:3000", "http://192.168.1.7:3000"],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('uploads'));
app.use((req, res, next) => {
    res.header("X-powered-by", "Trelea-Api");
    next();
})


//ROUTES DEFINITION
app.use('/api/auth',    authRoutes);
app.use('/api/user',    usersRoutes);
app.use('/api/content', postsCRUDRoutes);
app.use('/api/comment', commentsRoutes);
app.use('/docs',        (req, res) => {res.status(200).sendFile('docs/index.html' , { root : __dirname})});
app.use('*',            route404);


//START APIS
app.listen(process.env.PORT, () => {
    console.log(`${process.env.PORT} => Server API.`)
});