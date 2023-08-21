import {gql} from '@apollo/client'


export const REGIS = gql`
    mutation Regis($input: beforeLogin){
        Regis(input: $input){
            emile, userUnique, postID, status 
        }
    }
`

export const LOGIN = gql`
    mutation Login($input: beforeLogin){
        Login(input: $input){
            emile,
            password,
            userUnique,
            postID,
            status,
            posts{
                id, title, body, date, time
            },
            array{
                emile, password, userUnique, postID, status, posts{id, title, body, date, time}
            }
        }
    }
`

export const CREATE_POST = gql`
    mutation createPost($input: beforePost){
        createPost(input: $input){
            posts{
                id, title, body, date, time
            }
        }
    }
`

export const DELETE_POST = gql`
    mutation deletePost($input: onePost){
        deletePost(input: $input){
            posts{
                id, title, body, date, time
            }
        }
    }
`

export const CHANGE_POST = gql`
    mutation changePost($input: changePost){
        changePost(input: $input){
            emile,
            password,
            userUnique,
            postID,
            status,
            posts{
                id, title, body, date, time
            }
        }
    }
`

export const GET_ALL_POSTS = gql`
    query getAllPost($input: allPosts){
        getAllPost(input: $input){
            posts{
                id, title, body, date, time
            }
        }
    }
`

export const GET_ONE_POST = gql`
    query getOnePost($input: onePost){
        getOnePost(input: $input){
            id, title, body, date, time
        }
    }
`

export const REFRESH = gql`
    query refresh($input: forRefresh){
        refresh(input: $input){
            emile,
            password,
            postID,
            userUnique,
            status,
            posts{
                id, title, body, date, time
            }
        }
    }
` 