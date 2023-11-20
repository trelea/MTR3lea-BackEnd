
-- CREATE DATA BASE --

CREATE DATABASE PrikolDataBase;

--------------------------
--  CREATE TABLE USERS  --
--------------------------
CREATE TABLE USERS (
    id BIGSERIAL, 
    user_id uuid DEFAULT uuid_generate_v4(),

    user_name VARCHAR(255) PRIMARY KEY NOT NULL,
    user_email VARCHAR(255) NOT NULL, 
    user_dateOfBirth VARCHAR NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    user_thumbnail VARCHAR DEFAULT '/images/profilesThumbnails/defaultUserProfileThumbnail.png' NOT NULL,

    user_isVerified BOOLEAN DEFAULT false NOT NULL,

    user_created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    user_updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


--------------------------
--  CREATE TABLE POSTS  --
--------------------------
CREATE TABLE POSTS (
    id BIGSERIAL,
    post_id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,

    user_name VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_name) REFERENCES users(user_name) ON DELETE CASCADE,

    post_title VARCHAR(1000) NOT NULL,
    post_description VARCHAR(100000) NOT NULL,
    post_thumbnail VARCHAR NOT NULL,

    post_likes VARCHAR[] DEFAULT '{}'::VARCHAR[] NOT NULL,
    post_comments INTEGER DEFAULT 0 NOT NULL,

    post_created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    post_updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-----------------------------
--  CREATE TABLE COMMENTS  --
-----------------------------
CREATE TABLE COMMENTS (
    id BIGSERIAL,
    comment_id uuid DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
    post_id uuid NOT NULL,
    FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE,

    user_name VARCHAR(255) NOT NULL,
    comment_text VARCHAR NOT NULL,

    post_created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    post_updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);