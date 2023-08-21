import {gql} from '@apollo/client'

export const GET_ALL_USERS = gql`
    query getAllUsers{
        getAllUsers{
            emile
	        password
	        postID
	        userUnique
	        status
            posts{
                title, body, id, date, time
            }
        }
    }
`

export const DELETE_USER = gql`
    query deleteUser($input: forRefresh){
        deleteUser(input: $input){
            emile
	        password
	        postID
	        userUnique
	        status
            posts{
                title, body, id, date, time
            }
        }
    }
`