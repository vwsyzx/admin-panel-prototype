const apiError = require("../api-error/api-error");
const User = require("../model/User");
const bcrypt = require('bcryptjs')
const uuid = require('uuid');
const Post = require("../model/Post");

class userServ{
    async regis(emile, password){
        const userPret = await User.findOne({emile})

        if(userPret){
            throw apiError.BadRequest('User has already Authorized!')
        }
        const hashed = bcrypt.hashSync(password, 6)
        const userUnique = uuid.v4()
        const postID = uuid.v4()

        const createPost = await Post.create({userUnique, postID, posts: []})
        const newUser = await User.create({emile, password: hashed, userUnique, postID, status: 'USER'})

        return {
            emile,
            password: hashed,
            userUnique,
            postID,
            status: 'USER'
        }
    }
    async login(emile, password){
        const userPret = await User.findOne({emile})

        if(!userPret){
            throw apiError.BadRequest('User not Found!')
        }

        const compare = bcrypt.compareSync(password, userPret.password)

        if(compare){
            const post = await Post.findOne({userUnique: userPret.userUnique})
            let arr = []
            if(userPret.status === "ADMIN"){
                const all = await User.find()
                const allPosts = await Post.find()
                all.map(item => {
                    if(item.status !== "ADMIN"){
                        const one = allPosts.find(elem => elem.userUnique === item.userUnique)

                        arr.push({emile: item.emile, password: item.password, userUnique: item.userUnique, postID: item.postID,
                            status: item.status, posts: one.posts})
                    }
                })
            }
            return {
                emile,
                password: userPret.password,
                userUnique: userPret.userUnique,
                postID: userPret.postID,
                posts: post.posts,
                status: userPret.status,
                array: arr
            }
        }
    }
    async createPost(userUnique, title, body){
        const postPret = await Post.findOne({userUnique})

        if(!postPret){
            throw apiError.BadRequest('Something Went Wrong!')
        }
        const id = uuid.v4()
        const now = new Date()

        const optionsDate = {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
        }
        const optionsTime = {
            hour: 'numeric',
            minute: 'numeric'
        }

        const date = new Intl.DateTimeFormat('ru', optionsDate)
        const time = new Intl.DateTimeFormat('ru', optionsTime)

        postPret.posts.push({id, title, body, date: date.format(now), time: time.format(now)})
        await postPret.save()

        console.log({id, title, body, date: date.format(now), time: time.format(now)})

        return {
            userUnique: postPret.userUnique,
            postID: postPret.postID,
            posts: postPret.posts
        }
    }
    async changePost(userUnique, id, title, body){
        const postPret = await Post.findOne({userUnique})

        if(!postPret){
            throw apiError.BadRequest('Something went Wrong!')
        }
        const now = new Date()

        const optionsDate = {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
        }
        const optionsTime = {
            hour: 'numeric',
            minute: 'numeric'
        }

        const date = new Intl.DateTimeFormat('ru', optionsDate)
        const time = new Intl.DateTimeFormat('ru', optionsTime)

        const posts = postPret.posts

        posts.map(item => {
            if(item.id === id){
                item.title = title
                item.body = body
                item.date = date.format(now)
                item.time = time.format(now)
            }
        })
        const newPost = {
            userUnique: postPret.userUnique,
            postID: postPret.postID,
            posts
        }
        const upd = await Post.updateOne({userUnique}, newPost)
        const userPret = await User.findOne({userUnique})
        return {
            emile: userPret.emile,
            password: userPret.password,
            userUnique: postPret.userUnique,
            postID: postPret.postID,
            status: userPret.status,
            posts,
        }
    }
    async deletePost(userUnique, id){
        const postPret = await Post.findOne({userUnique})

        const filt = postPret.posts.filter(item => item.id !== id)
        const newPost = {
            userUnique: postPret.userUnique,
            postID: postPret.postID,
            posts: filt
        }
        const upd = await Post.updateOne({userUnique}, newPost)

        return {
            postID: newPost.postID,
            userUnique: newPost.userUnique,
            posts: newPost.posts
        }
    }
    async getAllPosts(userUnique){
        const postPret = await Post.findOne({userUnique})

        if(!postPret){
            throw apiError.BadRequest('Something went Wrong!')
        }
        return {
            postID: postPret.postID,
            userUnique: postPret.userUnique,
            psots: postPret.posts
        }
    }
    async getOnePost(userUnique, id){
        const postPret = await Post.findOne({userUnique})

        if(!postPret){
            throw apiError.BadRequest('Something went Wrong!')
        }

        const one = postPret.posts.find(item => item.id === id)

        return {
            id: one.id,
            title: one.title,
            body: one.body,
            date: one.date,
            time: one.time
        }
    }
    async refresh(userUnique){
        const userPret = await User.findOne({userUnique})
        
        if(!userPret){
            throw apiError.BadRequest('User not Found!')
        }
        const postPret = await Post.findOne({userUnique})

        if(!postPret){
            throw apiError.BadRequest('Something went Wrong!')
        }

        return {
            emile: userPret.emile,
            password: userPret.password,
            userUnique: userPret.userUnique,
            postID: userPret.postID,
            status: userPret.status,
            posts: postPret.posts
        }
    }

    async getAllUsers(){
        const all = await User.find()
        const allPosts = await Post.find()
        let arr = []
        all.map(item => {
            if(item.status !== "ADMIN"){
                const one = allPosts.find(elem => elem.userUnique === item.userUnique)

                console.log(one,"got it")

                arr.push({emile: item.emile, password: item.password, userUnique: item.userUnique, postID: item.postID,
                    status: item.status, posts: [...one.posts]})
            }
        })
        return [...arr]
    }
    async deleteUser(userUnique){
        const delUser = await User.deleteOne({userUnique})
        const delPost = await Post.deleteOne({userUnique})

        const all = await User.find()
        const allPosts = await Post.find()
        let arr = []
        console.log('good')
        all.map(item => {
            if(item.status !== "ADMIN"){
                const one = allPosts.find(elem => elem.userUnique === item.userUnique)

                console.log(one,"got it")

                arr.push({emile: item.emile, password: item.password, userUnique: item.userUnique, postID: item.postID,
                    status: item.status, posts: [...one.posts]})
            }
        })
        
        return [...arr]
    }
    async getNecessary(){
        const all = await User.find()
        const allPosts = await Post.find()

        let arr = []
        all.map(item => {
            if(item.status !== "ADMIN"){
                const one = allPosts.find(elem => elem.userUnique === item.userUnique)

                console.log(one,"got it")

                arr.push({emile: item.emile, password: item.password, userUnique: item.userUnique, postID: item.postID,
                    status: item.status, posts: [...one.posts]})
            }
        })
        return {
            array: arr
        }
    }
}

module.exports = new userServ()