# Save A Stray

_An application that connects Shelter Animals to their Furever homes._

## Background and Overview

**Save A Stray** is a new age solution for a problem that is at historically high levels.  It tackles the following *three obstacles* faced by *Animal Shelters*: 

- Reach: _Without a dynamic website and a social media presence its next to impossible for Shelters to get their Animals the exposure they need in order to be adopted._
- Cost: _In order for Animal Shelters to build their online presence there can be significant upfront costs for building websites, marketing, etc.  Save A Stray has no upfront costs and only charges a small fee with each successful adoption._
- Convenience:  _Potential adopters have to search through multiple websites in order to find all the potential pets in the area.  With Save A Stray you have to search one website to see all the animals in your specified area._ 


**Save A Stray** is primarily built with the **MERN** stack, a combination of the following technologies: **MongoDB, Node, React, Express** and **Apollo**.

## Functionality & MVP

- [ ] Web and Mobile Application
- [ ] Allow payment processing
- [ ] Shelters can create an account and add their animals
- [ ] Share with Facebook
- [ ] Sign up with Facebook / Google
- [ ] Search for animals by location / type
- [ ] Donate directly to Shelters


### Bonus Features

- [ ] Sign up for volunteering
- [ ] Volunteer schedules
- [ ] "Love" an Animal
- [ ] Set up additional payment processing


## Schema

### `users`
column name       | data type | details
------------------|-----------|-----------------------
`id `             | integer   | not null, primary key
`username`        | string    | not null, indexed, unique
`password_digest` | string    | not null
`session_token`   | string    | not null, indexed, unique
`user_role`       | string    | includes [ admin , endUser , volunteer ] 
`paymentEmail  `  | string    | not null 
--- 
<!--  -->
### `Dogs`
column name     | data type | details
----------------|-----------|-----------------------
`id`            | integer   | not null, primary key
`name`          | string    | not null,  unique​
`Age`           | integer   | not null
`sex`           | string    | not null
`color `        | string    | not null
`Description`   | string    | not null
`image`         | string    | 
`video`         | string    | 
`Application`   | text      | 
--- 

### `Cats`
column name     | data type | details
----------------|-----------|-----------------------
`id`            | integer   | not null, primary key
`name`          | string    | not null,  unique
`Age`           | integer   | not null
`sex`           | string    | not null
`color`         | string    | not null
`Description`   | string    | not null
`image`         | string    |
`video`         | string    |
`Application`   | text      | 

--- 


### `Shelter`
column name     | data type | details
----------------|-----------|-----------------------
`id `           | integer   | not null, primary key
`name  `        | string    | not null
`location  `    | string    | not null 
`users  `       | array     | not null 
`paymentEmail  `| string    | not null 

--- 

 
## Graphql Schema

    shelter:
        location/address
        contact info
        animals: [
            [Dogs], [Cats]
        ]
        users:
            [userId]    

    Dogs:
        age
        breed
        sex
        color
        description
        [image]
        [video]

    Cats:
        age
        breed
        sex
        color
        description
        [image]
        [video]

    Application:
        animalId:
        userId:
        applicationData:

## Technologies & Challenges

### Architecture
The overall application architecture is geared toward rapid development and maintainability of an application that is deployed on both web and mobile.

To that end, **Save A Stray** is built with the **MERN** stack (**MongoDB, Express, React, and Node**).

Additionally, **Apollo** is used for front-end devlopment with **React**, bundling of **client-side javascript** is accomplished by Webpack, and Babel is used to transpile **ES6+ Javascript** for backward browser compatibility.

Finally, the app will be deployed to **Heroku** with **Docker**.

### Backend: Node, Express, MongoDB, GraphQL
The backend will be entirely platform agnostic with the exception of potential performance optimizations per platform. The separation of the back and front allows for either to be modified, built, updated, or swapped out entirely with minimal impact to the other.

### Frontend: React and Apollo
Docker React Apollo

## UI/UX
Tom

## Group Members & Work Breakdown

- **Chas Huggins** => Backend and Frontend;
- **Daniel Hernandez** => Backend and Frontend;
- **Tom Driscoll** => Frontend and UI/UX