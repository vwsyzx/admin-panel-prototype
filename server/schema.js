const { buildSchema } = require('graphql');

const schema = buildSchema(`
    type User{
        emile: String
        password: String
        postID: String
        userUnique: String
        status: String
    }
    type itemPost{
        id: String
        title: String
        body: String
        date: String
        time: String
    }
    type Post{
        postID: String
        userUnique: String
        posts: [itemPost]
    }

    input beforeLogin{
        emile: String!
        password: String!
    }
    input beforePost{
        userUnique: String!
        title: String!
        body: String!
    }
    input allPosts{
        userUnique: String!
    }
    input onePost{
        userUnique: String!
        id: String!
    }
    input changePost{
        userUnique: String!
        id: String!
        title: String!
        body: String!
    }
    input forRefresh{
        userUnique: String!
    }
    

    type afterLogin{
        emile: String
        password: String
        postID: String
        userUnique: String
        status: String
        posts: [itemPost]
    }
    type newLogin{
        emile: String
        password: String
        postID: String
        userUnique: String
        status: String
        posts: [itemPost]
        array: [afterLogin]
    }
    type postAdded{
        array: [afterLogin]
    }

    type Query{
        getAllPosts(input: allPosts): Post
        getOnePost(input: onePost): itemPost
        refresh(input: forRefresh): afterLogin
        getAllUsers: [afterLogin]
        deleteUser(input: forRefresh): [afterLogin]
    }
    type Mutation{
        Login(input: beforeLogin): newLogin
        Regis(input: beforeLogin): User
        createPost(input: beforePost): Post
        deletePost(input: onePost): Post
        changePost(input: changePost): afterLogin
    }
`)

module.exports = schema