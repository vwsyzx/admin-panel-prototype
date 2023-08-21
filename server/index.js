const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema');
const userService = require('./service/user-service');
const apiError = require('./api-error/api-error');
const http = require('http')
const ws = require('ws')

const app = express()

app.use(express.json())
app.use(cors())

const root = {
    Regis: async ({input}) => {
        if(input.emile && input.password){
            const result = await userService.regis(input.emile, input.password)
            console.log(result)
            return result
        }
        throw apiError.BadRequest('Fill necessary Fields!')
    },
    Login: async ({input}) => {
        if(input.emile && input.password){
            const result = await userService.login(input.emile, input.password)

            return result
        }
        throw apiError.BadRequest('Fill necessary Fields!')
    },
    createPost: async ({input}) => {
        if(input.userUnique && input.title && input.body){
            const result = await userService.createPost(input.userUnique, input.title, input.body)
            return result
        }
        throw apiError.BadRequest('Fill necessary Fields!')
    },
    deletePost: async ({input}) => {
        if(input.userUnique && input.id){
            const result = await userService.deletePost(input.userUnique, input.id)
            return result
        }
        throw apiError.BadRequest('Fill necessary Fields!')
    },
    changePost: async ({input}) => {
        if(input.userUnique && input.id && input.title && input.body){
            const result = await userService.changePost(input.userUnique, input.id, input.title, input.body)
            return result
        }
        throw apiError.BadRequest('Fill necessary Fields!')
    },
    getAllPosts: async ({input}) => {
        if(input.userUnique){
            const result = await userService.getAllPosts(input.userUnique)

            return result
        }
        throw apiError.BadRequest('Fill necessary Fields!')
    },
    getOnePost: async ({input}) => {
        if(input.userUnique && input.id){
            const result = await userService.getOnePost(input.userUnique, input.id)

            return result
        }
        throw apiError.BadRequest('Fill necessary Fields!')
    },
    refresh: async ({input}) => {
        if(input.userUnique){
            const result = await userService.refresh(input.userUnique)

            return result
        }
        throw apiError.BadRequest('Fill necessary Fields!')
    },
    getAllUsers: async ({}) => {
        const result = await userService.getAllUsers()
        
        return result
    },
    deleteUser: async ({input}) => {
        if(input.userUnique){
            const result = await userService.deleteUser(input.userUnique)

            return result
        }
        throw apiError.BadRequest('Fill necessary Fields!')
    },

}
app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema: schema,
    rootValue: root
}))

const server = new http.createServer(app)
const wss = new ws.Server({server})

wss.on('connection', (event) => {

})

async function start(){
    try {
        await mongoose.connect('mongodb+srv://islom:islom2006@cluster0.7zxh76t.mongodb.net/?retryWrites=true&w=majority')
        server.listen(3500, ()=>console.log('Server Started on 3500 POST'))
    } catch (error) {
        console.log('CONNECTION ERROR')
    }
}
start()